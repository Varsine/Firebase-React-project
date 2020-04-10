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
    error: ""
  }
  handleChande = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  validate = () => {
    const {firstName, lastName, email, balance} = this.state
    if (firstName == "" || lastName === "" || email === "" || balance === "") {
      this.setState({
        error: "Input fields cannot be empty, fill in the fields"
      })
    } else if (lastName.length < 3 || firstName.length < 3) {
      this.setState({
        error: "Firstname and lastname lengths must be large or equal to 3"
      })
    } else if (!email.includes("@")) {
      this.setState({error: "Email should include @"})
    } else if (balance < 0) {
      this.setState({
        error: "Balance cannot be negative"
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
    } else {
      alert(this.state.error)
    }
  }
  render() {
    const {lastName, firstName, email, balance} = this.state
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
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName.slice(0, 1).toUpperCase() + lastName.slice(1)}
              onChange={this.handleChande}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={this.handleChande}
            />
            <label>Balans</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={this.handleChande}
            />
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
