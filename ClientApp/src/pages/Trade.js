import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Trade extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Trade</h1>
          <h2>Choose Trade Partner: </h2>
          <select
            className="team-menu"
            defaultValue="Cubs"
            // onChange={}
          >
            <option value="0" name="Cubs">
              Chicago Cubs
            </option>
          </select>
        </header>
        <main>
          <section className="rosters-side-by-side">
            <section className="roster">
              <h2>Choose Player(s) to Trade:</h2>
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
            <section className="roster">
              <h2>Choose Player(s) to Acquire:</h2>
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
          </section>
          <section className="on-the-move">
            <section className="trading">
              <h3>Players to be Traded: </h3>
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
            <section className="acquiring">
              <h3>Players to be Received: </h3>
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
          </section>
          <section className="projected-stats">
            <h3>Projections After Trade: </h3>
            <p>Record: </p>
            <p>HRs: </p>
            <p>SBs: </p>
            <p>BA: </p>
            <p>ERA: </p>
          </section>
          <section className="trade-controls">
            <button className="execute">Execute Trade</button>
            <button className="cancel">Clear Trade</button>
          </section>
        </main>
      </div>
    )
  }
}

export default Trade
