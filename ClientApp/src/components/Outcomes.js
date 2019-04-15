import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    return (
      <section className="expected-record">
        <h3>Expected Record: </h3>
        <p>
          {this.props.newProjWins} - {162 - this.props.newProjWins}
        </p>
        <p>Change of {this.props.winDiff} wins</p>
      </section>
    )
  }
}

export default Outcomes
