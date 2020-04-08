import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Dashboard from "./components/dashboard/Dashboard"
import ProjectDetails from "./components/projects/ProjectDetails"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateNewProject from "./components/projects/CreateNewProject"
import UpdateProject from "./components/projects/UpdateProject"

function App() {
  return (
    <Router>
      <div>
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/project/:id" component={ProjectDetails}></Route>
          <Route path="/project/update/:id" component={UpdateProject}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/create" component={CreateNewProject}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
