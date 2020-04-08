import React from "react"
import {firestoreConnect} from "react-redux-firebase"
import {connect} from "react-redux"
import {createProject} from "../store/action/prajectAction"
import {Redirect} from "react-router-dom"

class CreateNewProject extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    balance: ""
  }
  handleChande = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.createProject(this.state)
    this.props.history.push("/")
  }
  render() {
    const {auth} = this.props
    if (!auth.uid) return <Redirect to="/signin" />

    const {lastName, firstName, email, balance} = this.state
    return (
      <div>
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
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
            <label>Balans</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={this.handleChande}
              required
            />
            <button className="btn pink lighten-1 z-depth-0">Add User</button>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewProject)
