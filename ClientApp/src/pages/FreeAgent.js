import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

class FreeAgent extends Component {
  state = {
    primaryColor: 'rgb(220,220,220)',
    secondaryColor: 'rgb(169, 169, 169)',
    tertiaryColor: 'rgb(105, 105, 105)'
  }

  componentDidMount() {
    this.GetUserInfoFromStorage()
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    this.setState({
      userRoster: userRosterFromStorage,
      userTeam: userRosterFromStorage.team,
      userPlayerList: userRosterFromStorage.players,
      primaryColor: `rgb(${userRosterFromStorage.team.primaryColor[0]},${
        userRosterFromStorage.team.primaryColor[1]
      },${userRosterFromStorage.team.primaryColor[2]})`,
      secondaryColor: `rgb(${userRosterFromStorage.team.secondaryColor[0]},${
        userRosterFromStorage.team.secondaryColor[1]
      },${userRosterFromStorage.team.secondaryColor[2]})`,
      tertiaryColor: `rgb(${userRosterFromStorage.team.tertiaryColor[0]},${
        userRosterFromStorage.team.tertiaryColor[1]
      },${userRosterFromStorage.team.tertiaryColor[2]})`
    })
  }

  //create a free agent roster
  //get free agents from MLB
  //match free agent player to regular player lookup via mlbid
  //create a Player obj for each free agent
  //add players to roster

  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Sign Free Agents</h1>
        </header>
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="roster"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
            <h2>Available Free Agents:</h2>
            <ul className="current-roster">
              <li className="movable-player">
                <Link to={'/player/playername'}>
                  <h3>Player Name</h3>
                </Link>
                <button>+</button>
              </li>
            </ul>
          </section>
          <section className="acquiring">
            <h3>Players to be Signed: </h3>
            <ul>
              <li className="movable-player">
                <Link to={'/player/playername'}>
                  <h3>Player Name</h3>
                </Link>
                <button>-</button>
              </li>
            </ul>
          </section>
          <section className="trade-controls">
            <button className="execute">Sign FAs</button>
            <button className="cancel">Clear Selected</button>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default FreeAgent
