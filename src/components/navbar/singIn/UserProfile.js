import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {signOut} from "../store/action/authAction"

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <h1>user profile</h1>
        <Link onClick={this.props.signOut} to={"/"}>
          Sign out
        </Link>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(UserProfile)
