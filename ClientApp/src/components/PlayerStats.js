import React, { Component } from 'react'

class PlayerStats extends Component {
  render() {
    if (this.props.position === 1) {
      return (
        <div>
          <p>IP: {this.props.stats.ip}</p>
          <p>ERA: {this.props.stats.era}</p>
          <p>K/9: {this.props.stats.k9}</p>
          <p>BB/9: {this.props.stats.bb9}</p>
          <p>HR/9: {this.props.stats.hr9}</p>
          <p>BAA: {this.props.stats.avg}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>AB: {this.props.stats.ab}</p>
          <p>
            BA/OBP/SLG: {this.props.stats.avg}/{this.props.stats.obp}/
            {this.props.stats.slg}
          </p>
          <p>HR: {this.props.stats.hr}</p>
          <p>R: {this.props.stats.r}</p>
          <p>RBI: {this.props.stats.rbi}</p>
          <p>SB: {this.props.stats.sb}</p>
        </div>
      )
    }
  }
}

export default PlayerStats
