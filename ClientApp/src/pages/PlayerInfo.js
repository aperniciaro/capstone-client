import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class PlayerInfo extends Component {
  state = {
    player: {}
  }

  componentDidMount() {
    this.GetPlayerBio()
  }

  GetPlayerBio = () => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${
          this.props.match.params.playerID
        }'`
      )
      .then(resp => {
        this.setState({
          player: resp.data.player_info.queryResults.row
        })
      })
  }

  render() {
    return (
      <div>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
        <header>
          <h1>Player Information</h1>
        </header>
        <main>
          <section className="player-bio">
            <h2>
              {this.state.player.name_display_last_first} #
              {this.state.player.jersey_number}
            </h2>
            <h3>Position: {this.state.player.primary_position_txt}</h3>
            <h3>Age: {this.state.player.age}</h3>
            <h3>Bats: {this.state.player.bats}</h3>
            <h3>Throws: {this.state.player.throws}</h3>
          </section>
          <section className="player-stats">
            <h3>Player Stats: </h3>
            <p>HRs: </p>
            <p>SBs: </p>
            <p>BA: </p>
            <p>ERA: </p>
          </section>
        </main>
      </div>
    )
  }
}

export default PlayerInfo
