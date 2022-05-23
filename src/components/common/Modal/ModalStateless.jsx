import React, { Component } from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import styles from "./ModalStyles";
import closeButton from "../../../images/close_button.svg";

class ModalStateless extends Component {
  onOverlayClicked() {
    if (this.props.onOverlayClicked) this.props.onOverlayClicked();
  }

  onCloseClicked() {
    if (this.props.onCloseClicked) this.props.onCloseClicked();
  }

  assign = (target, ...args) => {
    if (target === null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const newTarget = target;
    args.forEach((source) => {
      if (source !== null) {
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            newTarget[key] = source[key];
          }
        }
      }
    });
    return newTarget;
  };

  render() {
    const mergeStyles = (key) => this.assign({}, styles[key], this.props[key]);
    const { isVisible, isDragDisabled, normalize } = this.props;
    const dialogStyles = mergeStyles("dialogStyles");
    const headerStyles = mergeStyles("headerStyles");
    const bodyStyles = mergeStyles("bodyStyles");
    const overlayStyles = mergeStyles("overlayStyles");
    const closeButtonStyle = mergeStyles("closeButtonStyle");
    const titleStyles = mergeStyles("titleStyles");
    overlayStyles.display = dialogStyles.display = "block";

    let overlay;
    if (this.props.showOverlay) {
      overlay = (
        <div onClick={() => this.onOverlayClicked()} style={overlayStyles} />
      );
    }

    return isVisible ? (
      <section>
        {overlay}
        <Draggable handle='.modal-header' disabled={isDragDisabled}>
          <div className='modal-dialog' style={dialogStyles}>
            <div className='modal-header' style={headerStyles}>
              {!this.props.hideCloseButton && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  role='button'
                  className='modal-close-button'
                  onClick={() => this.onCloseClicked}
                  style={closeButtonStyle}
                >
                  <img src={closeButton} alt='close icon' />
                </a>
              )}
              <span style={titleStyles}>{this.props.title}</span>
            </div>
            <div
              className={normalize ? "modal-body-normal" : "modal-body"}
              style={bodyStyles}
            >
              {this.props.children}
            </div>
          </div>
        </Draggable>
      </section>
    ) : (
      <div />
    );
  }
}

ModalStateless.displayName = "ModalStateless";

ModalStateless.sharedPropTypes = {
  closeButtonStyle: PropTypes.object,
  dialogStyles: PropTypes.object,
  headerStyles: PropTypes.object,
  bodyStyles: PropTypes.object,
  overlayStyles: PropTypes.object,
  titleStyles: PropTypes.object,
  onOverlayClicked: PropTypes.func,
  onCloseClicked: PropTypes.func,
  showOverlay: PropTypes.bool,
  title: PropTypes.string,
  hideCloseButton: PropTypes.bool,
};

ModalStateless.propTypes = {
  ...ModalStateless.sharedPropTypes,
  isVisible: PropTypes.bool,
};

ModalStateless.defaultProps = {
  closeButtonStyle: styles.closeButtonStyle,
  dialogStyles: styles.dialogStyles,
  headerStyles: styles.headerStyles,
  bodyStyles: styles.bodyStyles,
  overlayStyles: styles.overlayStyles,
  titleStyles: styles.titleStyles,
  showOverlay: styles.showOverlay,
  title: "",
  hideCloseButton: false,
};

export default ModalStateless;
