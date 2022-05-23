import React, { Fragment, useState, useRef } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import GenericButton from "../../common/GenericButton";
import GenericEditWithCancelSave from "../../common/GenericEditWithCancelSave";
import Infobox from "../../common/Infobox";
import CodingBoxItems from "./CodingBoxItems";
import { useCodingBoxContext } from "../CalsciContext/CodingBoxContext";
import codingBoxActions from "../CalsciContext/codingBoxActions";
import * as cnsts from "../../../constants";
import FunctionBoxPanel from "./FunctionBoxPanel";

const MainCodingBox = (props) => {
  const {
    numTopLevelNodes,
    selectedNodesCount,
    selectedOperatorCount,
    selectedFunctionCount,
    handleDeleteClicked,
    savedDatapointTab,
    tempOverridelabels,
    setCheckBlur,
  } = props;
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState({});
  const infoBoxRef = useRef(null);
  const codingBoxRef = useRef(null);
  const [opNodeList, setOpNodeList] = useState({});

  const codingBoxContext = useCodingBoxContext();
  const {
    selectAllNodes,
    mergeSelectedNodes,
    changeSelectedOperator,
    duplicateSelectedNodes,
    insertFunctionNode,
    changeFunctionOfSelectedNodes,
  } = codingBoxActions(codingBoxContext.state, codingBoxContext.dispatch);

  const applyFunc = (
    functionName,
    applyTo,
    paramObj,
    isSelected,
    operator = {},
  ) => {
    if (isSelected) {
      changeFunctionOfSelectedNodes(functionName, false, true, paramObj);
    } else {
      const selectedNodes = _.filter(
        codingBoxContext.state.rootNode.children,
        (n) => n.selected === true,
      );
      insertFunctionNode(
        functionName,
        false,
        true,
        { lower: paramObj.lower, upper: paramObj.upper, operator },
        selectedNodes,
        applyTo === 1,
        cnsts.CB_ROOT_NODE_ID,
      );
    }
  };

  const cbitembox = () => {
    return (
      <div
        className='coding-box-item-box'
        style={
          selectedNodesCount().length > 0
            ? { background: "#F3F7FC" }
            : { background: "transparent" }
        }
      >
        <span className='item-count'>{`${numTopLevelNodes()} Items`}</span>
        {selectedNodesCount().length === 0 && (
          <button
            type='button'
            className={
              numTopLevelNodes() === 0 ? "empty-coding-box" : "select-all-label"
            }
            onClick={() => {
              selectAllNodes(true, false);
              // setTimeout(() => {
              //   if (codingBoxRef && codingBoxRef.current)
              //     codingBoxRef.current.focus();
              // }, 0);
            }}
          >
            SelectAll
          </button>
        )}
      </div>
    );
  };

  const handleCodingBoxOperatorClicked = (operator) => {
    if (selectedNodesCount().length > 0) {
      mergeSelectedNodes(operator, true, -1);
    } else if (selectedOperatorCount().count > 0) {
      changeSelectedOperator(operator);
    }
  };

  const handleNotFunctionClicked = () => {
    const selectedNodes = _.filter(
      codingBoxContext.state.rootNode.children,
      (n) => n.selected === true,
    );

    selectedNodes.forEach((sn) => {
      insertFunctionNode("NOT", false, true, null, [sn]);
    });
  };

  const buildInfobox = () => {
    const selectedFuncNode = selectedFunctionCount().node[0];
    let selectedFunctionObj = {
      rangeItem: { lower: 1, upper: selectedNodesCount().length },
      funcSele: null,
    };
    const funcArr = [
      { label: "Mean", key: 0, funcName: "MEAN" },
      { label: "Median", key: 1, funcName: "MEDIAN" },
    ];

    if (
      selectedFunctionCount().count > 0 &&
      selectedFuncNode.data.funcName !== "NOT"
    ) {
      const filtered = funcArr.filter(
        (item) => item.funcName === selectedFuncNode.data.funcName,
      );
      selectedFunctionObj = {
        name: filtered[0].funcName,
        index: filtered.key,
        funcSele: true,
        rangeItem: { lower: 1, upper: 1 },
      };
    }

    const ibp = [];
    ibp.push(
      <FunctionBoxPanel
        selectedNodesCount={selectedNodesCount}
        functionOptionList={funcArr}
        applyFunc={applyFunc}
        infoBoxRef={infoBoxRef}
        selectedFunctionCount={selectedFunctionCount}
        selectedFunctionObj={selectedFunctionObj}
        isSelected={selectedFunctionCount().count > 0}
      />,
    );
    return ibp;
  };

  const selectedOpNodes = (node) => setOpNodeList({ ...opNodeList, node });

  const codingBoxButtons = () => {
    const showANDNOT = () =>
      selectedNodesCount().length !== 1 || selectedOperatorCount().count > 0;

    const operatorButtons = () => {
      return (
        <Fragment>
          <GenericButton
            name='AND'
            btnStyle={
              selectedNodesCount().length > 1
                ? "func-box-btn"
                : !selectedOperatorCount().count > 0
                ? "disable-label"
                : !selectedOperatorCount().template
                ? _.isEqual(
                    selectedOperatorCount().label,
                    cnsts.CB_OPERATORS.type.and.label,
                  )
                  ? "func-box-btn highlight-label"
                  : "func-box-btn"
                : _.isEqual(
                    selectedOperatorCount().label,
                    cnsts.CB_OPERATORS.type.or.label,
                  )
                ? "func-box-btn"
                : _.isEqual(
                    selectedOperatorCount().label,
                    cnsts.CB_OPERATORS.type.and.label,
                  )
                ? "func-box-btn highlight-label"
                : "func-box-btn"
            }
            onBtnClick={() =>
              handleCodingBoxOperatorClicked(cnsts.CB_OPERATORS.type.and)
            }
          />
          <GenericButton
            name='OR'
            btnStyle={
              selectedNodesCount().length > 1 ||
              selectedOperatorCount().count > 0
                ? selectedOperatorCount().count > 0 &&
                  _.isEqual(
                    selectedOperatorCount().label,
                    cnsts.CB_OPERATORS.type.or.label,
                  )
                  ? "func-box-btn highlight-label"
                  : "func-box-btn"
                : "disable-label"
            }
            onBtnClick={() =>
              handleCodingBoxOperatorClicked(cnsts.CB_OPERATORS.type.or)
            }
          />
          {showANDNOT() && (
            <GenericButton
              name='AND NOT'
              btnStyle={`btn-nots ${
                selectedNodesCount().length > 1
                  ? "func-box-btn"
                  : !selectedOperatorCount().count > 0
                  ? "disable-label"
                  : !selectedOperatorCount().template
                  ? _.isEqual(
                      selectedOperatorCount().label,
                      cnsts.CB_OPERATORS.type.andnot.label,
                    )
                    ? "func-box-btn highlight-label"
                    : "func-box-btn"
                  : _.isEqual(
                      selectedOperatorCount().label,
                      cnsts.CB_OPERATORS.type.or.label,
                    )
                  ? "func-box-btn"
                  : _.isEqual(
                      selectedOperatorCount().label,
                      cnsts.CB_OPERATORS.type.andnot.label,
                    )
                  ? "func-box-btn highlight-label"
                  : "func-box-btn"
              }
              `}
              onBtnClick={() =>
                handleCodingBoxOperatorClicked(cnsts.CB_OPERATORS.type.andnot)
              }
            />
          )}
        </Fragment>
      );
    };

    const actionButtons = () => {
      return (
        <Fragment>
          {selectedNodesCount().length === 1 && (
            <GenericButton
              name='NOT'
              btnStyle='func-box-btn btn-nots'
              onBtnClick={handleNotFunctionClicked}
            />
          )}
          <div
            className={
              selectedNodesCount().length > 0 ||
              selectedFunctionCount().count > 0
                ? "func-box-div"
                : "func-box-disable-div"
            }
          >
            <span
              className={
                selectedNodesCount().length > 0 ||
                selectedFunctionCount().count > 0
                  ? "ibox-ellipsis-icon"
                  : "ibox-ellipsis-disable-icon"
              }
            >
              <Infobox
                ref={infoBoxRef}
                Panels={buildInfobox()}
                Positions={["bottom"]}
                updatePanels={buildInfobox}
                Align='end'
                containerClassName='func-box-btn ib-popover-ac-container'
                setCheckBlur={setCheckBlur}
              />
            </span>
          </div>
          <button
            type='button'
            className={
              selectedNodesCount().length === 0
                ? "union-disable-icon"
                : "func-box-btn union-icon"
            }
            onClick={() => duplicateSelectedNodes()}
          />
          <button
            type='button'
            className={
              selectedNodesCount().length > 0 ||
              selectedOperatorCount().count > 0 ||
              selectedFunctionCount().count > 0
                ? "func-box-btn delete-icon"
                : "delete-disable-icon"
            }
            onClick={() => handleDeleteClicked()}
          />
        </Fragment>
      );
    };

    return (
      <Fragment>
        {operatorButtons()}
        {actionButtons()}
      </Fragment>
    );
  };

  return (
    <div className='coding-box-main-container'>
      {cbitembox()}
      <div
        className='coding-box-func-box'
        style={
          selectedNodesCount().length > 0
            ? { background: "#F3F7FC" }
            : { background: "transparent" }
        }
      >
        {codingBoxButtons()}
      </div>
      {numTopLevelNodes() === 1 && (
        <div
          className={
            codingBoxContext.state.rootNode.children[0].useLabelOverride
              ? "coding-box-text-box-edited"
              : "coding-box-text-box"
          }
        >
          {editing ? (
            <GenericEditWithCancelSave
              setEditing={setEditing}
              initValue=''
              saveInput={(textValue) => {
                setEditing(false);
                tempOverridelabels(
                  codingBoxContext.state.rootNode.children[0].id,
                  textValue,
                );
              }}
              setInputText={setInputText}
            />
          ) : (
            <span
              className={
                codingBoxContext.state.rootNode.children[0].useLabelOverride
                  ? "coding-box-text-box-edited-content"
                  : "coding-box-text-box-content"
              }
              onClick={() => setEditing(true)}
            >
              {codingBoxContext.state.rootNode.children[0].getLabelString(
                "pts",
                true,
              )}
            </span>
          )}
        </div>
      )}
      <CodingBoxItems
        codingBoxRef={codingBoxRef}
        savedDatapointTab={savedDatapointTab}
        handleDeleteClicked={handleDeleteClicked}
        selEditLabelBoxactive={numTopLevelNodes() === 1}
        infoBoxRef={infoBoxRef}
        selectedOpNodes={selectedOpNodes}
      />
    </div>
  );
};

MainCodingBox.propTypes = {
  numTopLevelNodes: PropTypes.func,
  selectedNodesCount: PropTypes.func,
  selectedOperatorCount: PropTypes.func,
  selectedFunctionCount: PropTypes.func,
  handleDeleteClicked: PropTypes.func,
  savedDatapointTab: PropTypes.bool,
  tempOverridelabels: PropTypes.func,
  setCheckBlur: PropTypes.func,
};

export default MainCodingBox;
