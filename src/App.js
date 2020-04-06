import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Search from "./components/navbar/search/Search"
import logo from "./components/image/logo.png"
import Home from "./components/home/Home"
import Users from "./components/navbar/dashboard/Users"
import SingIn from "./components/navbar/singIn/SingIn"
import SingUp from "./components/navbar/singUp/SingUp"

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <Link className="link-logo" to={"/"}>
            <img className="home-logo" src={logo} alt="home" />
          </Link>

          <Link className="link" to={"/dashboard"}>
            Dashboard
          </Link>

          <Link className="link" to={"/singIn"}>
            Sing In
          </Link>
          <Link className="link" to={"/singUp"}>
            Sing Up
          </Link>
          <Search />
        </div>

        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Users />
          </Route>
          <Route path="/SingIn">
            <SingIn />
          </Route>
          <Route path="/singUp">
            <SingUp />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
