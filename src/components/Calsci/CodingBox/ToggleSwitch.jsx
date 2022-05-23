import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import reload from "../../../images/reload.svg";

const ToggleSwitch = (props) => {
  const {
    title,
    resetSelection,
    optionList,
    handleSwitch,
    checkedValue,
    isDisabled,
  } = props;

  return (
    <div className='cb-radio-panel'>
      <div className='cb-radio-panel-title'>
        <span className='cb-radio-panel-title-name'>{title}</span>
        {resetSelection && (
          <span
            className='cb-radio-panel-title-icon'
            onClick={() => resetSelection(title)}
          >
            <img src={reload} alt='reset' />
          </span>
        )}
      </div>
      <div className='cb-radio-panel-body' onClick={(e) => e.stopPropagation()}>
        {optionList &&
          optionList.map((res, i) => (
            <p className='cb-radio-btn'>
              <input
                type='radio'
                className='hidden-box'
                id={res.label}
                name={title}
                checked={i === checkedValue}
                onChange={(e) => handleSwitch(title, i, res.funcName, e)}
                disabled={isDisabled}
              />
              <label htmlFor='res.label' className='check--labels'>
                <div style={{ display: "flex" }}>
                  <div>
                    <span
                      className={classnames("check--label-box", {
                        "check--label-box-disabled": isDisabled,
                      })}
                    />
                  </div>
                  <div
                    className={classnames(
                      "check--label-text",
                      {
                        "check--label-text-selected": i === checkedValue,
                      },
                      { "disabled-text": isDisabled },
                    )}
                  >
                    {res.label}
                  </div>
                </div>
              </label>
            </p>
          ))}
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {};

export default ToggleSwitch;
