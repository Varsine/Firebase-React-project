import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {Redirect} from "react-router-dom"

const ProjectDetails = props => {
  const {client, auth} = props
  if (!auth.uid) return <Redirect to="/signin" />

  if (client) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <img className="user-img" src={client.photoURL} />
          <span className="card-title">
            {client.firstName + " " + client.lastName}
          </span>
          <p className="userProfile-info">
            Your username is your identity online. Whether you’re posting on
            forums, editing a wiki, playing games, or doing any other online
            activity that involves interacting with others, your username will
            be the first thing other people see.People will make assumptions
            about you based on the name you choose, so pick wisely!
          </p>
          <p>Balance - {client.balance} $</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loadin project...</p>
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
)(ProjectDetails)
