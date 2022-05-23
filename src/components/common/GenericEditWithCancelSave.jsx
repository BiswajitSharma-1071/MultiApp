import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import saveButton from "../../images/save_button.svg";
import cancelButton from "../../images/cancel_button.svg";

const GenericEditWithCancelSave = ({
  styles,
  setEditing,
  initValue,
  saveInput,
  setInputText,
  isBuildEdit,
}) => {
  const [editedName, setEditedName] = useState(initValue);

  const cancelEdit = () => {
    if (isBuildEdit) setEditing("cancel");
    else setEditing(false);
  };

  return (
    <Fragment>
      <input
        ref={(el) => setInputText(el)}
        className={styles}
        type='text'
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (editedName && editedName !== initValue) saveInput(editedName);
            else setEditing(false);
          } else if (e.key === "Escape") setEditing(false);
        }}
        onBlur={() => {
          if (editedName && editedName !== initValue) saveInput(editedName);
          else setEditing(false);
        }}
      />
      <span style={{ lineHeight: "2.2rem" }}>
        <img
          style={{ width: "1.5rem", cursor: "pointer" }}
          src={saveButton}
          alt='save'
          title='Save'
          onMouseDown={() => {
            if (editedName && editedName !== initValue) saveInput(editedName);
            else setEditing(false);
          }}
        />
        <img
          style={{ width: "1.5rem", cursor: "pointer" }}
          src={cancelButton}
          alt='cancel'
          title='Cancel'
          onMouseDown={() => cancelEdit(false)}
        />
      </span>
    </Fragment>
  );
};

GenericEditWithCancelSave.propTypes = {
  styles: PropTypes.string,
  setEditing: PropTypes.func,
  initValue: PropTypes.string,
  saveInput: PropTypes.func,
  setInputText: PropTypes.func,
  isBuildEdit: PropTypes.bool,
};

GenericEditWithCancelSave.defaultProps = {
  styles: "generic-edit-save",
  isBuildEdit: false,
};

export default GenericEditWithCancelSave;
