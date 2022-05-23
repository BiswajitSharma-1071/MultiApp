import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import GenericButton from "../common/GenericButton";
import { useCodingBoxContext } from "./CalsciContext/CodingBoxContext";
import codingBoxActions from "./CalsciContext/codingBoxActions";
import { CB_NODETYPE_FUNCTION } from "../../constants";
import back_Arrow_btn from "../../images/back_Arrow_Btn.svg";
import MainCodingBox from "./CodingBox/MainCodingBox";
import SaveDatapointCodingBox from "./CodingBox/SaveDatapointCodingBox";

const CodingBox = ({ savedDatapointTab, setCheckBlur }) => {
  const codingBoxContext = useCodingBoxContext();
  const {
    removeSelectedNodes,
    removeFunctionById,
    splitSelectedOpNodes,
    setOverrideLabelById,
  } = codingBoxActions(codingBoxContext.state, codingBoxContext.dispatch);
  const [saveDatapoint, setSaveDatapoint] = useState(false);

  const numTopLevelNodes = () =>
    codingBoxContext &&
    codingBoxContext.state &&
    codingBoxContext.state.rootNode &&
    codingBoxContext.state.rootNode.children
      ? codingBoxContext.state.rootNode.children.length
      : 0;

  const selectedNodesCount = () =>
    codingBoxContext &&
    codingBoxContext.state &&
    codingBoxContext.state.rootNode &&
    codingBoxContext.state.rootNode.children
      ? codingBoxContext.state.rootNode.children.filter(
          (item) => item.selected === true,
        )
      : [];

  const selectedOperatorCount = () => {
    const filterSelectedOperator =
      codingBoxContext &&
      codingBoxContext.state &&
      codingBoxContext.state.topLevelOpNodes
        ? codingBoxContext.state.topLevelOpNodes.filter(
            (item) => item.data.selected === true,
          )
        : [];

    const obj =
      filterSelectedOperator.length > 0
        ? {
            label: filterSelectedOperator[0].data.type.label,
            template: undefined,
            count: filterSelectedOperator.length,
            isSameOPSelected: true,
            node: filterSelectedOperator[0],
          }
        : {};

    return obj;
  };

  const selectedFunctionCount = () => {
    const selectedFuncNode = codingBoxContext.state.rootNode.children.filter(
      (item) =>
        item.type === CB_NODETYPE_FUNCTION && item.data.selected === true,
    );

    return {
      count: selectedFuncNode.length,
      nodeId: selectedFuncNode.length > 0 && selectedFuncNode[0].id,
      node: selectedFuncNode,
      template: undefined,
    };
  };

  const handleDeleteClicked = () => {
    if (selectedNodesCount().length > 0) removeSelectedNodes();
    else if (selectedOperatorCount().count > 0) splitSelectedOpNodes();
    else if (selectedFunctionCount().count > 0)
      removeFunctionById(selectedFunctionCount().nodeId);
  };

  const tempOverridelabels = (nodeId, label) => {
    _.filter(
      codingBoxContext.state.rootNode.children,
      (n) => n.id === nodeId,
    ).forEach((n) => {
      setOverrideLabelById(n.id, label, true);
    });
  };

  // useEffect(() => {
  //   console.log("codingBoxContext:", codingBoxContext);
  // }, [codingBoxContext]);

  return (
    <Fragment>
      <div className='coding-box-header-container'>
        {savedDatapointTab && (
          <Fragment>
            <button
              type='button'
              className='row pull-left'
              onClick={() => codingBoxContext.state.setTabIndex(0)}
            >
              <img
                className='codingBox-backImage'
                src={back_Arrow_btn}
                alt='back_Arrow'
              />
              <span>Back to Creating Custom Datapoints</span>
            </button>
          </Fragment>
        )}
        {!savedDatapointTab && (
          <Fragment>
            {saveDatapoint ? (
              <span className='save-datapoint-active'>New Saved Datapoint</span>
            ) : (
              <GenericButton
                name='Save Datapoint'
                btnStyle='save-datapoint'
                onBtnClick={() => setSaveDatapoint(true)}
                btnDisabled={numTopLevelNodes() === 0}
              />
            )}
          </Fragment>
        )}
      </div>
      {saveDatapoint ? (
        <Fragment>
          <SaveDatapointCodingBox />
        </Fragment>
      ) : (
        <Fragment>
          <MainCodingBox
            numTopLevelNodes={numTopLevelNodes}
            selectedNodesCount={selectedNodesCount}
            selectedOperatorCount={selectedOperatorCount}
            selectedFunctionCount={selectedFunctionCount}
            handleDeleteClicked={handleDeleteClicked}
            savedDatapointTab={savedDatapointTab}
            tempOverridelabels={tempOverridelabels}
            setCheckBlur={setCheckBlur}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

CodingBox.propTypes = {
  savedDatapointTab: PropTypes.bool,
  setCheckBlur: PropTypes.func,
};

export default CodingBox;
