import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FungibleRoster extends Component {
  render() {
    return (
      <ul className="current-roster">
        {this.props.playerList
          .filter(f => f.isMoving === false)
          .sort()
          .map(player => {
            return (
              <li className="movable-player" key={player.id}>
                <button onClick={() => this.props.movePlayer(player.id)}>
                  +
                </button>
                <Link to={`/Player/${player.mlbId}`}>
                  <h3>{player.playerName}</h3>
                </Link>
              </li>
            )
          })}
      </ul>
    )
  }
}

export default FungibleRoster
