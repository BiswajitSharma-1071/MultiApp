import * as _ from "lodash";
import * as cnsts from "../../../constants";

import { combineAllChildren } from "../../../utils/CodingBoxUtils";

const LEFT_PAREN = true;
const RIGHT_PAREN = false;

export const CBStandardLabels = (props) => {
  const { node } = props;
  const defaultVal = () => "";

  const drawCustomEntry = (epstr) => {
    return epstr;
  };

  const drawSavedEntry = () => {
    return node.data.title;
  };

  const drawOperator = () => {
    return ` ${node.data.type.label} `;
  };

  const drawParen = (whichParen) => {
    return whichParen === LEFT_PAREN ? " (" : ") ";
  };

  return {
    defaultVal,
    drawCustomEntry,
    drawSavedEntry,
    drawOperator,
    drawParen,
  };
};

const CodingBoxLabelGenerator = (labelParts, extraStuff) => {
  const toLabelString = () => {};

  const toDefString = () => {};

  return { toLabelString, toDefString };
};

export default CodingBoxLabelGenerator;
