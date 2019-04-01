import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FreeAgent extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Sign Free Agents</h1>
        </header>
        <main>
          <section className="roster">
            <h2>Available Free Agents:</h2>
            <ul className="current-roster">
              <li className="addable-player">
                <h3>Player Name</h3>
                <button>+</button>
              </li>
              <li className="addable-player">
                <h3>Player Name</h3>
                <button>+</button>
              </li>
              <li className="addable-player">
                <h3>Player Name</h3>
                <button>+</button>
              </li>
              <li className="addable-player">
                <h3>Player Name</h3>
                <button>+</button>
              </li>
            </ul>
          </section>
          <section className="acquiring">
            <h3>Players to be Signed: </h3>
            <ul>
              <li className="removable-player">
                <h3>Player Name</h3>
                <button>-</button>
              </li>
              <li className="removable-player">
                <h3>Player Name</h3>
                <button>-</button>
              </li>
            </ul>
          </section>
          <section className="projected-stats">
            <h3>Projections After Acquisition: </h3>
            <p>Record: </p>
            <p>HRs: </p>
            <p>SBs: </p>
            <p>BA: </p>
            <p>ERA: </p>
          </section>
          <section className="trade-controls">
            <button className="execute">Sign FAs</button>
            <button className="cancel">Clear Selected</button>
          </section>
        </main>
      </div>
    )
  }
}

export default FreeAgent
