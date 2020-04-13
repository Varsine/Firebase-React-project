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
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./components/help component/auth"
import NotFound from "./components/layout/NotFound"

function App() {
  return (
    <Router>
      <div>
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route
            exact={true}
            path="/"
            component={UserIsAuthenticated(Dashboard)}
          ></Route>
          <Route
            path="/user/:id"
            component={UserIsAuthenticated(UserDetails)}
          ></Route>
          <Route
            path="/update/:id"
            component={UserIsAuthenticated(UpdateUser)}
          ></Route>
          <Route
            path="/create"
            component={UserIsAuthenticated(CreateNewUser)}
          ></Route>
          <Route
            exact={true}
            path="/signin"
            component={UserIsNotAuthenticated(SignIn)}
          ></Route>
          <Route
            path="/signup"
            component={UserIsNotAuthenticated(SignUp)}
          ></Route>
          <Route path="?" component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
