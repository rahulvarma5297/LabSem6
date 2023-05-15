import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <span>L</span>AB <span>E</span>XAM
      </Link>
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/form">Patient Form</Link>
        </li>

        <li className="nav-item">
          <Link to="/fee">Fee</Link>
        </li>

        <li className="nav-item">
          <Link to="/data">Nurse Data</Link>
        </li>

        <li className="nav-item">
          <Link to="/doctordata">Doctor Data</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
