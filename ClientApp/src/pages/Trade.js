import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TeamMenu from '../components/TeamMenu'
import axios from 'axios'

class Trade extends Component {
  state = {
    teams: [],
    tradeTeam: {},
    tradeTeamRoster: []
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

  GetTradeTeamRoster = teamId => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamId}'`
      )
      .then(resp => {
        this.setState({ tradeTeamRoster: resp.data.roster_40.queryResults.row })
      })
  }

  ChangeTradeTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlb_org_id === event.target.value
    )[0]
    this.setState(
      {
        tradeTeam: selectedTeam
      },
      () => {
        this.GetTradeTeamRoster(selectedTeam.mlb_org_id)
      }
    )
  }

  movePlayer = event => {
    //change state of player from out of deal to in deal, or vice versa
    //player lists should be mapped with an in/out of deal filter
  }

  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Trade</h1>
          <h2>Choose Trade Partner: </h2>
          <TeamMenu
            teams={this.state.teams}
            changeTeam={this.ChangeTradeTeam}
          />
        </header>
        <main>
          <section className="rosters-side-by-side">
            <section className="roster">
              <h2>Choose Player(s) to Trade:</h2>
              <ul className="current-roster">
                <li className="movable-player">
                  <Link to={'/player/playername'}>
                    <h3>Player Name</h3>
                  </Link>
                  <button onClick={this.movePlayer}>+</button>
                </li>
              </ul>
            </section>
            <section className="roster">
              <h2>Choose Player(s) to Acquire:</h2>
              <ul className="current-roster">
                {this.state.tradeTeamRoster.map(player => {
                  return (
                    <li className="movable-player" key={player.player_id}>
                      <Link to={`/player/${player.player_id}`}>
                        <h3>{player.name_display_first_last}</h3>
                      </Link>
                      <button onClick={this.movePlayer}>+</button>
                    </li>
                  )
                })}
              </ul>
            </section>
          </section>
          <section className="on-the-move">
            <section className="trading">
              <h3>Players to be Traded: </h3>
              <ul>
                <li className="movable-player">
                  <Link to={'/player/playername'}>
                    <h3>Player Name</h3>
                  </Link>
                  <button onClick={this.movePlayer}>-</button>
                </li>
              </ul>
            </section>
            <section className="acquiring">
              <h3>Players to be Received: </h3>
              <ul>
                <li className="movable-player">
                  <Link to={'/player/playername'}>
                    <h3>Player Name</h3>
                  </Link>
                  <button onClick={this.movePlayer}>-</button>
                </li>
              </ul>
            </section>
          </section>
          <section className="projected-stats">
            <h3>Projections After Trade: </h3>
            <p>Record: </p>
            <p>HRs: </p>
            <p>SBs: </p>
            <p>BA: </p>
            <p>ERA: </p>
          </section>
          <section className="trade-controls">
            <button className="execute">Execute Trade</button>
            <button className="cancel">Clear Trade</button>
          </section>
        </main>
      </div>
    )
  }
}

export default Trade
