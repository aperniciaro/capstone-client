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
          <Route exact path="/Trade" component={Trade} />
          <Route exact path="/FreeAgent" component={FreeAgent} />
          <Route exact path="/Release" component={Release} />
          <Route exact path="/Player/:playerID" component={PlayerInfo} />
          <Route component={Error} />
        </Switch>
      </Router>
    )
  }
}

export default App
