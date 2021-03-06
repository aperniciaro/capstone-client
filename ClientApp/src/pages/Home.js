import React, { Component } from 'react'
import axios from 'axios'
import async from 'async'
import TeamMenu from '../components/TeamMenu'
import SaveLoad from '../components/SaveLoad'
import Outcomes from '../components/Outcomes'
import UserRoster from '../components/UserRoster'
import NavMenu from '../components/NavMenu'
import Footer from '../components/Footer'

class Home extends Component {
  state = {
    teams: [],
    userTeam: {},
    defaultPlayerList: [],
    userPlayerList: [],
    rosterName: '',
    rosterNameInput: '',
    savedRosters: [],
    userRoster: {},
    initialProjWins: 0,
    newProjWins: 0,
    projWinsDiff: 0,
    primaryColor: 'rgb(184,102,69)',
    secondaryColor: 'rgb(100, 99, 39)',
    tertiaryColor: 'rgb(246, 214, 179)'
  }

  componentDidMount() {
    document.title = 'Armchair GM'
    this.GetAllTeams()
    this.GetUserInfoFromStorage()
  }

  GetAllTeams = () => {
    axios.get('/api/Team').then(resp => {
      this.setState({ teams: resp.data })
    })
  }

  GetUserInfoFromStorage = () => {
    if (localStorage.getItem('user-roster')) {
      const userRosterFromStorage = JSON.parse(
        localStorage.getItem('user-roster')
      )
      axios.get(`/api/Roster/${userRosterFromStorage.id}`).then(resp => {
        this.setState(
          {
            userRoster: resp.data,
            userTeam: resp.data.team,
            userPlayerList: resp.data.players,
            initialProjWins: resp.data.projectedWins,
            primaryColor: `rgb(${resp.data.team.primaryColor[0]},${
              resp.data.team.primaryColor[1]
            },${resp.data.team.primaryColor[2]})`,
            secondaryColor: `rgb(${resp.data.team.secondaryColor[0]},${
              resp.data.team.secondaryColor[1]
            },${resp.data.team.secondaryColor[2]})`,
            tertiaryColor: `rgb(${resp.data.team.tertiaryColor[0]},${
              resp.data.team.tertiaryColor[1]
            },${resp.data.team.tertiaryColor[2]})`
          },
          () => {
            this.setState(
              { newProjWins: this.CalculateProjectedWins() },
              () => {
                this.CompareProjectedWins()
              }
            )
          }
        )
      })
    }
    if (localStorage.getItem('saved-rosters')) {
      this.setState({
        savedRosters: JSON.parse(localStorage.getItem('saved-rosters'))
      })
    }
  }

  ChangeUserTeam = event => {
    let selectedTeam = this.state.teams.filter(
      team => team.mlbId === parseInt(event.target.value, 10)
    )[0]
    this.setState(
      {
        userTeam: selectedTeam,
        rosterNameInput: '',
        projWinsDiff: 0,
        primaryColor: `rgb(${selectedTeam.primaryColor[0]},${
          selectedTeam.primaryColor[1]
        },${selectedTeam.primaryColor[2]})`,
        secondaryColor: `rgb(${selectedTeam.secondaryColor[0]},${
          selectedTeam.secondaryColor[1]
        },${selectedTeam.secondaryColor[2]})`,
        tertiaryColor: `rgb(${selectedTeam.tertiaryColor[0]},${
          selectedTeam.tertiaryColor[1]
        },${selectedTeam.tertiaryColor[2]})`
      },
      () => {
        this.CreateUserRoster()
      }
    )
  }

  CreateUserRoster = () => {
    const data = {
      team: this.state.userTeam,
      teamId: this.state.userTeam.id,
      name: `${this.state.userTeam.teamName} default`,
      players: []
    }
    axios
      .post('/api/Roster', data, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        localStorage.setItem('user-roster', JSON.stringify(resp.data))
        localStorage.removeItem('free-agents')
        this.setState({ userRoster: resp.data }, () => {
          this.GetDefaultPlayerList(this.state.userTeam.mlbId)
        })
      })
  }

  GetDefaultPlayerList = teamId => {
    axios
      .get(
        `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${teamId}'`
      )
      .then(resp => {
        this.setState(
          {
            defaultPlayerList: resp.data.roster_40.queryResults.row
          },
          () => {
            this.GetPlayerStats()
          }
        )
      })
  }

  GetPlayerStats = () => {
    const currentYear = new Date().getFullYear()
    let playerData = this.state.defaultPlayerList.map(player => {
      return callback => {
        if (player.primary_position === '1') {
          axios
            .get(
              `https://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season='${currentYear}'&player_id='${
                player.player_id
              }'`
            )
            .then(resp => {
              if (resp.data.proj_pecota_pitching.queryResults.row) {
                callback(null, {
                  mlbId: player.player_id,
                  playerName: player.name_display_first_last,
                  position: player.primary_position,
                  projERA: resp.data.proj_pecota_pitching.queryResults.row.era,
                  projIP: resp.data.proj_pecota_pitching.queryResults.row.ip
                })
              } else {
                callback(null, {
                  mlbId: 621076,
                  playerName: 'James Kaprielian',
                  position: '1',
                  projERA: 0,
                  projIP: 0
                })
              }
            })
        } else {
          axios
            .get(
              `https://lookup-service-prod.mlb.com/json/named.proj_pecota_batting.bam?season='${currentYear}'&player_id='${
                player.player_id
              }'`
            )
            .then(resp => {
              callback(null, {
                mlbId: player.player_id,
                playerName: player.name_display_first_last,
                position: player.primary_position,
                projRuns: resp.data.proj_pecota_batting.queryResults.row.r
              })
            })
        }
      }
    })
    async.parallel(playerData, (err, data) => {
      this.PostPlayersToRoster(data)
    })
  }

  PostPlayersToRoster = playerData => {
    axios
      .post(`/api/Player/${this.state.userRoster.id}`, playerData, {
        headers: { 'Content-type': 'application/json' }
      })
      .then(resp => {
        localStorage.setItem(
          'user-roster',
          JSON.stringify(this.state.userRoster)
        )
        this.setState(
          {
            userPlayerList: resp.data
          },
          () => {
            axios
              .put(
                `/api/Roster/${this.state.userRoster.id}/wins`,
                Math.round(this.CalculateProjectedWins()),
                { headers: { 'Content-type': 'application/json' } }
              )
              .then(resp => {
                this.setState({
                  initialProjWins: resp.data.projectedWins,
                  newProjWins: resp.data.projectedWins,
                  projWinsDiff: 0
                })
              })
          }
        )
      })
  }

  CalculateProjectedWins = () => {
    let projRunsScored = 0
    let projRunsAllowed = 0
    for (let i = 0; i < this.state.userPlayerList.length; i++) {
      if (this.state.userPlayerList[i].position === '1') {
        projRunsAllowed +=
          this.state.userPlayerList[i].projERA *
          (this.state.userPlayerList[i].projIP / 9)
      } else {
        projRunsScored += this.state.userPlayerList[i].projRuns
      }
    }
    return (
      (Math.pow(projRunsScored, 1.81) /
        (Math.pow(projRunsScored, 1.81) + Math.pow(projRunsAllowed, 1.81))) *
      162
    )
  }

  CompareProjectedWins = () => {
    this.setState({
      projWinsDiff: this.state.newProjWins - this.state.initialProjWins
    })
  }

  ChangeRosterName = event => {
    this.setState({
      rosterNameInput: event.target.value
    })
  }

  SaveRoster = () => {
    this.setState(
      {
        rosterName: this.state.rosterNameInput
      },
      () => {
        axios
          .put(
            `/api/Roster/${this.state.userRoster.id}`,
            {
              name: this.state.rosterName,
              players: this.state.userPlayerList,
              isCustom: true,
              projectedWins: Math.round(this.state.newProjWins),
              team: this.state.userTeam
            },
            { headers: { 'Content-type': 'application/json' } }
          )
          .then(resp => {
            if (
              resp.data.name !== '' &&
              !this.state.savedRosters.includes(resp.data.name)
            ) {
              this.setState(
                {
                  savedRosters: this.state.savedRosters.concat(resp.data)
                },
                () => {
                  localStorage.setItem(
                    'saved-rosters',
                    JSON.stringify([].concat(this.state.savedRosters))
                  )
                }
              )
            }
          })
      }
    )
  }

  LoadRoster = event => {
    let selectedRoster = this.state.savedRosters.filter(
      roster => roster.id === parseInt(event.target.value, 10)
    )[0]
    this.setState({
      userRoster: selectedRoster,
      userPlayerList: selectedRoster.players,
      userTeam: selectedRoster.team,
      initialProjWins: selectedRoster.projectedWins,
      newProjWins: selectedRoster.projectedWins,
      projWinsDiff: 0,
      rosterNameInput: '',
      primaryColor: `rgb(${selectedRoster.team.primaryColor[0]},${
        selectedRoster.team.primaryColor[1]
      },${selectedRoster.team.primaryColor[2]})`,
      secondaryColor: `rgb(${selectedRoster.team.secondaryColor[0]},${
        selectedRoster.team.secondaryColor[1]
      },${selectedRoster.team.secondaryColor[2]})`,
      tertiaryColor: `rgb(${selectedRoster.team.tertiaryColor[0]},${
        selectedRoster.team.tertiaryColor[1]
      },${selectedRoster.team.tertiaryColor[2]})`
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>Armchair GM</h1>
          <h2>Choose Your Team: </h2>
          <TeamMenu teams={this.state.teams} changeTeam={this.ChangeUserTeam} />
        </header>
        <main
          style={{
            backgroundColor: this.state.primaryColor,
            color: this.state.tertiaryColor
          }}
        >
          <section
            className="manage-roster"
            style={{ backgroundColor: this.state.secondaryColor }}
          >
            <UserRoster userPlayers={this.state.userPlayerList} />
            <NavMenu />
          </section>
          <Outcomes
            winDiff={this.state.projWinsDiff}
            prevProjWins={this.state.prevProjWins}
            newProjWins={this.state.newProjWins}
          />
          <SaveLoad
            resetRoster={this.CreateUserRoster}
            saveRoster={this.SaveRoster}
            loadRoster={this.LoadRoster}
            changeRosterName={this.ChangeRosterName}
            rosterNameInput={this.state.rosterNameInput}
            savedRosters={this.state.savedRosters}
            loadCustomRoster={this.LoadRoster}
            deleteRoster={this.DeleteRoster}
          />
        </main>
        <Footer />
      </div>
    )
  }
}

export default Home
