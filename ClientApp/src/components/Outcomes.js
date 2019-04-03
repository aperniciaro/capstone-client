import React, { Component } from 'react'

class Outcomes extends Component {
  render() {
    return (
      <section className="outcomes">
        <section className="expected-record">
          <h3>Expected Record: </h3>
          <p>82-80</p>
        </section>
        <section>
          <h3>Projected Division Standings: </h3>
          <ol className="division-standings">
            {this.props.divisionTeams.map(team => {
              return <li key={team.mlb_org_id}>{team.name_display_full}</li>
            })}
          </ol>
        </section>
      </section>
    )
  }
}

export default Outcomes
