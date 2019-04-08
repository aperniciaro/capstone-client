import React, { Component } from 'react'

class SaveLoad extends Component {
  render() {
    return (
      <section className="save-and-load">
        <input
          className="save-input"
          placeholder="Name your roster"
          value={this.props.rosterNameInput}
          onChange={this.props.changeRosterName}
        />
        <button>Save Custom Roster</button>
        <section className="saved-menu">
          <h4>Saved Rosters: </h4>
          <select className="saved-rosters" defaultValue="0">
            <option value="0" name="Roster1">
              Roster1
            </option>
          </select>
        </section>
        <button>Load Custom Roster</button>
        <button onClick={this.props.resetRoster}>Reset to Default</button>
      </section>
    )
  }
}

export default SaveLoad
