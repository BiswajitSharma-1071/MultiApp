import { v4 } from "uuid";
import _ from "lodash";
import {
  CB_NODETYPE_CUSTOMDATAPOINT,
  CB_NODETYPE_OPERATOR,
} from "../constants";

export const createDatapointForCodingBox = (selectedNodeAnswer) => {
  const getLabels = (node) => {
    return ["Random", " Label", node];
  };

  return {
    label: getLabels(selectedNodeAnswer),
    keyword: selectedNodeAnswer,
    uniqueId: v4(),
    // midpoint: selectedNodeAnswer.midpoint,
    // nodeLabel:,
    // shortText:,
    // shortTextCatgView:,
  };
};

export const combineAllChildren = (node) => {
  if (node.type !== CB_NODETYPE_OPERATOR) return false;

  let nodePath = "0";
  let match = true;

  const checkIfPathMatch = (node) => {
    node.children.forEach((n) => {
      if (n.type === CB_NODETYPE_OPERATOR) {
        match =
          match &&
          node.data.type.symbol === n.data.type.symbol &&
          checkIfPathMatch(n);
      } else if (n.type !== CB_NODETYPE_CUSTOMDATAPOINT) {
        // saveddatapoints
        match = false;
      } else if (match === true) {
        // customdatapoints
        match = false;
      }
    });
    return match;
  };

  return checkIfPathMatch(node);
};
