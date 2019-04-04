import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FungibleRoster extends Component {
  render() {
    return (
      <ul className="current-roster">
        {this.props.playerList.map(player => {
          return (
            <li className="movable-player" key={player.Id}>
              <Link to={`/player/${player.mlbId}`}>
                <h3>{player.PlayerName}</h3>
              </Link>
              <button onClick={this.movePlayer}>+</button>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default FungibleRoster
