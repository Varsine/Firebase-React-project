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
          <span className="card-title">
            {client.firstName + " " + client.lastName}
          </span>
          <p>
            Deploy web and mobile web apps in seconds using a secure global
            content delivery network
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
  console.log(state)
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
