import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <section className="login-section">
        <p>New or Existing User: </p>
        <input placeholder="User Name" />
        <p>Password: </p>
        <input placeholder="Password" />
        <button className="log-in-button">Log In</button>
      </section>
    )
  }
}

export default Login
