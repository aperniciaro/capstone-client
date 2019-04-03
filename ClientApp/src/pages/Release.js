import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Release extends Component {
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
            <ul className="current-roster">
              <li className="movable-player">
                <Link to={'/player/playername'}>
                  <h3>Player Name</h3>
                </Link>
                <button>-</button>
              </li>
            </ul>
          </section>
          <section className="acquiring">
            <h3>Players to be Released: </h3>
            <ul>
              <li className="movable-player">
                <Link to={'/player/playername'}>
                  <h3>Player Name</h3>
                </Link>
                <button>+</button>
              </li>
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
