import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FungibleRoster extends Component {
  render() {
    return (
      <ul className="current-roster">
        {this.props.playerList
          .filter(f => f.isMoving === false)
          .map(player => {
            return (
              <li className="movable-player" key={player.id}>
                <Link to={`/player/${player.mlbId}`}>
                  <h3>{player.playerName}</h3>
                </Link>
                <button onClick={() => this.props.movePlayer(player.id)}>
                  +
                </button>
              </li>
            )
          })}
      </ul>
    )
  }
}

export default FungibleRoster
