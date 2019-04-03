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
    defaultRoster: [],
    userRoster: []
  }

  componentDidMount() {
    this.GetAllTeams()
  }

  GetAllTeams = () => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2019'`
      )
      .then(resp => {
        this.setState({ teams: resp.data.team_all_season.queryResults.row })
      })
  }

  GetDefaultRoster = teamId => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamId}'`
      )
      .then(resp => {
        this.setState({ defaultRoster: resp.data.roster_40.queryResults.row })
      }, this.AddPlayersToRoster)
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
        this.GetDefaultRoster(selectedTeam.mlb_org_id)
      }
    )
  }

  CreateUserRoster = () => {
    const data = {
      team: this.state.userTeam,
      players: this.state.defaultRoster
    }
    axios
      .post('https://localhost:5001/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then()
  }

  AddPlayersToRoster = () => {
    this.state.defaultRoster.forEach(function(player) {
      const data = {
        mlbId: player.player_id,
        playerName: player.name_display_first_last,
        position: player.primary_position,
        throwsFrom: player.throws,
        batsFrom: player.bats,
        jerseyNumber: player.jersey_number
      }
      axios
        .post('https://localhost:5001/api/Player', data, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(resp => {
          this.state.userRoster.concat(resp)
        })
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
            <UserRoster userRoster={this.state.userRoster} />
            <NavMenu />
          </section>
          <Outcomes divisionTeams={this.state.divisionTeams} />
          <SaveLoad
          // resetRoster={this.GetDefaultRoster(this.state.userTeam.mlb_org_id)}
          />
        </main>
      </div>
    )
  }
}

export default Home
