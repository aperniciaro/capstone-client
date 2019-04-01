import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <section className="login-section">
          <p>New User or Login: </p>
          <input placeholder="User Name" />
          <p>Password: </p>
          <input placeholder="Password" />
        </section>
        <header>
          <h1>Armchair GM</h1>
          <h2>Choose Your Team: </h2>
          <select
            className="team-menu"
            defaultValue="Phillies"
            // onChange={}
          >
            <option value="0" name="Phillies">
              Philadelphia Phillies
            </option>
          </select>
        </header>
        <main>
          <section className="manage-roster">
            <section className="roster">
              <h2>Current Roster:</h2>
              <ul className="current-roster">
                <li>
                  <Link to={'/player/playername'}>
                    <h3>Player Name</h3>
                  </Link>
                </li>
              </ul>
            </section>
            <section className="actions">
              <Link to={'/Trade'}>
                <button className="trade-button">Trade</button>
              </Link>
              <Link to={'/FreeAgent'}>
                <button className="sign-button">Sign FA</button>
              </Link>
              <Link to={'/Release'}>
                <button className="release-button">Release Player</button>
              </Link>
            </section>
          </section>
          <section className="outcomes">
            <section className="expectations">
              <h3>Expected Record: </h3>
              <p>82-80</p>
              <h3>Projected Division Standings: </h3>
              <ol className="division-standings">
                <li>Phillies</li>
                <li>Marlins</li>
                <li>Mets</li>
                <li>Braves</li>
                <li>Phillies</li>
              </ol>
            </section>
            <section className="team-stats">
              <h3>Projected Team Stats: </h3>
              <p>HRs: </p>
              <p>SBs: </p>
              <p>BA: </p>
              <p>ERA: </p>
            </section>
          </section>
          <section className="save-and-load">
            <input className="save-input" placeholder="Name your roster" />
            <button>Save Custom Roster</button>
            <section className="saved-menu">
              <h4>Saved Rosters: </h4>
              <select className="saved-rosters" defaultValue="0">
                <option value="0" name="Roster1">
                  Roster1
                </option>
              </select>
            </section>
            <button>Load Custom Roster</button>
          </section>
        </main>
      </div>
    )
  }
}

export default Home
