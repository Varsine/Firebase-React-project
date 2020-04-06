import React from "react"
import "firebase/firestore"
import {singUp} from "../store/action/authAction"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
//import UserProfile from "../singIn/UserProfile"

class SingUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    passwordOne: "",
    passwordTwo: ""
  }
  handleChande = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.singUp(this.state)
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    })
  }

  render() {
    console.log(this.props)
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      lastName === "" ||
      firstName === ""
    const {auth, authError} = this.props
    if (auth.uid) return <Redirect to="/" />
    return (
      <div className="sing-up">
        <h2>Sing Up</h2>
        <form onSubmit={this.handleChande}>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={this.handleChande}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={this.handleChande}
            required
          />
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChande}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="passwordOne"
            value={passwordOne}
            onChange={this.handleChande}
            required
          />
          <label>Repeat Password</label>
          <input
            type="password"
            id="passwordTwo"
            value={passwordTwo}
            onChange={this.handleChande}
            required
          />
          <button onClick={this.handlerSubmit} disabled={isInvalid}>
            Sing up
          </button>
          {authError ? <p>{authError}</p> : null}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singUp: newUser => dispatch(singUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp)
