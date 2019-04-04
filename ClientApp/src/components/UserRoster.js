import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserRoster extends Component {
  render() {
    return (
      <section className="roster">
        <h2>Current Roster:</h2>
        <ul className="current-roster">
          {this.props.userPlayers.map(player => {
            return (
              <li key={player.Id}>
                <Link to={`/player/${player.mlbId}`}>
                  <h3>{player.playerName}</h3>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default UserRoster
