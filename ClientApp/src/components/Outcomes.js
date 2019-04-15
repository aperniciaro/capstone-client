import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    return (
      <section className="expected-record">
        <h3>Expected Record: </h3>
        <p>
          {Math.round(this.props.newProjWins)} -{' '}
          {Math.round(162 - this.props.newProjWins)}
        </p>
        <p>Change of {Math.round(this.props.winDiff)} wins</p>
      </section>
    )
  }
}

export default Outcomes
