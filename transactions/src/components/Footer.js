import React from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Styling.css'


const Footer = () => {
  return (
    <footer>

        <ul>
          <li className='left-footer'>
            <Link to="/">Home</Link>
          </li>
          <li className="middle-footer">
            <Link to="/cards/new">New transaction</Link>
          </li>
          <li className="right-footer">
            <Link to="/cards">All transactions</Link>
          </li>
        </ul>

    </footer>
  );
};

export default Footer;
