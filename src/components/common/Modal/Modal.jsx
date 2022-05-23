import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalStateless from "./ModalStateless";

const isOpening = (s1, s2) => !s1.isVisible && s2.isVisible;
const isClosing = (s1, s2) => s1.isVisible && !s2.isVisible;

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (isOpening(this.state, nextState) && this.props.beforeOpen) {
      this.props.beforeOpen();
    }

    if (isClosing(this.state, nextState) && this.props.beforeClose) {
      this.props.beforeClose();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (isOpening(prevState, this.state) && this.props.afterOpen) {
      this.props.afterOpen();
    }

    if (isClosing(prevState, this.state) && this.props.afterClose) {
      this.props.afterClose();
    }
  }

  onOverlayClicked() {
    if (this.props.hideOnOverlayClicked) {
      this.hide();
    }

    if (this.props.onOverlayClicked) {
      this.props.onOverlayClicked();
    }
  }

  show() {
    this.setState({ isVisible: true });
  }

  hide() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <ModalStateless
        {...this.props}
        isVisible={this.state.isVisible}
        onOverlayClicked={() => this.onOverlayClicked()}
        onCloseClicked={() => this.hide()}
      />
    );
  }
}

Modal.displayName = "Custom React Modal";

Modal.propTypes = {
  afterClose: PropTypes.func,
  afterOpen: PropTypes.func,
  beforeClose: PropTypes.func,
  beforeOpen: PropTypes.func,
  onOverlayClicked: PropTypes.func,
  hideOnOverlayClicked: PropTypes.bool,
};

Modal.defaultProps = {
  hideOnOverlayClicked: false,
};

export default Modal;
