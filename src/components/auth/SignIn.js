import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {singIn} from "../store/action/authAction"
import {Redirect} from "react-router-dom"

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
    const {authError, auth} = this.props
    const {email, password, error} = this.state
    const isInvalid = password === "" || email === ""
    if (auth.uid) return <Redirect to="/" />
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <form className="white" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handleChange} />
          <button className="btn pink lighten-1 z-depth-0" disabled={isInvalid}>
            Log in
          </button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singIn: creds => dispatch(singIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
