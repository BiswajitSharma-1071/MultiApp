import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import ToggleSwitch from "./ToggleSwitch";
import GenericButton from "../../common/GenericButton";

const FunctionBoxPanel = (props) => {
  const {
    selectedNodesCount,
    functionOptionList,
    applyFunc,
    infoBoxRef,
    selectedFunctionCount,
    selectedFunctionObj,
    isSelected,
  } = props;

  const [rangeItem, setRangeItem] = useState({
    lower: 1,
    upper: isSelected
      ? selectedFunctionObj.rangeItem.upper
      : selectedNodesCount().length,
  });
  const [exactCount, setExactCount] = useState({ lower: 1, upper: 1 });
  const inputStyle = {
    background: "#F8FBFF",
    border: "1px solid #94A2B7",
    boxSizing: "border-box",
    borderRadius: "3px",
    width: "39px",
    display: "inline",
  };
  const [selectedFunc, setSelectedFunc] = useState(selectedFunctionObj);
  const [applyTo, setApplyTo] = useState();
  const [funcDisabled, setFuncDisabled] = useState(false);
  const [countDisabled, setCountDisabled] = useState(false);
  const [applyToEnable, setApplyToEnable] = useState(!isSelected);
  const [selectedCountCoding, setSelectedCountCoding] = useState(null);

  const handleSwitch = (title, i, value, event) => {
    switch (title) {
      case "Functions":
        setSelectedFunc({ name: value, index: i, funcSele: true });
        setCountDisabled(true);
        setApplyToEnable(false);
        break;

      case "Apply":
        setApplyTo(i);
        setCountDisabled(true);
        break;

      case "Count":
        setFuncDisabled(true);
        setSelectedFunc({ name: value, index: i, funcSele: false });
        setSelectedCountCoding(i);
        setApplyToEnable(true);
        break;

      default:
        break;
    }
    event.stopPropagation();
  };

  const handleClick = () => {
    if (selectedCountCoding === 1) {
      applyFunc(selectedFunc.name, applyTo, rangeItem, isSelected);
    } else {
      applyFunc(selectedFunc.name, applyTo, exactCount, isSelected);
    }
  };

  const keyHandler = (e) => {
    switch (_.lowerCase(e.key)) {
      case "enter": {
        if (selectedFunc.name) handleClick();
        infoBoxRef.current.targetRef.current.click();
        break;
      }
      case "escape": {
        infoBoxRef.current.targetRef.current.click();
        break;
      }
      default:
        break;
    }
    e.preventDefault();
  };

  const resetSelection = (title) => {
    switch (title) {
      case "Functions":
        setSelectedFunc({});
        setApplyTo();
        setCountDisabled(false);
        setApplyToEnable(true);
        break;
      case "Count":
        setFuncDisabled(false);
        setSelectedFunc({});
        setApplyTo();
        setApplyToEnable(true);
        break;

      default:
        break;
    }
  };

  return (
    <div
      onKeyDown={(e) => keyHandler(e)}
      tabIndex='0'
      className='functionBox-panel'
    >
      {selectedFunctionCount().count > 0 || selectedNodesCount().length > 0 ? (
        <Fragment>
          <ToggleSwitch
            title='Functions'
            resetSelection={resetSelection}
            optionList={functionOptionList}
            handleSwitch={handleSwitch}
            checkedValue={
              !funcDisabled && selectedFunc.funcSale ? selectedFunc.index : null
            }
            isDisabled={funcDisabled}
          />
          <ToggleSwitch
            title='Apply'
            resetSelection={resetSelection}
            optionList={functionOptionList}
            handleSwitch={handleSwitch}
            checkedValue={applyTo}
            isDisabled={applyToEnable}
          />
          <GenericButton
            name='Apply'
            btnStyle={
              selectedFunc.name === undefined ? "disable-btn" : "apply-func-btn"
            }
            onBtnClick={() => handleClick()}
            onKeyDown={(e) => keyHandler(e)}
          />
        </Fragment>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
};

FunctionBoxPanel.propTypes = {};

export default FunctionBoxPanel;
