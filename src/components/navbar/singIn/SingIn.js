import React from "react"
import {Link} from "react-router-dom"
import UserProfile from "./UserProfile"
import {connect} from "react-redux"
import {singIn} from "../store/action/authAction"

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: null
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.singIn(this.state)
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    const {authError} = this.props
    const {email, password, error} = this.state
    const isInvalid = password === "" || email === ""
    //if (!isInvalid) return <UserProfile />
    return (
      <div className="sing-in">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="email" id="email" onChange={this.handleChange} />
          <label>Password</label>
          <input type="password" id="password" onChange={this.handleChange} />

          {/* <Link to={"/dropdown/singIn/profile/1"}> */}
          <button disabled={isInvalid}>Sing in</button>
          <div>{authError ? <p>{authError}</p> : null}</div>
          {/* </Link> */}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singIn: creds => dispatch(singIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
