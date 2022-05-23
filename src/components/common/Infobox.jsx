import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import Popover from "react-tiny-popover";

const Infobox = React.forwardRef((props, ref) => {
  const {
    Positions,
    Align,
    InfoBoxButtonInner,
    updatePanels,
    containerClassName,
    Panels,
    gridType,
    stickyContent,
    childClassName,
    setCheckBlur,
  } = props;

  const [boxOpen, setBoxOpen] = useState(false);
  const [boxPanels, setBoxPanels] = useState(Panels);

  const renderInfoBoxPanels = () => {
    const ret = (
      <div
        className={childClassName}
        style={updatePanels ? {} : { paddingTop: "5px" }}
      >
        {boxPanels.map((x) => (
          <Fragment key={v4()}>{x}</Fragment>
        ))}
      </div>
    );

    const stickyItem = stickyContent ? (
      <div style={updatePanels ? {} : { paddingTop: "5px" }}>
        {stickyContent.map((x) => (
          <Fragment key={v4()}>{x}</Fragment>
        ))}
      </div>
    ) : null;

    return (
      <Fragment>
        {ret}
        {stickyItem}
      </Fragment>
    );
  };

  useEffect(() => {
    if (setCheckBlur && typeof setCheckBlur === "function")
      setCheckBlur(!boxOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxOpen]);

  const handleEllipsisClick = () => {
    setBoxOpen(!boxOpen);
    // calling buildInfobox to update the panels array
    if (updatePanels) {
      const updatedPanels = updatePanels(gridType);
      setBoxPanels(updatedPanels);
    }
  };

  const popoverProps = {
    isOpen: boxOpen,
    position: Positions,
    align: Align,
    padding: 2,
    transitionDuration: 0.01,
    onClickOutside: () => setTimeout(() => setBoxOpen(false), 30),
    content: renderInfoBoxPanels(),
    containerClassName,
  };

  return (
    <Popover ref={ref} {...popoverProps}>
      <button
        type='button'
        onClick={handleEllipsisClick}
        className='ibox-ellipsis-btn'
      >
        {InfoBoxButtonInner}
      </button>
    </Popover>
  );
});

Infobox.propTypes = {
  Positions: PropTypes.arrayOf(
    PropTypes.oneOf(["top", "right", "left", "bottom"]),
  ).isRequired,
  Align: PropTypes.oneOf(["start", "center", "end"]).isRequired,
  InfoBoxButtonInner: PropTypes.element,
  updatePanels: PropTypes.func,
  containerClassName: PropTypes.string.isRequired,
  Panels: PropTypes.arrayOf(PropTypes.shape({})),
  gridType: PropTypes.string,
  stickyContent: PropTypes.arrayOf(PropTypes.shape({})),
  childClassName: PropTypes.string,
  setCheckBlur: PropTypes.func,
  forwardRef: PropTypes.shape({}),
};

export default Infobox;

// export const InfoboxSpacer = (props) => {
//   const { Height, boxClassName } = props;
//   return <div style={{ height: Height }} className={boxClassName} />;
// };

// InfoboxSpacer.propTypes = {
//   boxClassName: PropTypes.string.isRequired,
//   Height: PropTypes.string,
// };
