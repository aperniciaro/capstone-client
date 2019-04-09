import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavMenu extends Component {
  render() {
    return (
      <section className="actions">
        <Link to={'/Trade'}>
          <div className="trade-button">Trade</div>
        </Link>
        <Link to={'/FreeAgent'}>
          <div className="sign-button">Sign FA</div>
        </Link>
        <Link to={'/Release'}>
          <div className="release-button">Release Player</div>
        </Link>
      </section>
    )
  }
}

export default NavMenu
