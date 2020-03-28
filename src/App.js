import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Search from "./components/navbar/Search"
import logo from "./components/image/logo.png"
import Dropdown from "./components/navbar/dropdown/Dropdown"

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link className="link-logo" to="/">
            <img className="home-logo" src={logo} alt="home" />
          </Link>

          <Link className="link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="link" to="/users">
            News
          </Link>
          <Dropdown />
          <Search />
        </nav>

        <Switch>
          <Route path="/"></Route>
          <Route path="/dashboard"></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
