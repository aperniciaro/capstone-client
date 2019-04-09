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
    divisionTeams: [],
    userTeam: {},
    defaultPlayerList: [],
    userPlayerList: [],
    rosterName: '',
    rosterNameInput: '',
    savedRosters: [],
    userRoster: {}
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
      this.setState({
        savedRosters: localStorage.getItem('saved-rosters')
      })
    }
  }

  ChangeUserTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlb_org_id === event.target.value
    )[0]

    this.setState(
      {
        userTeam: selectedTeam,
        divisionTeams: this.state.teams.filter(
          team => team.division_abbrev === selectedTeam.division_abbrev
        )
      },
      () => {
        this.CreateUserRoster()
      }
    )
  }

  CreateUserRoster = () => {
    const data = {
      team: this.state.userTeam,
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
      return {
        mlbId: player.player_id,
        playerName: player.name_display_first_last,
        position: parseInt(player.primary_position, 10),
        throwsFrom: player.throws,
        batsFrom: player.bats,
        jerseyNumber: player.jersey_number
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
        const userRosterFromStorage = JSON.parse(
          localStorage.getItem('user-roster')
        )
        userRosterFromStorage.players = resp.data
        localStorage.setItem(
          'user-roster',
          JSON.stringify(userRosterFromStorage)
        )
        this.setState({
          userPlayerList: resp.data
        })
      })
  }

  ChangeRosterName = event => {
    this.setState({
      rosterNameInput: event.target.value
    })
  }

  SaveRoster = () => {
    const data = {
      name: this.state.rosterNameInput,
      isCustom: true
    }
    this.setState(
      {
        rosterName: this.state.rosterNameInput,
        rosterNameInput: '',
        savedRosters: this.state.savedRosters.concat(this.state.userRoster)
      },
      axios
        .put(
          `https://localhost:5001/api/Roster/${this.state.userRoster.id}`,
          data,
          { headers: { 'Content-type': 'application/json' } }
        )
        .then(resp => {
          localStorage.setItem('saved-rosters', JSON.stringify(resp.data))
        })
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
          <Outcomes divisionTeams={this.state.divisionTeams} />
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
