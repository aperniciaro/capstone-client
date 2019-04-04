import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlayerStats from '../components/PlayerStats'

class PlayerInfo extends Component {
  state = {
    playerBio: {},
    playerStats: {}
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
        this.setState(
          {
            playerBio: resp.data.player_info.queryResults.row
          },
          () => {
            if (this.state.playerBio.primary_position === 1) {
              this.GetPitchingStats()
            } else {
              this.GetHittingStats()
            }
          }
        )
      })
  }

  GetHittingStats = () => {
    const previousYear = new Date().getFullYear() - 1
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${previousYear}'&player_id='${
          this.props.match.params.playerID
        }'`
      )
      .then(resp => {
        this.setState({
          playerStats: resp.data.sport_hitting_tm.queryResults.row
        })
      })
  }

  GetPitchingStats = () => {
    const previousYear = new Date().getFullYear() - 1
    axios
      .get(
        `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${previousYear}'&player_id='${
          this.props.match.params.playerID
        }'`
      )
      .then(resp => {
        this.setState({
          playerStats: resp.data.pitching.queryResults.row
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
              {this.state.playerBio.name_display_last_first} #
              {this.state.playerBio.jersey_number}
            </h2>
            <h3>Position: {this.state.playerBio.primary_position_txt}</h3>
            <h3>Age: {this.state.playerBio.age}</h3>
            <h3>Bats: {this.state.playerBio.bats}</h3>
            <h3>Throws: {this.state.playerBio.throws}</h3>
          </section>
          <section className="player-stats">
            <h2>Previous Season Stats: </h2>
            <PlayerStats
              position={this.state.playerBio.primary_position}
              stats={this.state.playerStats}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default PlayerInfo
