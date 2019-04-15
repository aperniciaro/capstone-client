import React, { Component } from 'react'

class PlayerStats extends Component {
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

  render() {
    if (this.props.position === '1') {
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
