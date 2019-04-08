import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FungibleRoster from '../components/FungibleRoster'
import Axios from 'axios'

class Release extends Component {
  state = {
    userRoster: {},
    userTeam: {},
    userPlayerList: []
  }

  componentDidMount() {
    this.GetUserInfoFromStorage()
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    this.setState({
      userRoster: userRosterFromStorage,
      userTeam: userRosterFromStorage.team,
      userPlayerList: userRosterFromStorage.players
    })
  }

  MovePlayer = playerId => {
    Axios.put(`https://localhost:5001/api/Player/${playerId}/move`).then(
      resp => {
        Axios.get(
          `https://localhost:5001/api/Roster/${this.state.userRoster.id}`
        ).then(resp => {
          this.setState({
            userPlayerList: resp.data.players
          })
        })
      }
    )
  }

  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Release Players</h1>
        </header>
        <main>
          <section className="roster">
            <h2>Choose Player(s) to Release:</h2>
            <FungibleRoster
              playerList={this.state.userPlayerList}
              movePlayer={this.MovePlayer}
            />
          </section>
          <section className="acquiring">
            <h3>Players to be Released: </h3>
            <ul>
              {this.state.userPlayerList
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
            <button className="execute">Release</button>
            <button className="cancel">Clear Selected</button>
          </section>
        </main>
      </div>
    )
  }
}

export default Release
