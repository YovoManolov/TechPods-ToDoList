import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="navbar-brand container">Task Organiser App</div>
        <ul className="navbar-nav justify-content-end container">
          <li className="nav-link px-4">
            <Link to="/todo">View Tasks</Link>
          </li>
          <li className="nav-link px-4">
            <Link to="/add">Add Task</Link>
          </li>
          <li className="nav-link px-4">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
