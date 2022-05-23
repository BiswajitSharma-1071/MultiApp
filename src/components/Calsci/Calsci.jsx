import React, { useState, useEffect, useReducer } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "../common/react-redux-hooks";
import { getExpressionOutput } from "../../actions/calcsiActions";
import CodingBoxContext from "./CalsciContext/CodingBoxContext";
import codingBoxReducer from "./CalsciContext/codingBoxReducer";
import { CB_ROOT_NODE_ID } from "../../constants";
import CodingBoxTabs from "./CodingBoxTabs";

const Calsci = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const intialCodingBoxState = {
    setTabIndex: (tab) => setTabIndex(tab),
    allOpNodes: [],
    topLevelOpNodes: [],
    rootNode: {
      type: "root",
      id: CB_ROOT_NODE_ID,
      selected: false,
      combined: false,
      children: [],
      getLabelString(pts) {
        return "";
      },
      getExpressionString() {
        return "";
      },
    },
  };
  const [state, dispatch] = useReducer(codingBoxReducer, intialCodingBoxState);

  return (
    <CodingBoxContext.Provider value={{ state, dispatch }}>
      <div className='main-calsci-container'>
        <div className='columns' style={{ paddingTop: "1rem" }}>
          <CodingBoxTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
        <div>{props.children}</div>
      </div>
    </CodingBoxContext.Provider>
  );
};

// Calsci.propTypes = {};

export default Calsci;

// const [expressionData, setexpressionData] = useState("");
// const dispatch = useDispatch();
// const { expressionResponse } = useSelector((state) => ({
//   expressionResponse: state.calsci.expressionResponse,
// }));

// const handleSubmitClick = () => {
//   console.log("expressionData:", expressionData);
//   dispatch(getExpressionOutput(expressionData));
// };
