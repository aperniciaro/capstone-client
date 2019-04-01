import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PlayerInfo extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Player Information</h1>
        </header>
        <main>
          <section className="player-card-front">
            <img src="" alt="player pic" />
            <section className="player-bio">
              <h2>Player Name</h2>
              <h3>Position: </h3>
              <h3>Age: </h3>
              <h3>From: </h3>
              <h3>Time in Majors: </h3>
            </section>
          </section>
          <section className="player-stats">
            <h3>Player Stats: </h3>
            <p>HRs: </p>
            <p>SBs: </p>
            <p>BA: </p>
            <p>ERA: </p>
          </section>
        </main>
      </div>
    )
  }
}

export default PlayerInfo
