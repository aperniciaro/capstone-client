import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Error extends Component {
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
    axios.get(`/api/Roster/${userRosterFromStorage.id}`).then(resp => {
      this.setState({
        userRoster: resp.data,
        userTeam: resp.data.team,
        userPlayerList: resp.data.players,
        primaryColor: `rgb(${resp.data.team.primaryColor[0]},${
          resp.data.team.primaryColor[1]
        },${resp.data.team.primaryColor[2]})`,
        secondaryColor: `rgb(${resp.data.team.secondaryColor[0]},${
          resp.data.team.secondaryColor[1]
        },${resp.data.team.secondaryColor[2]})`,
        tertiaryColor: `rgb(${resp.data.team.tertiaryColor[0]},${
          resp.data.team.tertiaryColor[1]
        },${resp.data.team.tertiaryColor[2]})`
      })
    })
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.primaryColor,
          color: this.state.tertiaryColor
        }}
      >
        <h2>Error, Page Not Found</h2>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
      </div>
    )
  }
}

export default Error
