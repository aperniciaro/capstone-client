import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    if (this.props.winDiff < 0) {
      return (
        <section className="expected-record">
          <h3>Expected Record: </h3>
          <p>
            {this.props.prevProjWins} - {162 - this.props.prevProjWins}
          </p>
          <p>-{this.props.winDiff} wins from original roster</p>
        </section>
      )
    } else if (this.props.winDiff > 0) {
      return (
        <section className="expected-record">
          <h3>Expected Record: </h3>
          <p>
            {this.props.prevProjWins} - {162 - this.props.prevProjWins}
          </p>
          <p>+{this.props.winDiff} wins from original roster</p>
        </section>
      )
    } else {
      return (
        <section className="expected-record">
          <h3>Expected Record: </h3>
          <p>
            {this.props.prevProjWins} - {162 - this.props.prevProjWins}
          </p>
        </section>
      )
    }
  }
}

export default Outcomes
