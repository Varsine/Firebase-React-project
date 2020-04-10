import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Dashboard from "./components/dashboard/Dashboard"
import UserDetails from "./components/users/UserDetails"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateNewUser from "./components/users/CreateNewUser"
import UpdateUser from "./components/users/UpdateUser"

function App() {
  return (
    <Router>
      <div>
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/user/:id" component={UserDetails}></Route>
          <Route path="/update/:id" component={UpdateUser}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/create" component={CreateNewUser}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
