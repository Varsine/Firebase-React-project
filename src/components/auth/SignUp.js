import React from "react"
import "firebase/firestore"
import {signUp} from "../store/action/authAction"
import {connect} from "react-redux"

class SignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    errorFirstname: "",
    errorLastname: "",
    errorEmail: "",
    errorPassword: ""
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  validate = () => {
    const {firstName, lastName, email, password, passwordRepeat} = this.state
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordRepeat === ""
    ) {
      this.setState({
        errorPassword: "Input fields cannot be empty, fill in the fields"
      })
    } else if (firstName.length < 3) {
      this.setState({
        errorFirstname: "Firstname lengths must be large or equal to 3"
      })
    } else if (lastName.length < 5) {
      this.setState({
        errorLastname: "Lastname lengths must be large or equal to 5"
      })
    } else if (!email.includes("@")) {
      this.setState({errorEmail: "Email should include @"})
    } else if (password.length < 8) {
      this.setState({
        errorPassword: "The length of the password must be large or equal to 8"
      })
    } else if (password !== passwordRepeat) {
      this.setState({
        errorPassword: "Password and passwordrepeat must be the same"
      })
    } else {
      return this.state
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      this.props.signUp(this.state)
      this.props.history.push("/signin")
    }
  }

  render() {
    const {authError} = this.props

    const {
      firstName,
      lastName,
      email,
      password,
      passwordRepeat,
      errorFirstname,
      errorLastname,
      errorEmail,
      errorPassword
    } = this.state
    return (
      <div className="container">
        <h2>Sing Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName.slice(0, 1).toUpperCase() + firstName.slice(1)}
            onChange={this.handleChange}
          />{" "}
          <div className="red-text center">
            {errorFirstname ? <p>{errorFirstname}</p> : null}
          </div>
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName.slice(0, 1).toUpperCase() + lastName.slice(1)}
            onChange={this.handleChange}
          />{" "}
          <div className="red-text center">
            {errorLastname ? <p>{errorLastname}</p> : null}
          </div>
          <label>Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={this.handleChange}
          />{" "}
          <div className="red-text center">
            {errorEmail ? <p>{errorEmail}</p> : null}
          </div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />{" "}
          <label>Repeat Password</label>
          <input
            type="password"
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={this.handleChange}
          />
          <div className="red-text center">
            {errorPassword ? <p>{errorPassword}</p> : null}
          </div>
          <button className="btn pink lighten-1 z-depth-0">Sign up</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>{" "}
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
    signUp: newUser => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
