import React, { Component } from 'react'

class TeamMenu extends Component {
  render() {
    return (
      <select
        className="team-menu"
        defaultValue="Phillies"
        // onChange={}
      >
        <option value="0" name="Phillies">
          Philadelphia Phillies
        </option>
      </select>
    )
  }
}

export default TeamMenu
