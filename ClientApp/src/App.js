import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Trade from './pages/Trade'
import FreeAgent from './pages/FreeAgent'
import Release from './pages/Release'
import PlayerInfo from './pages/PlayerInfo'
import Error from './pages/Error'
import './css/App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/freeagent" component={FreeAgent} />
          <Route exact path="/release" component={Release} />
          <Route exact path="/player/:playername" component={PlayerInfo} />
          <Route component={Error} />
        </Switch>
      </Router>
    )
  }
}

export default App
