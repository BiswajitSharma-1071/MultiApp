const ModalStyles = {
  overlayStyles: {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: "10",
    backgroundColor: "rgba(14, 14, 22, 0.8)",
  },
  dialogStyles: {
    width: "70%",
    height: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    backgroundColor: "#fff",
    borderRadius: "1.5rem",
    zIndex: "100",
    boxShadow:
      "0px 0px 0.4rem rgba(0,0,0,.14), 0px 0.4rem 0.8rem rgba(0,0,0,.28)",
  },
  headerStyles: {
    backgroundColor: "#29485d",
    padding: "1rem 1.5rem",
    color: "#ffffff",
    fontSize: "1.4rem",
    textAlign: "left",
    borderBottom: "none",
    borderTopRightRadius: "1.5rem",
    borderTopLeftRadius: "1.5rem",
  },
  bodyStyles: {
    padding: "1.5rem",
    minHeight: "10rem",
    color: "#30435D",
  },
  footerStyles: {
    padding: "1rem",
    botton: "0px",
    position: "absolute",
    width: "99%",
  },
  title: {
    marginTop: "0rem",
  },
  closeButtonStyle: {
    cursor: "pointer",
    fontSize: "1.8rem",
  },
};

export default ModalStyles;
