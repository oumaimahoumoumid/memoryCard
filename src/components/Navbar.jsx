import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Memory Card</h1>
      <ul>
        <li><Link to="/">Game</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
