import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    return (
      <section className="expected-record">
        <h2>Expected Record: </h2>
        <p>
          {Math.round(this.props.newProjWins)} -{' '}
          {Math.round(162 - this.props.newProjWins)}
        </p>
        <h4>Change of {Math.round(this.props.winDiff)} win(s)</h4>
      </section>
    )
  }
}

export default Outcomes
