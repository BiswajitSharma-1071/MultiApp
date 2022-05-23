import React from "react";
import PropTypes from "prop-types";

const GenericButton = ({
  name,
  btnStyle,
  onBtnClick,
  onBlur,
  btnDisabled,
  title,
}) => {
  return (
    <button
      type='button'
      className={btnStyle}
      onClick={onBtnClick}
      onBlur={onBlur}
      disabled={btnDisabled}
      title={title}
    >
      {name}
    </button>
  );
};

GenericButton.propTypes = {
  name: PropTypes.string.isRequired,
  btnStyle: PropTypes.string,
  onBtnClick: PropTypes.func,
  onBlur: PropTypes.func,
  btnDisabled: PropTypes.bool,
  title: PropTypes.string,
};

GenericButton.defaultProps = {
  btnStyle: "button",
  title: "Click",
  onBtnClick: () => console.warn("Generic Btn Handler is not provided"),
};

export default GenericButton;
