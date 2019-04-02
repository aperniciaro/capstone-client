import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Login from '../components/Login'
import TeamMenu from '../components/TeamMenu'
import SaveLoad from '../components/SaveLoad'
import Outcomes from '../components/Outcomes'
import NavMenu from '../components/NavMenu'

class Home extends Component {
  render() {
    return (
      <div>
        <Login />
        <header>
          <h1>Armchair GM</h1>
          <h2>Choose Your Team: </h2>
          <TeamMenu />
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
            <NavMenu />
          </section>
          <Outcomes />
          <SaveLoad />
        </main>
      </div>
    )
  }
}

export default Home
