import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TeamRoster extends Component {
  render() {
    return (
      <section className="roster">
        <h2>Current Roster:</h2>
        <ul className="current-roster">
          {this.props.userRoster.map(player => {
            return (
              <li key={player.player_id}>
                <Link to={`/player/${player.player_id}`}>
                  <h3>{player.name_display_first_last}</h3>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default TeamRoster
