import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import FungibleRoster from '../components/FungibleRoster'

class FreeAgent extends Component {
  state = {
    primaryColor: 'rgb(220,220,220)',
    secondaryColor: 'rgb(169, 169, 169)',
    tertiaryColor: 'rgb(105, 105, 105)',
    freeAgentRoster: {},
    freeAgentPlayerList: [],
    defaultPlayerList: [],
    convertedPlayerList: []
  }

  componentDidMount() {
    this.GetUserInfoFromStorage()
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    this.setState(
      {
        userRoster: userRosterFromStorage,
        userTeam: userRosterFromStorage.team,
        userPlayerList: userRosterFromStorage.players
        // primaryColor: `rgb(${userRosterFromStorage.team.primaryColor[0]},${
        //   userRosterFromStorage.team.primaryColor[1]
        // },${userRosterFromStorage.team.primaryColor[2]})`,
        // secondaryColor: `rgb(${userRosterFromStorage.team.secondaryColor[0]},${
        //   userRosterFromStorage.team.secondaryColor[1]
        // },${userRosterFromStorage.team.secondaryColor[2]})`,
        // tertiaryColor: `rgb(${userRosterFromStorage.team.tertiaryColor[0]},${
        //   userRosterFromStorage.team.tertiaryColor[1]
        // },${userRosterFromStorage.team.tertiaryColor[2]})`
      },
      () => {
        this.CreateFreeAgentRoster()
      }
    )
  }

  CreateFreeAgentRoster = () => {
    const data = {
      players: []
    }
    axios
      .post('/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        this.setState({ freeAgentRoster: resp.data }, () => {
          this.GetFreeAgents()
        })
      })
  }

  GetFreeAgents = () => {
    const currentYear = new Date().getFullYear()
    axios
      .get(
        `https://statsapi.mlb.com/api/v1/people/freeAgents?season=${currentYear}`
      )
      .then(resp => {
        this.setState(
          {
            defaultPlayerList: resp.data.freeAgents
          },
          () => {
            this.MatchPlayers()
          }
        )
      })
  }

  MatchPlayers = () => {
    let convertedPlayers = this.state.defaultPlayerList.map(player => {
      axios
        .get(
          `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${
            player.player.id
          }'`
        )
        .then(resp => {
          return { resp }
        })
    })
    this.setState(
      {
        convertedPlayerList: convertedPlayers
      },
      () => {
        this.AddPlayersToFA()
      }
    )
  }

  AddPlayersToFA = () => {
    let playerData = this.state.convertedPlayerList.map(player => {
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
      .post(`/api/Player/${this.state.freeAgentRoster.id}`, playerData, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        this.setState(
          {
            freeAgentPlayerList: resp.data
          },
          localStorage.setItem(
            'free-agent-roster',
            JSON.stringify(this.state.freeAgentRoster)
          )
        )
      })
  }

  MovePlayer = playerId => {
    axios.put(`/api/Player/${playerId}/move`).then(() => {
      axios.get(`/api/Roster/${this.state.freeAgentRoster.id}`).then(resp => {
        this.setState({
          freeAgentPlayerList: resp.data.players
        })
        localStorage.setItem(
          'free-agent-roster',
          JSON.stringify(this.state.freeAgentRoster)
        )
      })
    })
  }

  UndoSigning = () => {
    this.state.freeAgentPlayerList
      .filter(player => player.isMoving === true)
      .map(player => this.MovePlayer(player.id))
  }

  ExecuteSigning = () => {
    this.state.freeAgentPlayerList
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
            this.MovePlayer(player.id)
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
          <h1>Sign Free Agents</h1>
        </header>
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="roster"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
            <h2>Available Free Agents:</h2>
            <FungibleRoster
              playerList={this.state.freeAgentPlayerList}
              movePlayer={this.MovePlayer}
            />
          </section>
          <section className="acquiring">
            <h3>Players to be Signed: </h3>
            <ul>
              {this.state.freeAgentPlayerList
                .filter(f => f.isMoving === true)
                .map(player => {
                  return (
                    <li className="movable-player" key={player.id}>
                      <Link to={`/player/${player.mlbId}`}>
                        <h3>{player.playerName}</h3>
                      </Link>
                      <button onClick={() => this.MovePlayer(player.id)}>
                        -
                      </button>
                    </li>
                  )
                })}
            </ul>
          </section>
          <section className="trade-controls">
            <button className="execute" onClick={this.ExecuteSigning}>
              Sign FAs
            </button>
            <button className="cancel" onClick={this.UndoSigning}>
              Clear Selected
            </button>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default FreeAgent
