import React, { Component } from 'react'

class TeamMenu extends Component {
  render() {
    return (
      <select
        className="team-menu"
        defaultValue=""
        onChange={this.props.changeTeam}
      >
        <option value="" disabled hidden>
          Select
        </option>
        {this.props.teams
          .sort((teamA, teamB) => teamA.location.localeCompare(teamB.location))
          .map((team, i) => {
            return (
              <option key={i} value={team.mlbId} name={team.teamName}>
                {team.location} {team.teamName}
              </option>
            )
          })}
      </select>
    )
  }
}

export default TeamMenu
