import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"

class UpdateUser extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    balance: "",
    errorEmail: "",
    errorBalance: ""
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  validate = () => {
    const {email, balance} = this.state

    if (!email.includes("@")) {
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
    const {client, firestore} = this.props
    const {firstName, lastName, email, balance} = this.state

    const isValid = this.validate()
    if (isValid) {
      this.props.history.push("/")
      firestore
        .collection("client")
        .doc(this.props.match.params.id)
        .update({
          ...this.state,
          lastName: lastName ? lastName : client.lastName,
          firstName: firstName ? firstName : client.firstName,
          email: email ? email : client.email,
          balance: balance ? balance : client.balance
        })
    }
  }

  render() {
    const {client} = this.props
    const {errorEmail, errorBalance} = this.state

    return (
      <div>
        {!client ? (
          <div>loding...</div>
        ) : (
          <form onSubmit={this.handleSubmit} className="userUpdate-form">
            <div>
              <p>Update first name</p>
              <input
                type="text"
                defaultValue={client.firstName}
                id="firstName"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>Update last name</p>
              <input
                type="text"
                defaultValue={client.lastName}
                id="lastName"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>Update email</p>
              <input
                type="text"
                defaultValue={client.email}
                id="email"
                onChange={this.handleChange}
              />
              <div className="red-text center">
                {errorEmail ? <p>{errorEmail}</p> : null}
              </div>
            </div>
            <div>
              <p>Update balance</p>
              <input
                type="number"
                defaultValue={client.balance}
                id="balance"
                onChange={this.handleChange}
              />
              <div className="red-text center">
                {errorBalance ? <p>{errorBalance}</p> : null}
              </div>
            </div>
            <div className="btn pink lighten-1 z-depth-0">
              <button>Update</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const clients = state.firestore.data.client
  const client = clients ? clients[id] : null
  return {
    client: client,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: "client"}])
)(UpdateUser)
