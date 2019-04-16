import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FungibleRoster from '../components/FungibleRoster'
import axios from 'axios'
import Footer from '../components/Footer'

class Release extends Component {
  state = {
    userRoster: {},
    userTeam: {},
    userPlayerList: [],
    primaryColor: 'rgb(184,102,69)',
    secondaryColor: 'rgb(100, 99, 39)',
    tertiaryColor: 'rgb(246, 214, 179)'
  }

  componentDidMount() {
    this.GetUserInfoFromStorage()
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    axios.get(`/api/Roster/${userRosterFromStorage.id}`).then(resp => {
      this.setState({
        userRoster: resp.data,
        userTeam: resp.data.team,
        userPlayerList: resp.data.players,
        primaryColor: `rgb(${resp.data.team.primaryColor[0]},${
          resp.data.team.primaryColor[1]
        },${resp.data.team.primaryColor[2]})`,
        secondaryColor: `rgb(${resp.data.team.secondaryColor[0]},${
          resp.data.team.secondaryColor[1]
        },${resp.data.team.secondaryColor[2]})`,
        tertiaryColor: `rgb(${resp.data.team.tertiaryColor[0]},${
          resp.data.team.tertiaryColor[1]
        },${resp.data.team.tertiaryColor[2]})`
      })
    })
  }

  MovePlayer = playerId => {
    axios.put(`/api/Player/${playerId}/move`).then(() => {
      axios.get(`/api/Roster/${this.state.userRoster.id}`).then(resp => {
        this.setState({
          userPlayerList: resp.data.players
        })
        localStorage.setItem(
          'user-roster',
          JSON.stringify(this.state.userRoster)
        )
      })
    })
  }

  UndoRelease = () => {
    this.state.userPlayerList
      .filter(player => player.isMoving === true)
      .map(player => this.MovePlayer(player.id))
  }

  ExecuteRelease = () => {
    this.state.userPlayerList
      .filter(player => player.isMoving === true)
      .map(player =>
        axios
          .put(`/api/Player/${player.id}/changeteam`, -1, {
            headers: { 'Content-type': 'application/json' }
          })
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
          <h1>Release Players</h1>
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
            <h2>Choose Player(s) to Release:</h2>
            <FungibleRoster
              playerList={this.state.userPlayerList}
              movePlayer={this.MovePlayer}
            />
          </section>
          <section className="acquiring">
            <h3>Players to be Released: </h3>
            <ul className="moving-players">
              {this.state.userPlayerList
                .filter(f => f.isMoving === true)
                .sort()
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
            <button className="execute" onClick={this.ExecuteRelease}>
              Release
            </button>
            <button className="cancel" onClick={this.UndoRelease}>
              Clear Selected
            </button>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Release
