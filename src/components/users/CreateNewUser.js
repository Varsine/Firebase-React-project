import React from "react"
import {firestoreConnect} from "react-redux-firebase"
import {connect} from "react-redux"
import {createUser} from "../store/action/userAction"
import {Redirect} from "react-router-dom"

class CreateNewUser extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    balance: "",
    errorFirstname: "",
    errorLastname: "",
    errorEmail: "",
    errorBalance: ""
  }
  handleChande = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  validate = () => {
    const {firstName, lastName, email, balance} = this.state
    if (firstName === "" || lastName === "" || email === "" || balance === "") {
      this.setState({
        errorBalance: "Input fields cannot be empty, fill in the fields"
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
    } else if (balance < 0) {
      this.setState({
        errorBalance: "Balance cannot be negative"
      })
    } else {
      return this.state
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      this.props.createUser(this.state)
      this.props.history.push("/")
    }
  }
  render() {
    const {
      lastName,
      firstName,
      email,
      balance,
      errorFirstname,
      errorLastname,
      errorEmail,
      errorBalance
    } = this.state
    return (
      <div>
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName.slice(0, 1).toUpperCase() + firstName.slice(1)}
              onChange={this.handleChande}
            />
            <div className="red-text center">
              {errorFirstname ? <p>{errorFirstname}</p> : null}
            </div>
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName.slice(0, 1).toUpperCase() + lastName.slice(1)}
              onChange={this.handleChande}
            />
            <div className="red-text center">
              {errorLastname ? <p>{errorLastname}</p> : null}
            </div>
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={this.handleChande}
            />
            <div className="red-text center">
              {errorEmail ? <p>{errorEmail}</p> : null}
            </div>
            <label>Balans</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={this.handleChande}
            />
            <div className="red-text center">
              {errorBalance ? <p>{errorBalance}</p> : null}
            </div>
            <button className="btn pink lighten-1 z-depth-0">Add User</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatchToProps)(CreateNewUser)
