import React from "react"
import {Link} from "react-router-dom"
import SignedInLinks from "./SignedInLink"
import SignedOutLinks from "./SignedOutLink"
import {connect} from "react-redux"

const Navbar = props => {
  const {auth, profile} = props
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  )
  return (
    <nav className="nav-wrapper gray darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          <img
            className="home-img"
            src="https://img.icons8.com/color/480/firebase.png"
            alt="home-img"
          />
        </Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
