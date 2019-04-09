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
        <button onClick={this.props.saveRoster}>Save Custom Roster</button>
        <section className="saved-menu">
          <h4>Saved Rosters: </h4>
          <select className="saved-rosters" defaultValue="0">
            <option value="" disabled hidden>
              Select
            </option>
            {this.props.savedRosters.map(roster => {
              return (
                <option key={roster.id} value={roster.id} name={roster.name}>
                  {roster.name}
                </option>
              )
            })}
          </select>
        </section>
        <button>Load Custom Roster</button>
        <button onClick={this.props.resetRoster}>Reset to Default</button>
      </section>
    )
  }
}

export default SaveLoad
