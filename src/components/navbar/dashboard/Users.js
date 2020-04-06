import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import Loading from "./loading/Loading"
import {Link} from "react-router-dom"
import CreateNewUser from "./CreateNewUser"
import {removeUser} from "../store/action/authAction"

export class Users extends React.Component {
  state = {
    showPopup: false
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  handleRemove = index => {
    this.props.clients.filter(item => {
      return item.id !== index
    })
  }
  render() {
    const clients = this.props.clients
    return (
      <div className="users-form">
        <h1>Users</h1>
        <button className="add-user" onClick={this.togglePopup}>
          Creat User
        </button>

        {!clients ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Balance ($)</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td>
                    <Link
                      className="user-email"
                      to={"/dashboard/user-" + (index + 1)}
                    >
                      {client.email}
                    </Link>
                  </td>
                  <td>{client.balance}</td>
                  <td>
                    <button
                      className="trash-btn"
                      onClick={() => this.props.removeUser(client.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>{this.state.showPopup ? <CreateNewUser /> : null}</div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    clients: state.firestore.ordered.client
  }
}
const mapDispatchToProps = dispatch => ({
  removeUser: currentId => dispatch(removeUser(currentId))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{collection: "client"}])
)(Users)
