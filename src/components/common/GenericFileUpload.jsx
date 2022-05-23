import React from "react";
import PropTypes from "prop-types";

let inputElement = null;
const GenericFileUpload = ({
  id,
  name,
  btnDisabled,
  btnStyle,
  handleUpload,
  title,
  accept,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const fileName = e.target.files[0] ? e.target.files[0].name : "";
    reader.onload = (event) => {
      const contents = event.target.result;
      handleUpload(contents, fileName);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }
    inputElement.value = null;
  };

  return (
    <label htmlFor={id} title={title}>
      <span className={btnStyle} disabled={btnDisabled}>
        {name}
      </span>
      <input
        type='file'
        id={id}
        ref={(node) => (inputElement = node)}
        className='hidden'
        onChange={handleChange}
        disabled={btnDisabled}
        accept={accept}
      />
    </label>
  );
};

GenericFileUpload.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnStyle: PropTypes.string,
  handleUpload: PropTypes.func,
  title: PropTypes.string,
  accept: PropTypes.string,
};

GenericFileUpload.defaultProps = {
  btnStyle: "button",
  title: "",
  name: "",
  btnDisabled: false,
};

export default GenericFileUpload;
