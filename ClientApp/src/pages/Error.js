import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Error extends Component {
  state = {
    primaryColor: 'rgb(184,102,69)',
    secondaryColor: 'rgb(100, 99, 39)',
    tertiaryColor: 'rgb(246, 214, 179)'
  }

  componentDidMount() {
    document.title = 'Armchair GM'
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.primaryColor,
          color: this.state.tertiaryColor
        }}
      >
        <h2>Error, Page Not Found</h2>
        <Link to="/">
          <p
            style={{
              backgroundColor: this.state.secondaryColor
            }}
          >
            Return to Home
          </p>
        </Link>
      </div>
    )
  }
}

export default Error
