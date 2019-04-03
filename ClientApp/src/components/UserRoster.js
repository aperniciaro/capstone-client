import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserRoster extends Component {
  render() {
    return (
      <section className="roster">
        <h2>Current Roster:</h2>
        <ul className="current-roster">
          {this.props.userRoster.map(player => {
            return (
              <li key={player.Id}>
                <Link to={`/player/${player.Id}`}>
                  <h3>{player.PlayerName}</h3>
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
