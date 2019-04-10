import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
  state = {
    primaryColor: `rgb(201,58,69)`,
    secondaryColor: `rgb(31, 48, 129)`,
    tertiaryColor: `rgb(255, 255, 255)`
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
          <p className="breadcrumb">Return to Home</p>
        </Link>
      </div>
    )
  }
}

export default Error
