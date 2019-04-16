import React, { Component } from 'react'

class SaveLoad extends Component {
  render() {
    return (
      <section className="save-and-load">
        <button onClick={this.props.resetRoster}>Reset to Default</button>
        <input
          className="save-input"
          placeholder="Name your roster"
          value={this.props.rosterNameInput}
          onChange={this.props.changeRosterName}
        />
        <button onClick={this.props.saveRoster}>Save Custom Roster</button>
        <section className="saved-menu">
          <h4>Saved Rosters: </h4>
          <select
            className="saved-rosters"
            defaultValue=""
            onChange={this.props.loadCustomRoster}
          >
            <option value="" disabled hidden>
              Select
            </option>
            {this.props.savedRosters
              .sort((rosterA, rosterB) =>
                rosterA.name.localeCompare(rosterB.name)
              )
              .map((roster, i) => {
                return (
                  <option key={i} value={roster.id} name={roster.name}>
                    {roster.name}
                  </option>
                )
              })}
          </select>
          {/* <button onClick={this.props.deleteRoster}>Delete Saved Roster</button> */}
        </section>
      </section>
    )
  }
}

export default SaveLoad
