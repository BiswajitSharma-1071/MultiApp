import React, { Component } from "react";
// import PropTypes from "prop-types";
import errorIcon from "../images/error_image.svg";
import Timer from "./Timer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      logInfo: "",
      showTimer: true,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch = (error) => {
    setTimeout(() => {
      console.log("Error occured, page will refresh automatically");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }, 40000);

    if (this.state.logInfo === "") {
      this.setState({ logInfo: error.stack });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary-container'>
          <div className='error-boundary-img-content'>
            <img src={errorIcon} alt='Error' />
            <div className='error-boundary-message-1'>OOPS...</div>
          </div>
          <div className='error-boundary-message-2'>
            Sorry something went wrong we are getting you back to work
          </div>
          {this.state.showTimer && <Timer seconds={20000} />}
          <h3>{this.state.logInfo}</h3>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {};
export default ErrorBoundary;
