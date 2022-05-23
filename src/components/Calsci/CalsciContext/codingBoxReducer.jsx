/* eslint-disable import/no-anonymous-default-export */
import * as _ from "lodash";
import { v4 } from "uuid";
import * as types from "./CBTypes";
import * as cnsts from "../../../constants";

import CodingBoxLabelGenerator, {
  CBStandardLabels,
} from "./CodingBoxLabelGenerator";
import { combineAllChildren } from "../../../utils/CodingBoxUtils";

const returnSorted = (nodes) => {
  const sortedNodes = _.sortBy(nodes, (c) => {
    switch (c.type) {
      default:
        c.p = "2";
        return c.p;
    }
  });

  return sortedNodes;
};

const wrapNode = (type, data) => {
  const { toLabelString, toDefString } = CodingBoxLabelGenerator(
    CBStandardLabels,
    null,
  );

  const node = {
    type,
    id: v4(),
    selected: false,
    data,
    children: [],
    useLabelOverride: false,
    labelOverride: "",
    rootNodeChild: cnsts.CB_NODETYPE_ROOT,
    combine() {
      return combineAllChildren(this);
    },
    getLabelString(pts) {
      return toLabelString(this, pts);
    },
    getExpressionString() {
      return toDefString(this);
    },
  };

  return node;
};

const wrapNodes = (type, nodes) => _.map(nodes, (n) => wrapNode(type, n));

const refreshIdsDeep = (node) => {
  const doRefresh = (newNode) => {
    newNode.id = v4();
    if (newNode.children.length > 0)
      newNode.children.forEach((n) => doRefresh(n));
  };

  return doRefresh(node);
};

const findNode = (nodeId, treeNode) => {
  let node = null;
  if (!treeNode) return null;

  if (treeNode.id === nodeId) {
    return treeNode;
  }

  if (treeNode.children.length > 0) {
    _.forEach(treeNode.children, (child) => {
      node = findNode(nodeId, child);
    });
  }

  return node;
};

const setOverrideLabelById = (payload, state) => {
  const { nodeId, label, useOverride } = payload;

  const newState = _.cloneDeep(state);

  const node = findNode(nodeId, newState.rootNode);
  if (node) {
    node.labelOverride = label;
    node.useLabelOverride = useOverride;
  }

  return { ...newState };
};

const updateSelectedOperatorList = (state) => {
  const newState = _.cloneDeep(state);
  newState.topLevelOpNodes = [];
  newState.allOpNodes = [];

  const drilldownAll = (node, ptype) => {
    node.rootNodeChild = ptype;
    node.children.forEach((n) => drilldownAll(n, node.type));
  };

  const drilldownAllOps = (node) => {
    if (node.type === cnsts.CB_NODETYPE_OPERATOR) {
      newState.allOpNodes.push(node);
      node.children.forEach((n) => drilldownAllOps(n));
    }
  };

  const drilldownTopsOps = (node) => {
    if (node.type === cnsts.CB_NODETYPE_OPERATOR) {
      const test = node.combine();
      if (!test || node.rootNodeChild === cnsts.CB_NODETYPE_ROOT) {
        newState.topLevelOpNodes.push(node);
        node.children.forEach((n) => drilldownTopsOps(n));
      }
    }
  };

  const setAllChildrenAsTops = (node) => {
    if (node.type === cnsts.CB_NODETYPE_OPERATOR) {
      newState.topLevelOpNodes.push(node);
      node.children.forEach((n) => setAllChildrenAsTops(n));
    }
  };

  newState.rootNode.children.forEach((n) => {
    drilldownAll(n, newState.rootNode.type);
    n.rootNodeChild = cnsts.CB_NODETYPE_ROOT;
  });

  newState.rootNode.children
    .filter((n) => n.type === cnsts.CB_NODETYPE_OPERATOR)
    .forEach((n) => {
      drilldownAllOps(n);

      if (n.combine() && n.rootNodeChild === cnsts.CB_NODETYPE_ROOT)
        setAllChildrenAsTops(n);
      else drilldownTopsOps(n);
    });

  return { ...newState };
};

const insertNodes = (parentNodeID, nodes, insertPos, state) => {
  if (!nodes) return state;

  const newState = _.cloneDeep(state);

  const insertNodes = findNode(parentNodeID, newState.rootNode);

  if (insertNodes) {
    insertNodes.children = [...insertNodes.children, ...nodes];
  }

  return { ...newState };
};

const removeNodeByIds = (payload, state) => {
  const { nodeId } = payload;
  const newState = _.cloneDeep(state);

  const rn = (nodes, nodeId) => {
    if (nodes) {
      if (_.find(newState.rootNode.children, (n) => n.id === nodeId)) {
        _.remove(newState.rootNode.children, (n) => n.id === nodeId);
      } else {
        nodes.forEach((node) => rn(node.children, nodeId));
      }
    }
  };

  nodeId.forEach((nodeId) => rn(newState.rootNode.children, nodeId));

  return { ...newState };
};

const clearCodingBox = (state) => {
  const newState = _.cloneDeep(state);
  newState.rootNode.children = [];

  return { ...newState };
};

const removeSelectedNodes = (state) => {
  const newState = _.cloneDeep(state);
  _.remove(newState.rootNode.children, (n) => n.selected === true);

  return { ...newState };
};

const removeAllNodes = (state) => {
  const newState = _.cloneDeep(state);
  newState.rootNode.children = [];

  return { ...newState };
};

const insertLeafNode = (payload, state) => {
  const { parentNodeID, nodes, insertPos } = payload;

  return insertNodes(parentNodeID, nodes, insertPos, state);
};

const insertFunctionNode = (payload, state) => {
  const { parentNodeID, nodes, insertPos } = payload;

  const newState = removeSelectedNodes(_.cloneDeep(state));
  return insertNodes(parentNodeID, nodes, insertPos, newState);
};

const changeFunctionOfSelectedNodes = (payload, state) => {
  const { functionName, isSelected, editable, params } = payload;

  const newState = _.cloneDeep(state);

  const selectedFuncs = _.filter(
    newState.rootNode.children,
    (n) => n.type === cnsts.CB_NODETYPE_FUNCTION && n.data.selected === true,
  );

  selectedFuncs.forEach((n) => {
    n.data = {
      funcName: functionName,
      selected: isSelected,
      editable,
      params,
    };
  });

  return { ...newState };
};

const removeFunctionById = (payload, state) => {
  const { nodeId } = payload;
  const newState = _.cloneDeep(state);

  const node = _.filter(newState.rootNode.children, (n) => n.id === nodeId);
  if (node && node.length > 0) {
    const latestState = removeNodeByIds({ nodeIds: [nodeId] }, newState);
    return {
      ...insertNodes(cnsts.CB_ROOT_NODE_ID, node[0].children, -1, latestState),
    };
  }

  return { ...state };
};

const insertSavedDatapoints = (payload, state) => {
  const { parentNodeID, nodes, insertPos } = payload;

  return insertNodes(parentNodeID, nodes, insertPos, state);
};

const createOperator = (nodeLeft, nodeRight, operatorSelected, combine) => {
  const topNode = wrapNode(cnsts.CB_NODETYPE_OPERATOR, operatorSelected);
  topNode.data = { selected: false, type: operatorSelected };
  topNode.children.push(nodeRight);
  topNode.children.push(nodeLeft);
  return topNode;
};

const insertOperatorNode = (payload, state) => {
  const {
    nodes,
    operatorSelected,
    parentNodeID,
    combine,
    insertPos,
    setAllAsTops,
  } = payload;

  if (nodes.length < 2) return { ...state };
  const hNodes = _.cloneDeep(nodes);
  let topNode = null;

  while (hNodes.length > 0) {
    if (topNode === null) {
      const pulled = _.pullAt(hNodes, [0, 1]);
      topNode = createOperator(pulled[1], pulled[0], operatorSelected, combine);
    } else {
      const pulled = _.pullAt(hNodes, [0]);
      topNode = createOperator(
        pulled[0],
        topNode,
        operatorSelected,
        combine,
        setAllAsTops,
      );
    }
  }

  return insertNodes(parentNodeID, [topNode], insertPos, state);
};

const setSelectedNodeById = (payload, state) => {
  const { nodeId, selected } = payload;
  const newState = _.cloneDeep(state);

  const node = _.find(newState.rootNode.children, (n) => n.id === nodeId);

  if (node) {
    node.selected = selected;
  }

  return { ...newState };
};

const selectAllNodesByType = (payload, state) => {
  const { selected, deep, type } = payload;

  const selectedAllDeep = (node, deep, selected) => {
    node.children.forEach((n) => {
      if (n.type === type) {
        n.selected = selected;
        if (n.children.length > 0 && deep) selectedAllDeep(n, deep, selected);
      }
    });
  };

  const newState = _.cloneDeep(state);
  selectedAllDeep(newState.rootNode, deep, selected);

  return { ...newState };
};

const selectAllNodes = (payload, state) => {
  const { selected, deep } = payload;

  const selectedAllDeep = (node, deep, selected) => {
    node.children.forEach((n) => {
      n.selected = selected;
      if (n.children.length > 0 && deep) selectedAllDeep(n, deep, selected);
    });
  };

  const newState = _.cloneDeep(state);
  selectedAllDeep(newState.rootNode, deep, selected);

  return { ...newState };
};

const changeSelectedOperator = (payload, state) => {
  const { newOperator, isSelected } = payload;

  const updatedSelected = (node, op) => {
    node.children.forEach((n) => {
      if (n.type === cnsts.CB_NODETYPE_OPERATOR && n.data.selected) {
        n.data = { selected: isSelected, type: newOperator };
      }
      updatedSelected(n, op);
    });
  };
  const newState = _.cloneDeep(state);
  updatedSelected(newState.rootNode, newOperator);

  return { ...newState };
};

const selectAllFunctions = (payload, state) => {
  const { isSelected } = payload;

  const updatedSelected = (node, op) => {
    node.children.forEach((n) => {
      if (n.type === cnsts.CB_NODETYPE_FUNCTION) {
        n.data = { ...n.data, selected: isSelected };
      }
      updatedSelected(n, op);
    });
  };
  const newState = _.cloneDeep(state);
  updatedSelected(newState.rootNode);

  return { ...newState };
};

const selectFunctionById = (payload, state) => {
  const { nodeId, selected } = payload;
  const newState = _.cloneDeep(state);

  const node = _.find(newState.rootNode.children, (n) => n.id === nodeId);

  if (node) node.data.selected = selected;

  return { ...newState };
};

const setSelectedLabelType = (payload, state) => {
  const { labelObj } = payload;
  const newState = _.cloneDeep(state);

  // newState.partsToShow = labelObj

  return { ...newState };
};

const selectAllOperators = (payload, state) => {
  const { newOperator, isSelected } = payload;

  const updatedSelected = (node, op) => {
    node.children.forEach((n) => {
      if (n.type === cnsts.CB_NODETYPE_OPERATOR) {
        n.data = { ...n.data, selected: isSelected };
      }
      updatedSelected(n, op);
    });
  };
  const newState = _.cloneDeep(state);
  updatedSelected(newState.rootNode, newOperator);

  return { ...newState };
};

const changeSelectedOperatorById = (payload, state) => {
  const { newOperator, nodeId, isSelected } = payload;

  const updatedSelected = (node, op) => {
    node.children.forEach((n) => {
      if (n.type === cnsts.CB_NODETYPE_OPERATOR && n.id === nodeId) {
        n.data = { ...n.data, selected: isSelected, type: newOperator };
      }
      updatedSelected(n, op);
    });
  };
  const newState = _.cloneDeep(state);
  updatedSelected(newState.rootNode, newOperator);

  return { ...newState };
};

const mergeSelectedNodes = (payload, state) => {
  const { operatorSelected, removeSourceNodes, insertPos } = payload;
  const newState = _.cloneDeep(state);

  let nodePath = "0";
  let match = true;

  const mNodes = returnSorted(
    _.filter(newState.rootNode.children, (c) => c.selected),
  );

  const grouped = _.groupBy(mNodes, (c) => c.p);
  const groupedArrays = _.map(_.toPairs(grouped), (x) => x[1]);

  if (groupedArrays.length >= 2) {
    const newNodes = [];
    groupedArrays.forEach((ga) => {
      if (ga && ga.length >= 2) {
        const p1 = {
          parentNodeID: cnsts.CB_ROOT_NODE_ID,
          nodes: ga,
          operatorSelected,
          setAllAsTops: true,
          insertPos,
        };

        const newState2 = _.cloneDeep(state);
        newState2.rootNode.children = [];
        const ns = insertOperatorNode(p1, newState2).rootNode.children;
        newNodes.push(ns[0]);
      } else newNodes.push(ga[0]);
    });

    if (newNodes.length >= 2) {
      const p1 = {
        parentNodeID: cnsts.CB_ROOT_NODE_ID,
        nodes: newNodes,
        operatorSelected,
        setAllAsTops: true,
        insertPos,
      };

      const newerState = insertOperatorNode(p1, newState);
      if (removeSourceNodes) {
        _.remove(newerState.rootNode.children, (c) => c.selected);
      } else
        newerState.rootNode.children.forEach((x) => {
          x.selected = false;
          x.id = v4();
        });
      return { ...newerState };
    }
  } else if (mNodes && mNodes.length >= 2) {
    const p1 = {
      parentNodeID: cnsts.CB_ROOT_NODE_ID,
      nodes: mNodes,
      operatorSelected,
      setAllAsTops: true,
      insertPos,
    };

    const newerState = insertOperatorNode(p1, newState);
    if (removeSourceNodes) {
      _.remove(newerState.rootNode.children, (c) => c.selected);
    } else
      newerState.rootNode.children.forEach((x) => {
        x.selected = false;
        x.id = v4();
      });
    return { ...newerState };
  }

  return { ...state };
};

const splitSelectedNodes = (state) => {
  const sn = (node, splitNodes) => {
    if (node.type !== cnsts.CB_NODETYPE_OPERATOR) {
      node.id = v4();
      splitNodes.push(node);
    } else {
      node.children.forEach((c) => {
        sn(c, splitNodes);
      });
    }
  };

  const newState = _.cloneDeep(state);

  const rootNode = _.filter(
    newState.rootNode.children,
    (x) => x.selected === true,
  );

  if (rootNode && rootNode.length >= 1) {
    const splitNodes = [];
    rootNode.forEach((n) => sn(n, splitNodes));

    if (splitNodes.length > 1) {
      _.remove(newState.rootNode.children, (x) => x.selected === true);
      return {
        ...insertNodes(cnsts.CB_ROOT_NODE_ID, splitNodes, -1, newState),
      };
    }
  }

  return { ...state };
};

const splitSelectedOpNodes = (state) => {
  const drilldownTops = (parent, node, opNodes, orphanedNodes) => {
    if (node.type === cnsts.CB_NODETYPE_OPERATOR) {
      if (node.combine() === true) {
        node.children.forEach((n) =>
          drilldownTops(node, n, opNodes, orphanedNodes),
        );
      }
      if (node.data.selected === true) {
        opNodes.push(node.children[0]);

        const child = _.cloneDeep(node.children[1]);
        node.type = child.type;
        node.data = child.date;
        node.useLabelOverride = false;
        node.labelOverride = "";
        node.children = child.children;
        node.selected = false;
        node.id = v4();
      }
    }
  };

  const newState = _.cloneDeep(state);
  const splitOffNodes = [];

  newState.topLevelOpNodes.forEach((n) =>
    drilldownTops(newState.rootNode, n, splitOffNodes),
  );

  return splitOffNodes.length > 0
    ? { ...insertNodes(cnsts.CB_ROOT_NODE_ID, splitOffNodes, -1, newState) }
    : { ...state };
};

const duplicateSelectedNodes = (state) => {
  const newState = _.cloneDeep(state);
  const selected = _.filter(
    newState.rootNode.children,
    (n) => n.selected === true,
  );
  selected.forEach((x) => {
    x.selected = false;
  });

  newState.rootNode.children = [
    ...newState.rootNode.children,
    ..._.map(_.cloneDeep(selected), (item) => {
      refreshIdsDeep(item);
      item.selected = true;
      return item;
    }),
  ];

  return { ...newState };
};

const copySelectedNodes = (state) => {
  const newState = _.cloneDeep(state);
  newState.copiedExpressions = _.map(
    _.cloneDeep(
      _.filter(newState.rootNode.children, (n) => n.selected === true),
    ),
    (item) => {
      refreshIdsDeep(item);
      return item;
    },
  );

  return { ...newState };
};

const pasteCopiedNodes = (state) => {
  const newState = _.cloneDeep(state);

  if (newState.rootNode.children)
    newState.rootNode.children.forEach((c) => {
      c.selected = false;
    });

  if (newState.copiedExpressions) {
    newState.rootNode.children = [
      ...newState.rootNode.children,
      ...newState.copiedExpressions,
    ];
  }

  newState.copiedExpressions = [];
  return { ...newState };
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    default:
      return state;
    case types.CB_CREATE_LEAF_NODE: {
      action.payload.nodes = wrapNodes(
        cnsts.CB_NODETYPE_CUSTOMDATAPOINT,
        action.payload.nodes,
      );
      newState = insertLeafNode(action.payload, state);
      break;
    }
    case types.CB_CREATE_SAVED_DATAPOINT_NODE: {
      action.payload.nodes = wrapNodes(
        cnsts.CB_NODETYPE_SAVEDDATAPOINT,
        action.payload.nodes,
      );
      newState = insertSavedDatapoints(action.payload, state);
      break;
    }
    case types.CB_CREATE_OPERATOR_NODE: {
      action.payload.nodes = wrapNodes(
        cnsts.CB_NODETYPE_CUSTOMDATAPOINT,
        action.payload.nodes,
      );
      action.payload.setAllAsTops = false;
      newState = insertOperatorNode(action.payload, state);
      break;
    }
    case types.CB_CREATE_FUNCTION_NODE: {
      const funct = {
        funcName: action.payload.functionName,
        selected: action.payload.isSelected,
        editable: action.payload.editable,
        params: action.payload.params,
      };

      if (action.payload.asIndividuals) {
        newState = _.cloneDeep(state);
        _.forEach(action.payload.nodes, (n) => {
          const node = wrapNode(cnsts.CB_NODETYPE_FUNCTION, funct);
          node.children.push({ ...n, id: v4(), selected: false });
          const payload = {
            parentNodeID: action.payload.parentNodeID,
            nodes: [node],
            insertPos: action.payload.insertPos,
          };
          newState = insertFunctionNode(payload, newState);
        });
      } else {
        const node = wrapNode(cnsts.CB_NODETYPE_FUNCTION, funct);
        node.children = _.map(_.cloneDeep(action.payload.nodes), (n) => {
          n.id = v4();
          n.selected = false;
          return n;
        });

        action.payload.nodes = [node];
        newState = insertFunctionNode(action.payload);
      }
      break;
    }
    case types.CB_MERGE_SELECTED_NODE: {
      newState = mergeSelectedNodes(action.payload, state);
      break;
    }
    case types.CB_SPLIT_SELECTED_NODE: {
      newState = splitSelectedNodes(state);
      break;
    }
    case types.CB_SPLIT_SELECTED_OP_NODE: {
      newState = splitSelectedOpNodes(state);
      break;
    }
    case types.CB_REMOVE_NODES_BY_ID: {
      newState = removeNodeByIds(action.payload, state);
      break;
    }
    case types.CB_CLEAR_CODING_BOX: {
      newState = clearCodingBox(state);
      break;
    }
    case types.CB_REMOVE_SELECTED_NODES: {
      newState = removeSelectedNodes(state);
      break;
    }
    case types.CB_REMOVE_ALL_NODES: {
      newState = removeAllNodes(state);
      break;
    }
    case types.CB_TOGGLE_SELECTED_NODE: {
      newState = setSelectedNodeById(action.payload, state);
      break;
    }
    case types.CB_SELECT_ALL_NODES: {
      newState = selectAllNodes(action.payload, state);
      break;
    }
    case types.CB_SELECT_ALL_NODES_BY_TYPE: {
      newState = selectAllNodesByType(action.payload, state);
      break;
    }
    case types.CB_SELECT_ALL_OPERATORS: {
      newState = selectAllOperators(action.payload, state);
      break;
    }
    case types.CB_CHANGE_SELECTED_OPERATORS: {
      newState = changeSelectedOperator(action.payload, state);
      break;
    }
    case types.CB_CHANGE_SELECTED_OPERATOR_BY_ID: {
      newState = changeSelectedOperatorById(action.payload, state);
      break;
    }
    case types.CB_DUPLICATE_SELECTED_NODES: {
      newState = duplicateSelectedNodes(state);
      break;
    }
    case types.CB_COPY_SELECTED_NODES: {
      newState = copySelectedNodes(state);
      break;
    }
    case types.CB_PASTE_COPIED_NODES: {
      newState = pasteCopiedNodes(state);
      break;
    }
    case types.CB_SET_OVERRIDE_LABEL_BY_ID: {
      newState = setOverrideLabelById(action.payload, state);
      break;
    }
    case types.CB_REMOVE_FUNCTION_NODE_BY_ID: {
      newState = removeFunctionById(action.payload, state);
      break;
    }
    case types.CB_CHANGE_FUNCTION_OF_SELECTED_NODES: {
      newState = changeFunctionOfSelectedNodes(action.payload, state);
      break;
    }
    case types.CB_SELECT_ALL_FUNCTION: {
      newState = selectAllFunctions(action.payload, state);
      break;
    }
    case types.CB_SELECT_FUNCTION_BY_ID: {
      newState = selectFunctionById(action.payload, state);
      break;
    }
    case types.CB_SELECTED_LABEL_TYPE: {
      newState = setSelectedLabelType(action.payload, state);
      break;
    }
    case types.CB_INSERT_NODES: {
      newState = insertNodes(
        action.payload.parentNodeID,
        [...action.payload.nodes],
        action.payload.insertPos,
        state,
      );
      break;
    }
  }

  newState = updateSelectedOperatorList(newState);
  return newState;
};
