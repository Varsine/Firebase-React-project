import React from "react"
import {Link} from "react-router-dom"

let Dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        Dropdown
        <i className="fa fa-caret-down"> </i>
      </button>
      <div className="dropdown-content">
        <Link className="dropdown-link">Link 1</Link>
        <Link className="dropdown-link">Link 2</Link>
        <Link className="dropdown-link">Link 3</Link>
      </div>
    </div>
  )
}
export default Dropdown
