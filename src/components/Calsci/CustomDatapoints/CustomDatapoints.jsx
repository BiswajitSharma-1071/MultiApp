import React, { useState } from "react";
import { useCodingBoxContext } from "../CalsciContext/CodingBoxContext";
import codingBoxActions from "../CalsciContext/codingBoxActions";
import CustomDataPointLeftSection from "./CustomDataPointLeftSection";
import CodingBox from "../CodingBox";

const styles = {
  tabPanels: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "calc(100vh - 12em)",
    // border: "1px solid rgb(153, 152, 152)",
    // borderRadius: "0.5rem",
    margin: "0",
  },
};

const CustomDatapoints = (props) => {
  const [checkBlur, setCheckBlur] = useState(true);
  const codingBoxContext = useCodingBoxContext();
  const { selectAllNodes, selectAllOperator, selectAllFunctions } =
    codingBoxActions(codingBoxContext.state, codingBoxContext.dispatch);

  const clearSelections = (e) => {
    if (checkBlur && !e.currentTarget.contains(e.relatedTarget)) {
      selectAllNodes(false);
      selectAllOperator(false);
      selectAllFunctions(false);
    }
  };

  return (
    <div style={styles.tabPanels} className='row'>
      <div className='columns calsci-customDatapoints-left-section customDatapointsLeftSection'>
        <CustomDataPointLeftSection />
      </div>
      <div
        className='columns calsci-customDatapoints-right-section coding-box'
        onBlur={(e) => clearSelections(e)}
      >
        <CodingBox setCheckBlur={setCheckBlur} />
      </div>
    </div>
  );
};

export default CustomDatapoints;
