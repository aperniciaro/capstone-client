import React, { Component } from 'react'

class TeamMenu extends Component {
  render() {
    return (
      <select
        className="team-menu"
        defaultValue="109"
        onChange={this.props.changeTeam}
      >
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
