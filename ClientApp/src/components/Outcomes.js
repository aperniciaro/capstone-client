import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    return (
      <section className="outcomes">
        <section className="expectations">
          <section className="expected-record">
            <h3>Expected Record: </h3>
            <p>82-80</p>
          </section>
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
    )
  }
}

export default Outcomes
