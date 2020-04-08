import React from "react"
import Notification from "./Notification"
import ProjectList from "../projects/ProjectList"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {Redirect} from "react-router-dom"

class Dashboard extends React.Component {
  render() {
    const {projects, auth} = this.props
    if (!auth.uid) return <Redirect to="/signin" />
    return (
      <div>
        <div>
          <div>
            <ProjectList />
          </div>
          <div></div>
        </div>
        <Notification />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection: "client"}])
)(Dashboard)
