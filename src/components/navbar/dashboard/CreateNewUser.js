import React from "react"
import {firestoreConnect} from "react-redux-firebase"

class CreateNewUser extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    balance: "",
    showPopup: true
  }
  handleChande = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      balance: "",
      showPopup: false
    })
    // this.props.createUser(this.state)
    const user = this.state
    const {firestore} = this.props
    firestore.add({collection: "client"}, user)
  }
  render() {
    const {lastName, firstName, email, balance} = this.state
    return (
      <div>
        {this.state.showPopup ? (
          <div className="popup">
            <form className="popup-inner" onSubmit={this.handleSubmit}>
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
              <button>Add User</button>
            </form>
          </div>
        ) : null}
      </div>
    )
  }
}

export default firestoreConnect()(CreateNewUser)
