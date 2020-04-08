import React from "react"
import "firebase/firestore"
import {signUp} from "../store/action/authAction"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

class SignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
    //passwordTwo: ""
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.signUp(this.state)
  }

  render() {
    const {authError, auth} = this.props
    if (auth.uid) return <Redirect to="/" />

    const {
      firstName,
      lastName,
      email,
      password
      //passwordTwo,
    } = this.state
    const isInvalid =
      // passwordOne !== passwordTwo ||
      password === "" || email === "" || lastName === "" || firstName === ""
    return (
      <div className="container">
        <h2>Sing Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={this.handleChange}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={this.handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
            required
          />
          {/* <label>Repeat Password</label>
          <input
            type="password"
            id="passwordTwo"
            value={passwordTwo}
            onChange={this.handleChange}
            required
          /> */}
          <button className="btn pink lighten-1 z-depth-0" disabled={isInvalid}>
            Sign up
          </button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>{" "}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
