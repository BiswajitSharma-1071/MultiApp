import { createContext, useContext } from "react";

const CodingBoxContext = createContext({
  insertLeafNode: () => {},
  insertOperatorNode: () => {},
  insertSavedDatapointNode: () => {},
  insertFunctionNode: () => {},
  toggleSelectedNode: () => {},
  selectAllNodes: () => {},
  mergeSelectedNode: () => {},
  splitSelectedNode: () => {},
  splitSelectedOnNode: () => {},
  removeSelectedNodes: () => {},
  removeNodesById: () => {},
  clearCodingBox: () => {},
  selectAllOperators: () => {},
  changeSelectedOperatorsById: () => {},
  duplicateSelectedNode: () => {},
  copySelectedNode: () => {},
  pasteCopiedNode: () => {},
  setOverrideLableById: () => {},
  setUpBulkJoin: () => {},
  cancelBulkJoin: () => {},
  mergeBulkJoin: () => {},
  removeFunctionBuId: () => {},
  changeFuntionOfSelectedNodes: () => {},
  selectAllFunctions: () => {},
  selectFunctionById: () => {},
  setSelectedLabelType: () => {},
  selectAllTemplateOperatorsByType: () => {},
  combineSelectedIntoNetAny: () => {},
});

export const useCodingBoxContext = () => useContext(CodingBoxContext);

export default CodingBoxContext;
