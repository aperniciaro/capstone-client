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
        {this.props.teams.map(team => {
          return (
            <option
              key={team.mlb_org_id}
              value={team.mlb_org_id}
              name={team.name_display_full}
            >
              {team.name_display_full}
            </option>
          )
        })}
      </select>
    )
  }
}

export default TeamMenu