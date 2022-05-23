import React from "react";
import PropTypes from "prop-types";

const createMarkup = (label) => {
  return {
    __html: label,
  };
};

const GenericCheckBox = ({
  value,
  tick,
  onCheck,
  label,
  classname,
  testValue,
  onblur,
  onfocus,
}) => {
  return (
    <div
      className={classname}
      onBlur={onblur}
      onFocus={onfocus}
      tabIndex='-1'
      style={{ outlineStyle: "none" }}
    >
      <input
        type='checkbox'
        value={value}
        checked={tick}
        onChange={onCheck}
        id={value}
      />
      <label htmlFor={value} data-test={testValue}>
        <span
          style={{ paddingLeft: "0.5rem" }}
          dangerouslySetInnerHTML={createMarkup(label)}
        />
      </label>
    </div>
  );
};

GenericCheckBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tick: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onCheck: PropTypes.func,
  label: PropTypes.string,
  classname: PropTypes.string,
  testValue: PropTypes.string,
  onblur: PropTypes.func,
  onfocus: PropTypes.func,
};

export default GenericCheckBox;
