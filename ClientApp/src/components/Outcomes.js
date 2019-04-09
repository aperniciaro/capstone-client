import React, { Component } from 'react'

class Outcomes extends Component {
  //compare userProjWins to initialProjWins and change p-tag display class accordingly
  render() {
    return (
      <section className="outcomes">
        <section className="expected-record">
          <h3>Expected Record: </h3>
          <p>82-80</p>
        </section>
      </section>
    )
  }
}

export default Outcomes
