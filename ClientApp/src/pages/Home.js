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
    userRoster: {}
    //initialProjWins
    //userProjWins
    //messages
  }

  componentDidMount() {
    this.GetAllTeams()
    this.GetUserInfoFromStorage()
  }

  GetAllTeams = () => {
    const currentYear = new Date().getFullYear()
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${currentYear}'`
      )
      .then(resp => {
        this.setState({ teams: resp.data.team_all_season.queryResults.row })
      })
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    if (userRosterFromStorage) {
      this.setState({
        userRoster: userRosterFromStorage,
        userTeam: userRosterFromStorage.team,
        userPlayerList: userRosterFromStorage.players
      })
    }
    this.setState({
      savedRosters: JSON.parse(localStorage.getItem('saved-rosters'))
    })
    //CalculateProjWins = userProjWins
  }

  ChangeUserTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlb_org_id === event.target.value
    )[0]

    this.setState(
      {
        userTeam: selectedTeam
      },
      () => {
        this.CreateUserRoster()
      }
    )
  }

  CreateUserRoster = () => {
    const data = {
      //need correct build of team object
      name: `${this.state.userTeam.mlb_org} default`,
      players: []
    }
    axios
      .post('https://localhost:5001/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        localStorage.setItem('user-roster', JSON.stringify(resp.data))

        this.setState({ userRoster: resp.data }, () => {
          this.GetDefaultPlayerList(this.state.userTeam.mlb_org_id)
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
      .post(
        `https://localhost:5001/api/Player/${this.state.userRoster.id}`,
        playerData,
        {
          headers: { 'Content-type': 'application/json' }
        }
      )
      .then(resp => {
        // const userRosterFromStorage = JSON.parse(
        //   localStorage.getItem('user-roster')
        // )
        // userRosterFromStorage.players = resp.data
        // localStorage.setItem(
        //   'user-roster',
        //   JSON.stringify(userRosterFromStorage)
        // )
        //CalculateProjectedWins
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
    //loop through players on userRoster
    //if player is a pitcher, add projEra*(projIp/9) to projRunsAllowed
    //if player is a hitter, add projRuns to projRunsScored
    //return (projRunsScored^1.81/(projRunsScored^1.81 + projRunsAllowed^1.81))*162, rounded down
  }

  ChangeRosterName = event => {
    this.setState({
      rosterNameInput: event.target.value
    })
  }

  SaveRoster = () => {
    this.setState(
      {
        rosterName: this.state.rosterNameInput,
        rosterNameInput: ''
      },
      () => {
        axios
          .put(
            `https://localhost:5001/api/Roster/${this.state.userRoster.id}`,
            {
              name: this.state.rosterName,
              // players: this.state.userPlayerList,
              isCustom: true
            },
            { headers: { 'Content-type': 'application/json' } }
          )
          .then(resp => {
            this.setState(
              {
                savedRosters: this.state.savedRosters.concat(
                  this.state.userRoster
                )
              },
              () => {
                localStorage.setItem(
                  'saved-rosters',
                  JSON.stringify([].concat(this.state.savedRosters))
                )
              }
            )
          })
      }
    )
  }

  LoadRoster = event => {
    let selectedRoster = this.state.savedRosters.filter(
      roster => roster.name === event.target.value
    )[0]
    this.setState({
      userRoster: selectedRoster
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
        <main>
          <section className="manage-roster">
            <UserRoster userPlayers={this.state.userPlayerList} />
            <NavMenu />
          </section>
          <Outcomes />
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
