import React, { Component } from 'react'
import axios from 'axios'
import Login from '../components/Login'
import TeamMenu from '../components/TeamMenu'
import SaveLoad from '../components/SaveLoad'
import Outcomes from '../components/Outcomes'
import UserRoster from '../components/UserRoster'
import NavMenu from '../components/NavMenu'

class Home extends Component {
  state = {
    teams: [],
    userTeam: {},
    defaultPlayerList: [],
    userPlayerList: [],
    rosterName: '',
    rosterNameInput: '',
    savedRosters: [],
    userRoster: {},
    prevProjWins: 0,
    newProjWins: 0,
    projWinsDiff: 0,
    primaryColor: `rgb(201,58,69)`,
    secondaryColor: `rgb(31, 48, 129)`,
    tertiaryColor: `rgb(255, 255, 255)`
    //messages
  }

  componentDidMount() {
    this.GetAllTeams()
    this.GetUserInfoFromStorage()
  }

  GetAllTeams = () => {
    axios.get('/api/Team').then(resp => {
      this.setState({ teams: resp.data })
    })
  }

  GetUserInfoFromStorage = () => {
    if (localStorage.getItem('saved-rosters')) {
      this.setState({
        savedRosters: JSON.parse(localStorage.getItem('saved-rosters'))
      })
    }
    //Check roster size and add message for over or under 40
  }

  ChangeUserTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlbId === parseInt(event.target.value, 10)
    )[0]
    this.setState(
      {
        userTeam: selectedTeam,
        rosterNameInput: '',
        primaryColor: selectedTeam.primaryColor,
        secondaryColor: selectedTeam.secondaryColor,
        tertiaryColor: selectedTeam.tertiaryColor
      },
      () => {
        this.CreateUserRoster()
      }
    )
  }

  CreateUserRoster = () => {
    const data = {
      team: this.state.userTeam,
      name: `${this.state.userTeam.teamName} default`,
      players: []
    }
    axios
      .post('/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        localStorage.setItem('user-roster', JSON.stringify(resp.data))

        this.setState({ userRoster: resp.data }, () => {
          this.GetDefaultPlayerList(this.state.userTeam.mlbId)
        })
      })
  }

  GetDefaultPlayerList = teamId => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamId}'`
      )
      .then(resp => {
        this.setState(
          {
            defaultPlayerList: resp.data.roster_40.queryResults.row
          },
          () => {
            this.AddPlayersToUserRoster()
          }
        )
      })
  }

  AddPlayersToUserRoster = () => {
    let playerData = this.state.defaultPlayerList.map(player => {
      //Also GetPlayerStats
      return {
        mlbId: player.player_id,
        playerName: player.name_display_first_last,
        position: parseInt(player.primary_position, 10)
      }
    })
    axios
      .post(`/api/Player/${this.state.userRoster.id}`, playerData, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        const userRosterFromStorage = JSON.parse(
          localStorage.getItem('user-roster')
        )
        userRosterFromStorage.players = resp.data
        localStorage.setItem(
          'user-roster',
          JSON.stringify(userRosterFromStorage)
        )
        this.setState({
          userPlayerList: resp.data,
          prevProjWins: this.CalculateProjectedWins()
        })
        //Check roster size and add message for over or under 40
      })
  }

  GetPlayerStats = player => {
    // if (player.position === 1) {
    //   //get projected pitching stats from external api
    //   //set ProjERA and ProjIP
    // } else {
    //   //get projected hitting stats from external api
    //   //set ProjRuns
    // }
  }

  CalculateProjectedWins = () => {
    // let projRunsScored = 0
    // let projRunsAllowed = 0
    // for (let i = 0; i < this.state.userPlayerList.length; i++) {
    //   if (this.state.userPlayerList[i].position === 1) {
    //     projRunsAllowed +=
    //       this.state.userPLayerList[i].projERA *
    //       (this.state.userPlayerList.projIP / 9)
    //   } else {
    //     projRunsScored += this.state.userPlayerList[i].projRuns
    //   }
    // }
    return (
      // (Math.pow(projRunsScored, 1.81) /
      //   (Math.pow(projRunsScored, 1.81) + Math.pow(projRunsAllowed, 1.81))) *
      162
    )
  }

  CompareProjectedWins = () => {
    this.setState({
      projWinsDiff: this.state.newProjWins - this.state.prevProjWins
    })
  }

  ChangeRosterName = event => {
    this.setState({
      rosterNameInput: event.target.value
    })
  }

  SaveRoster = () => {
    this.setState(
      {
        rosterName: this.state.rosterNameInput
      },
      () => {
        axios
          .put(
            `/api/Roster/${this.state.userRoster.id}`,
            {
              name: this.state.rosterName,
              players: this.state.userPlayerList,
              isCustom: true,
              projectedWins: this.state.newProjWins,
              team: this.state.userTeam
            },
            { headers: { 'Content-type': 'application/json' } }
          )
          .then(resp => {
            if (
              resp.data.name !== '' &&
              !this.state.savedRosters.includes(resp.data.name)
            ) {
              this.setState(
                {
                  savedRosters: this.state.savedRosters.concat(resp.data)
                },
                () => {
                  localStorage.setItem(
                    'saved-rosters',
                    JSON.stringify([].concat(this.state.savedRosters))
                  )
                }
              )
            }
          })
      }
    )
  }

  LoadRoster = event => {
    let selectedRoster = this.state.savedRosters.filter(
      roster => roster.id === parseInt(event.target.value, 10)
    )[0]
    this.setState({
      userRoster: selectedRoster,
      userPlayerList: selectedRoster.players,
      userTeam: selectedRoster.team,
      rosterNameInput: '',
      prevProjWins: this.CalculateProjectedWins()
    })
  }

  //add footer to render with attribution info
  //add area for status messages
  render() {
    return (
      <div>
        <Login />
        <header>
          <h1>Armchair GM</h1>
          <h2>Choose Your Team: </h2>
          <TeamMenu teams={this.state.teams} changeTeam={this.ChangeUserTeam} />
        </header>
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="manage-roster"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
            <UserRoster userPlayers={this.state.userPlayerList} />
            <NavMenu />
          </section>
          <Outcomes
            winDiff={this.state.projWinsDiff}
            prevProjWins={this.state.prevProjWins}
            newProjWins={this.state.newProjWins}
          />
          <SaveLoad
            resetRoster={this.CreateUserRoster}
            saveRoster={this.SaveRoster}
            loadRoster={this.LoadRoster}
            changeRosterName={this.ChangeRosterName}
            rosterNameInput={this.state.rosterNameInput}
            savedRosters={this.state.savedRosters}
            loadCustomRoster={this.LoadRoster}
          />
        </main>
      </div>
    )
  }
}

export default Home
