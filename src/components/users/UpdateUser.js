import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {updateUser} from "../store/action/userAction"

class UpdateUser extends React.Component {
  state = {
    firstNmae: "",
    lastName: "",
    email: "",
    balance: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUser(this.state)
    this.props.history.push("/")
  }

  render() {
    console.log(this.props)
    const {client} = this.props
    const {lastName, firstName, email, balance} = this.state

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
                placeholder={client.firstName}
                value={firstName.slice(0, 1).toUpperCase() + firstName.slice(1)}
                id="firstName"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>Update last name</p>
              <input
                type="text"
                placeholder={client.lastName}
                value={lastName.slice(0, 1).toUpperCase() + lastName.slice(1)}
                id="lastName"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>Update email</p>
              <input
                type="email"
                placeholder={client.email}
                value={email}
                id="email"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>Update balance</p>
              <input
                type="number"
                placeholder={client.balance}
                value={balance}
                id="balance"
                onChange={this.handleChange}
              />
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
  console.log(state)
  const id = ownProps.match.params.id
  const clients = state.firestore.data.client
  const client = clients ? clients[id] : null
  return {
    client: client,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{collection: "client"}])
)(UpdateUser)
