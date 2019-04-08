import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TeamMenu from '../components/TeamMenu'
import axios from 'axios'
import FungibleRoster from '../components/FungibleRoster'

class Trade extends Component {
  state = {
    teams: [],
    tradeTeam: {},
    tradeTeamPlayerList: [],
    tradeRoster: {},
    userTeam: {},
    userPlayerList: []
  }

  componentDidMount() {
    this.GetAllTeams()
    this.GetUserInfoFromStorage()
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

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    this.setState({
      userTeam: userRosterFromStorage.team,
      userPlayerList: userRosterFromStorage.players
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
        this.CreateTradeRoster()
      }
    )
  }

  CreateTradeRoster = () => {
    const data = {
      team: this.state.tradeTeam,
      players: []
    }
    axios
      .post('https://localhost:5001/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        this.setState({ tradeRoster: resp.data }, () => {
          this.GetDefaultPlayerList(this.state.tradeTeam.mlb_org_id)
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
            tradeTeamPlayerList: resp.data.roster_40.queryResults.row
          },
          () => {
            this.AddPlayersToUserRoster()
          }
        )
      })
  }

  AddPlayersToUserRoster = () => {
    let playerData = this.state.tradeTeamPlayerList.map(player => {
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
        `https://localhost:5001/api/Player/${this.state.tradeRoster.id}`,
        playerData,
        {
          headers: { 'Content-type': 'application/json' }
        }
      )
      .then(resp => {
        this.setState({
          tradeTeamPlayerList: resp.data
        })
      })
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
              <FungibleRoster playerList={this.state.userPlayerList} />
            </section>
            <section className="roster">
              <h2>Choose Player(s) to Acquire:</h2>
              <FungibleRoster playerList={this.state.tradeTeamPlayerList} />
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
