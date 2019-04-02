import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Login from '../components/Login'
import TeamMenu from '../components/TeamMenu'
import SaveLoad from '../components/SaveLoad'
import Outcomes from '../components/Outcomes'
import NavMenu from '../components/NavMenu'

class Home extends Component {
  state = {
    teams: [],
    divisionTeams: [],
    userTeam: {}
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
        console.log(resp)
        this.setState({ teams: resp.data.team_all_season.queryResults.row })
      })
  }

  changeUserTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.name_display_long === event.target.value
    )
    this.setState({
      userTeam: selectedTeam,
      divisionTeams: this.state.teams.filter(
        team => team.division_abbrev === selectedTeam.division_abbrev
      )
    })
  }

  render() {
    return (
      <div>
        <Login />
        <header>
          <h1>Armchair GM</h1>
          <h2>Choose Your Team: </h2>
          <TeamMenu teams={this.state.teams} changeTeam={this.changeUserTeam} />
        </header>
        <main>
          <section className="manage-roster">
            <section className="roster">
              <h2>Current Roster:</h2>
              <ul className="current-roster">
                <li>
                  <Link to={'/player/playername'}>
                    <h3>Player Name</h3>
                  </Link>
                </li>
              </ul>
            </section>
            <NavMenu />
          </section>
          <Outcomes divisionTeams={this.state.divisionTeams} />
          <SaveLoad />
        </main>
      </div>
    )
  }
}

export default Home
