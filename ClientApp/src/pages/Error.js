import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
  render() {
    return (
      <div>
        <h2>Error, Page Not Found</h2>
        <Link to="/">
          <p className="breadcrumb">Return to Home</p>
        </Link>
      </div>
    )
  }
}

export default Error
