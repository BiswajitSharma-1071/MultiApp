import React, { Component } from "react";
import PropTypes from "prop-types";
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIdle: false,
    };
  }

  render() {
    return (
      <div className='main-app-container'>
        <h1>Main</h1>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
