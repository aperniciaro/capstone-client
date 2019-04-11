import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TeamMenu from '../components/TeamMenu'
import axios from 'axios'
import FungibleRoster from '../components/FungibleRoster'
import Footer from '../components/Footer'

class Trade extends Component {
  state = {
    teams: [],
    tradeTeam: {},
    tradeTeamPlayerList: [],
    tradeRoster: {},
    userTeam: {},
    userPlayerList: [],
    userRoster: {},
    primaryColor: `rgb(201,58,69)`,
    secondaryColor: `rgb(31, 48, 129)`,
    tertiaryColor: `rgb(255, 255, 255)`
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
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    axios.get(`/api/Roster/${userRosterFromStorage.id}`).then(resp => {
      this.setState({
        userRoster: resp.data,
        userTeam: resp.data.team,
        userPlayerList: resp.data.players
        // primaryColor: `rgb(${resp.data.team.primaryColor[0]},${
        //   resp.data.team.primaryColor[1]
        // },${resp.data.team.primaryColor[2]})`,
        // secondaryColor: `rgb(${resp.data.team.secondaryColor[0]},${
        //   resp.data.team.secondaryColor[1]
        // },${resp.data.team.secondaryColor[2]})`,
        // tertiaryColor: `rgb(${resp.data.team.tertiaryColor[0]},${
        //   resp.data.team.tertiaryColor[1]
        // },${resp.data.team.tertiaryColor[2]})`
      })
    })
  }

  ChangeTradeTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlbId === parseInt(event.target.value, 10)
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
      .post('/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        this.setState({ tradeRoster: resp.data }, () => {
          this.GetDefaultPlayerList(this.state.tradeTeam.mlbId)
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
      .post(`/api/Player/${this.state.tradeRoster.id}`, playerData, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        this.setState({
          tradeTeamPlayerList: resp.data
        })
      })
  }

  MoveUserPlayer = playerId => {
    axios.put(`/api/Player/${playerId}/move`).then(() => {
      axios.get(`/api/Roster/${this.state.userRoster.id}`).then(resp => {
        this.setState({
          userPlayerList: resp.data.players
        })
      })
    })
  }

  MoveTradeTeamPlayer = playerId => {
    axios.put(`/api/Player/${playerId}/move`).then(() => {
      axios.get(`/api/Roster/${this.state.tradeRoster.id}`).then(resp => {
        this.setState({
          tradeTeamPlayerList: resp.data.players
        })
      })
    })
  }

  UndoTrade = () => {
    this.state.userPlayerList
      .filter(player => player.isMoving === true)
      .map(player => this.MoveUserPlayer(player.id))
    this.state.tradeTeamPlayerList
      .filter(player => player.isMoving === true)
      .map(player => this.MoveTradeTeamPlayer(player.id))
  }

  ExecuteTrade = () => {
    this.state.userPlayerList
      .filter(player => player.isMoving === true)
      .map(player =>
        axios
          .put(
            `/api/Player/${player.id}/changeteam`,
            this.state.tradeRoster.id,
            {
              headers: { 'Content-type': 'application/json' }
            }
          )
          .then(() => {
            axios.get(`/api/Roster/${this.state.userRoster.id}`).then(resp => {
              this.setState(
                {
                  userPlayerList: resp.data.players
                },
                localStorage.setItem(
                  'user-roster',
                  JSON.stringify(this.state.userRoster)
                )
              )
            })
          })
      )
    this.state.tradeTeamPlayerList
      .filter(player => player.isMoving === true)
      .map(player =>
        axios
          .put(
            `/api/Player/${player.id}/changeteam`,
            this.state.userRoster.id,
            {
              headers: { 'Content-type': 'application/json' }
            }
          )
          .then(() => {
            axios.get(`/api/Roster/${this.state.tradeRoster.id}`).then(resp => {
              this.setState({
                tradeTeamPlayerList: resp.data.players
              })
            })
          })
      )
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
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="rosters-side-by-side"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
            <section className="roster">
              <h2>Choose Player(s) to Trade:</h2>
              <FungibleRoster
                playerList={this.state.userPlayerList}
                movePlayer={this.MoveUserPlayer}
              />
            </section>
            <section className="roster">
              <h2>Choose Player(s) to Acquire:</h2>
              <FungibleRoster
                playerList={this.state.tradeTeamPlayerList}
                movePlayer={this.MoveTradeTeamPlayer}
              />
            </section>
          </section>
          <section className="on-the-move">
            <section className="trading">
              <h3>Players to be Traded: </h3>
              <ul>
                {this.state.userPlayerList
                  .filter(f => f.isMoving === true)
                  .map(player => {
                    return (
                      <li className="movable-player" key={player.id}>
                        <Link to={`/player/${player.mlbId}`}>
                          <h3>{player.playerName}</h3>
                        </Link>
                        <button onClick={() => this.MoveUserPlayer(player.id)}>
                          -
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </section>
            <section className="acquiring">
              <h3>Players to be Received: </h3>
              <ul>
                {this.state.tradeTeamPlayerList
                  .filter(f => f.isMoving === true)
                  .map(player => {
                    return (
                      <li className="movable-player" key={player.id}>
                        <Link to={`/player/${player.mlbId}`}>
                          <h3>{player.playerName}</h3>
                        </Link>
                        <button
                          onClick={() => this.MoveTradeTeamPlayer(player.id)}
                        >
                          -
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </section>
          </section>
          <section className="trade-controls">
            <button className="execute" onClick={this.ExecuteTrade}>
              Execute Trade
            </button>
            <button className="cancel" onClick={this.UndoTrade}>
              Clear Trade
            </button>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Trade
