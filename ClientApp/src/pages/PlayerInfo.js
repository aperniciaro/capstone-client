import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlayerStats from '../components/PlayerStats'
import Footer from '../components/Footer'

class PlayerInfo extends Component {
  state = {
    playerBio: {},
    playerStats: {},
    primaryColor: 'rgb(220,220,220)',
    secondaryColor: 'rgb(169, 169, 169)',
    tertiaryColor: 'rgb(105, 105, 105)'
  }

  componentDidMount() {
    this.GetPlayerBio()
    this.GetUserInfoFromStorage()
  }

  GetUserInfoFromStorage = () => {
    const userRosterFromStorage = JSON.parse(
      localStorage.getItem('user-roster')
    )
    axios.get(`/api/Roster/${userRosterFromStorage.id}`).then(resp => {
      this.setState({
        userRoster: resp.data,
        userTeam: resp.data.team,
        userPlayerList: resp.data.players
        // primaryColor: `rgb(${resp.data.team.primaryColor[0]},${
        //   resp.data.team.primaryColor[1]
        // },${resp.data.team.primaryColor[2]})`,
        // secondaryColor: `rgb(${resp.data.team.secondaryColor[0]},${
        //   resp.data.team.secondaryColor[1]
        // },${resp.data.team.secondaryColor[2]})`,
        // tertiaryColor: `rgb(${resp.data.team.tertiaryColor[0]},${
        //   resp.data.team.tertiaryColor[1]
        // },${resp.data.team.tertiaryColor[2]})`
      })
    })
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
            if (parseInt(this.state.playerBio.primary_position, 10) === 1) {
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
        `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${previousYear}'&player_id='${
          this.props.match.params.playerID
        }'`
      )
      .then(resp => {
        this.setState({
          playerStats: resp.data.sport_pitching_tm.queryResults.row
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
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="player-bio"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
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
        <Footer />
      </div>
    )
  }
}

export default PlayerInfo
