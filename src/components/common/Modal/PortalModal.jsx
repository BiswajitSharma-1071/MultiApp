import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import ModalStateless from "./ModalStateless";

const PortalModal = (props) => {
  return !props.isShowing
    ? null
    : createPortal(
        <ModalStateless
          {...props}
          isVisible
          onCloseClicked={props.onCloseClicked}
        />,
        document.body,
      );
};

PortalModal.propTypes = {
  isShowing: PropTypes.bool,
  onCloseClicked: PropTypes.func,
};

export default PortalModal;
