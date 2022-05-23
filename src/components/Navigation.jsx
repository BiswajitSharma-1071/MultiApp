import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductDropdown from "./ProductDropdown";

const Navigation = (props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        BISWAJIT
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
            Services
          </Link>
        </li>
        <li
          className='nav-item'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
            Products <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <ProductDropdown />}
        </li>
        <li className='nav-item'>
          <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
            Contact Me
          </Link>
        </li>
      </ul>
      {/*<Button />*/}
    </nav>
  );
};

// Navigation.propTypes = {};

export default Navigation;
