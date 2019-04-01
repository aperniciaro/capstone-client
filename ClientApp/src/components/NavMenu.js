import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavMenu extends Component {
  render() {
    return (
      <section className="actions">
        <Link to={'/Trade'}>
          <button className="trade-button">Trade</button>
        </Link>
        <Link to={'/FreeAgent'}>
          <button className="sign-button">Sign FA</button>
        </Link>
        <Link to={'/Release'}>
          <button className="release-button">Release Player</button>
        </Link>
      </section>
    )
  }
}

export default NavMenu
