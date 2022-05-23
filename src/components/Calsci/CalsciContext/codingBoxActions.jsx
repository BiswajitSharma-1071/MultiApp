import * as types from "./CBTypes";
import * as consts from "../../../constants";

const codingBoxActions = (state, dispatch) => {
  const insertLeafNode = (
    nodes,
    parentNodeID = consts.CB_ROOT_NODE_ID,
    insertPos = -1,
  ) => {
    dispatch({
      type: types.CB_CREATE_LEAF_NODE,
      payload: {
        parentNodeID,
        nodes,
        insertPos,
      },
    });
  };

  const insertSavedDatapoints = (
    nodes,
    parentNodeID = consts.CB_ROOT_NODE_ID,
    insertPos = -1,
  ) => {
    dispatch({
      type: types.CB_CREATE_SAVED_DATAPOINT_NODE,
      payload: {
        parentNodeID,
        nodes,
        insertPos,
      },
    });
  };

  const insertOperatorNode = (
    nodes,
    operatorSelected,
    parentNodeID = consts.CB_ROOT_NODE_ID,
    combine,
    insertPos = -1,
  ) => {
    dispatch({
      type: types.CB_CREATE_OPERATOR_NODE,
      payload: {
        parentNodeID,
        nodes,
        operatorSelected,
        combine,
        insertPos,
      },
    });
  };

  const insertFunctionNode = (
    functionName,
    isSelected,
    editable,
    params,
    nodes,
    asIndividuals = false,
    parentNodeID = consts.CB_ROOT_NODE_ID,
    insertPos = -1,
  ) => {
    dispatch({
      type: types.CB_CREATE_FUNCTION_NODE,
      payload: {
        functionName,
        isSelected,
        editable,
        params,
        parentNodeID,
        nodes,
        asIndividuals,
        insertPos,
      },
    });
  };

  const changeFunctionOfSelectedNodes = (
    functionName,
    isSelected,
    editable,
    params,
  ) => {
    dispatch({
      type: types.CB_CHANGE_FUNCTION_OF_SELECTED_NODES,
      payload: {
        functionName,
        isSelected,
        editable,
        params,
      },
    });
  };

  const removeNodesByIds = (nodeId) => {
    dispatch({
      type: types.CB_REMOVE_NODES_BY_ID,
      payload: {
        nodeId,
      },
    });
  };

  const clearCodingBox = () => {
    dispatch({
      type: types.CB_CLEAR_CODING_BOX,
    });
  };

  const removeSelectedNodes = () => {
    dispatch({
      type: types.CB_REMOVE_SELECTED_NODES,
    });
  };

  const removeAllNodes = () => {
    dispatch({
      type: types.CB_REMOVE_ALL_NODES,
    });
  };

  const setNodeSelectionById = (nodeId, selected) => {
    dispatch({
      type: types.CB_TOGGLE_SELECTED_NODE,
      payload: {
        nodeId,
        selected,
      },
    });
  };

  const selectAllNodes = (selected, deep = false) => {
    dispatch({
      type: types.CB_SELECT_ALL_NODES,
      payload: {
        selected,
        deep,
      },
    });
  };

  const selectAllNodesByType = (selected, type, deep = false) => {
    dispatch({
      type: types.CB_SELECT_ALL_NODES_BY_TYPE,
      payload: {
        selected,
        type,
        deep,
      },
    });
  };

  const mergeSelectedNodes = (
    operatorSelected,
    removeSourceNodes = true,
    insertPos = -1,
  ) => {
    dispatch({
      type: types.CB_MERGE_SELECTED_NODE,
      payload: { operatorSelected, removeSourceNodes, insertPos },
    });
  };

  const splitSelectedNodes = () => {
    dispatch({
      type: types.CB_SPLIT_SELECTED_NODE,
    });
  };

  const splitSelectedOpNodes = () => {
    dispatch({
      type: types.CB_SPLIT_SELECTED_OP_NODE,
    });
  };

  const selectAllOperator = (isSelected = false) => {
    dispatch({
      type: types.CB_SELECT_ALL_OPERATORS,
      payload: {
        isSelected,
      },
    });
  };

  const changeSelectedOperator = (newOperator, isSelected = false) => {
    dispatch({
      type: types.CB_CHANGE_SELECTED_OPERATORS,
      payload: {
        newOperator,
        isSelected,
      },
    });
  };

  const changeSelectedOperatorById = (
    newOperator,
    nodeId,
    isSelected = false,
  ) => {
    dispatch({
      type: types.CB_CHANGE_SELECTED_OPERATOR_BY_ID,
      payload: {
        newOperator,
        nodeId,
        isSelected,
      },
    });
  };

  const duplicateSelectedNodes = () => {
    dispatch({
      type: types.CB_DUPLICATE_SELECTED_NODES,
    });
  };

  const copySelectedNodes = () => {
    dispatch({
      type: types.CB_COPY_SELECTED_NODES,
    });
  };

  const pasteCopieddNodes = () => {
    dispatch({
      type: types.CB_PASTE_COPIED_NODES,
    });
  };

  const setOverrideLabelById = (nodeId, label, useOverride = true) => {
    dispatch({
      type: types.CB_SET_OVERRIDE_LABEL_BY_ID,
    });
  };

  const removeFunctionById = (nodeId) => {
    dispatch({
      type: types.CB_REMOVE_FUNCTION_NODE_BY_ID,
      payload: {
        nodeId,
      },
    });
  };

  const selectAllFunctions = (isSelected) => {
    dispatch({
      type: types.CB_SELECT_ALL_FUNCTION,
      payload: {
        isSelected,
      },
    });
  };

  const selectFunctionById = (nodeId, selected) => {
    dispatch({
      type: types.CB_SELECT_FUNCTION_BY_ID,
      payload: {
        nodeId,
        selected,
      },
    });
  };

  const setSelectedLabelType = (labelObj) => {
    dispatch({
      type: types.CB_SELECTED_LABEL_TYPE,
      payload: {
        labelObj,
      },
    });
  };

  const insertNodes = (nodes, parentNodeID, insertPos) => {
    dispatch({
      type: types.CB_INSERT_NODES,
      payload: {
        nodes,
        parentNodeID,
        insertPos,
      },
    });
  };

  return {
    insertLeafNode,
    insertSavedDatapoints,
    insertOperatorNode,
    insertFunctionNode,
    changeFunctionOfSelectedNodes,
    removeNodesByIds,
    clearCodingBox,
    removeSelectedNodes,
    removeAllNodes,
    setNodeSelectionById,
    selectAllNodes,
    selectAllNodesByType,
    mergeSelectedNodes,
    splitSelectedNodes,
    splitSelectedOpNodes,
    selectAllOperator,
    changeSelectedOperator,
    changeSelectedOperatorById,
    duplicateSelectedNodes,
    copySelectedNodes,
    pasteCopieddNodes,
    setOverrideLabelById,
    removeFunctionById,
    selectAllFunctions,
    selectFunctionById,
    setSelectedLabelType,
    insertNodes,
  };
};

export default codingBoxActions;
