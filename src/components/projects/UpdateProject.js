import React from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {Redirect} from "react-router-dom"

class UpdateProject extends React.Component {
  state = {
    firstNmae: "",
    lastName: "",
    email: "",
    password: ""
  }

  handleChange = e => {
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
    const {client, auth} = props
    if (!auth.uid) return <Redirect to="/signin" />

    return (
      <div>
        <form>
          <div>
            <p>Update first name</p>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div>
            <p>Update last name</p>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div>
            <p>Update email</p>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div>
            <p>Update password</p>
            <input type="text" id="password" onChange={this.handleChange} />
          </div>
          <div className="btn pink lighten-1 z-depth-0">
            <button>Add change</button>
          </div>
        </form>
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
)(UpdateProject)
