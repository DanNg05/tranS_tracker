import React from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Styling.css'
import '../Styling/Footer.css'

const Footer = () => {
  return (
    <footer>

        <ul>
          <li className='left-footer'>
            <Link to="/"><i className="fa-solid fa-house icons-footer"></i></Link>
          </li>
          <li className="middle-footer">
            <Link to="/cards/new"><i className="fa-solid fa-plus icons-footer"></i></Link>
          </li>
          <li className="right-footer">
            <Link to="/cards"><i className="fa-solid fa-list icons-footer"></i></Link>
          </li>
        </ul>

    </footer>
  );
};

export default Footer;
