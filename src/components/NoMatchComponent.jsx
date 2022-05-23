import React from "react";
import PropTypes from "prop-types";
import notFound from "../images/page_not_found.png";

const NoMatchComponent = ({ location }) => {
  return (
    <div className='no-match-container'>
      <div className='icon-content'>
        <img style={{ height: "250px" }} src={notFound} alt='page' />
      </div>
      <div className='text-content'>
        <div className='first-line'>Ooops... Error 404</div>
        <div className='second-line'>
          We are sorry but the page you are looking for does not exist.
        </div>
        <div className='third-line'>
          Please check the entered address and try again
        </div>
      </div>
      {location.pathname === "/error" && (
        <button onClick={() => (window.location = "/")}>Back to Home</button>
      )}
    </div>
  );
};

NoMatchComponent.propTypes = {
  location: PropTypes.string,
};

export default NoMatchComponent;
