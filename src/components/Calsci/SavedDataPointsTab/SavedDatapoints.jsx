import React from "react";
import PropTypes from "prop-types";

const styles = {
  tabPanels: {
    width: "100%",
    height: "calc(100vh - 168px)",
    border: "1px solid rgb(153, 152, 152)",
    borderRadius: "0.5rem",
    margin: "0",
  },
};

const SavedDatapoints = (props) => {
  return <div style={styles.tabPanels}>Hi</div>;
};

SavedDatapoints.propTypes = {};

export default SavedDatapoints;
