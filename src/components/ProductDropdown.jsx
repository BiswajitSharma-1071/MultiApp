import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductDropdown = (props) => {
  const [click, setClick] = useState(false);

  return (
    <React.Fragment>
      <ul
        onClick={() => setClick(!click)}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <Link
            className='dropdown-link'
            to='/products/toDoList'
            onClick={() => setClick(false)}
          >
            To Do List
          </Link>
        </li>
        <li>
          <Link
            className='dropdown-link'
            to='/products/notesSuitcase'
            onClick={() => setClick(false)}
          >
            Notes Suitcase
          </Link>
        </li>
        <li>
          <Link
            className='dropdown-link'
            to='/products/githubFinder'
            onClick={() => setClick(false)}
          >
            Github Finder
          </Link>
        </li>
        <li>
          <Link
            className='dropdown-link'
            to='/products/covidTracker'
            onClick={() => setClick(false)}
          >
            Covid Tracker
          </Link>
        </li>
        <li>
          <Link
            style={{ border: "none" }}
            className='dropdown-link'
            to='/products/calsci'
            onClick={() => setClick(false)}
          >
            Calsci
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

// ProductDropdown.propTypes = {};

export default ProductDropdown;
