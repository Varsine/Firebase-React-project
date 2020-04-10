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
    error: ""
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  validate = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordRepeat,
      error
    } = this.state
    if (
      firstName == "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordRepeat === ""
    ) {
      this.setState({
        error: "Input fields cannot be empty, fill in the fields"
      })
    } else if (lastName.length < 3 || firstName.length < 3) {
      this.setState({
        error: "Firstname and lastname lengths must be large or equal to 3"
      })
    } else if (!email.includes("@")) {
      this.setState({error: "Email should include @"})
    } else if (password !== passwordRepeat) {
      this.setState({
        error: "Password and passwordrepeat must be the same"
      })
    } else if (password.length < 8) {
      this.setState({
        error: "The length of the password must be large or equal to 8"
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
    } else {
      alert(this.state.error)
    }
  }

  render() {
    const {authError, auth} = this.props

    const {firstName, lastName, email, password, passwordRepeat} = this.state
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
          />
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName.slice(0, 1).toUpperCase() + lastName.slice(1)}
            onChange={this.handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
          <label>Repeat Password</label>
          <input
            type="password"
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={this.handleChange}
          />
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
