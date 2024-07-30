import { Link } from 'react-router-dom';
import "../style.css";
import logo from "../images/logosmall.png";

import { Outlet } from "react-router-dom"
const Root = () => (
    <>
    <header className="header">
    <div className="logo">
      <img src={logo} alt="Library Logo" />
    </div>
    <div className="search-container">
        <input type="text" placeholder="Search books..." className='search-input'/>
        <button type="submit" className='search-button'>Search</button>
      </div>
    <nav>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/authors">Authors</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  </header> 
  <Outlet />
  <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Library Logo" />
        </div>
        <div className="footer-info">
          <p>&copy; 2024 Library App. All rights reserved.</p>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>

  </>
  
);

export default Root;