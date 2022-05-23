import React, { Fragment, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styled from "styled-components";
import _ from "lodash";
import PropTypes from "prop-types";
import * as cnsts from "../../../constants";
import { useCodingBoxContext } from "../CalsciContext/CodingBoxContext";
import codingBoxActions from "../CalsciContext/codingBoxActions";
import {
  SavedDatapointBlock,
  CustomDatapointBlock,
  OperatorBlock,
  FunctionBlock,
} from "./CodingBoxSelectedNodes";

const CB_Palette = [
  { background: "#F3F7FC", border: "#BEC9DA" },
  { background: "#FCF5F3", border: "#BEC9DA" },
  { background: "#F2FFFD", border: "#BEC9DA" },
  { background: "#FCFCF3", border: "#BEC9DA" },
  { background: "#F6F3FC", border: "#BEC9DA" },
  { background: "#FCF3F3", border: "#BEC9DA" },
  { background: "#F3FCF6", border: "#BEC9DA" },
  { background: "#FFF5F5", border: "#BEC9DA" },
  { background: "#F7F7F7", border: "#BEC9DA" },
  { background: "#FCF3FB", border: "#BEC9DA" },
];

const DivItem = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17.7px;
  padding: 2px 4px;
  margin: 1px;
  cursor: pointer;
  background: ${(props) =>
    props.selected && props.oneBelowRoot
      ? CB_Palette[props.group].background
      : "none"} !important;
  border: 1px dashed
    ${(props) =>
      props.selected && props.oneBelowRoot
        ? CB_Palette[props.group].border
        : "white"} !important;
  ${(props) => (props.commaSeperated ? '&:after{content: ",";};' : "")}
`;

const CodingBoxItems = (props) => {
  const {
    codingBoxRef,
    savedDatapointTab,
    handleDeleteClicked,
    saveDatapointActive,
    selEditLabelBoxactive,
    infoBoxRef,
    selectedOpNodes,
  } = props;

  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [nodesCount, setNodesCount] = useState(0);
  const [codingBoxPrevState, setCodingBoxPrevState] = useState([]);
  const codeBox = useRef(null);
  const codingBoxContext = useCodingBoxContext();
  const {
    selectAllNodes,
    selectAllOperator,
    selectAllFunctions,
    changeSelectedOperatorById,
    duplicateSelectedNodes,
    copySelectedNodes,
    pasteCopieddNodes,
    setNodeSelectionById,
    selectFunctionById,
    insertFunctionNode,
    changeFunctionOfSelectedNodes,
  } = codingBoxActions(codingBoxContext.state, codingBoxContext.dispatch);

  useEffect(() => {
    if (nodesCount !== codingBoxContext.state.rootNode.children.length) {
      setTimeout(() => {
        if (codeBox && codeBox.current)
          codeBox.current.scrollIntoView({ behaviour: "smooth" });
      }, 500);

      if (
        codingBoxContext.state.rootNode.children.filter((x) => x.selected)
          .length === 0
      ) {
        setSelectedNodeId("");
      }
    }

    if (
      nodesCount === codingBoxContext.state.rootNode.children.length &&
      nodesCount > 1 &&
      !_.isEqual(
        codingBoxPrevState,
        codingBoxContext.state.rootNode.children.map((i) => i.type),
      )
    ) {
      setTimeout(() => {
        if (codeBox && codeBox.current)
          codeBox.current.scrollIntoView({ behaviour: "smooth" });
      }, 500);
    }
    setNodesCount(codingBoxContext.state.rootNode.children.length);
    setCodingBoxPrevState(
      codingBoxContext.state.rootNode.children.map((item) => item.type),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codingBoxContext.state.rootNode.children]);

  const hasChildren =
    codingBoxContext &&
    codingBoxContext.state &&
    codingBoxContext.state.rootNode &&
    codingBoxContext.state.rootNode.children &&
    codingBoxContext.state.rootNode.children.length > 0;

  const clearSelections = () => {
    selectAllNodes(false);
    selectAllOperator(false);
    selectAllFunctions(false);
    setSelectedNodeId("");
  };

  const handleOperatorSelections = (event, node) => {
    clearSelections();
    selectedOpNodes(node);

    // if (infoBoxRef && infoBoxRef.current && infoBoxRef.current.props.isOpen)
    //   infoBoxRef.current.targetRef.current.click();
    changeSelectedOperatorById(node.data.type, node.id, !node.data.selected);
  };

  const handleBoxClick = (e) => {
    const isCtrlKey = e.metaKey || e.ctrlkey;

    if (!isCtrlKey) {
      clearSelections();

      // if (infoBoxRef.current.props.isOpen)
      //   infoBoxRef.current.targetRef.current.click();

      e.stopPropagation();
    }
  };

  const keyHandler = (e) => {
    const isCtrlKey = e.metaKey || e.ctrlkey;

    switch (_.lowerCase(e.key)) {
      case "delete":
      case "backspace": {
        handleDeleteClicked();
        break;
      }
      case "a": {
        if (isCtrlKey) selectAllNodes();
        break;
      }

      case "c": {
        if (isCtrlKey) copySelectedNodes();
        break;
      }

      case "d": {
        if (isCtrlKey) duplicateSelectedNodes();
        break;
      }

      case "v": {
        if (isCtrlKey) pasteCopieddNodes();
        break;
      }

      case "k": {
        // show keywords
        break;
      }

      default:
        break;
    }

    e.preventDefault();
  };

  const handleListSelections = (event, node) => {
    if (node.rootNodeChild !== cnsts.CB_NODETYPE_ROOT) return;

    const selected = node.selected;

    const isCtrlKey = event.metaKey || event.ctrlkey;

    if (!isCtrlKey) selectAllNodes(false);

    selectAllOperator(false);
    selectAllFunctions(false);

    const index = _.findIndex(
      codingBoxContext.state.rootNode.children,
      (n) => n.id === node.id,
    );

    if (selectedNodeId === "") setSelectedNodeId(node.id);

    if (event.shiftKey === true) {
      let sIndex = _.findIndex(
        codingBoxContext.state.rootNode.children,
        (n) => n.id === selectedNodeId,
      );
      sIndex = sIndex === -1 ? index : sIndex;

      if (
        sIndex >= 0 &&
        sIndex < codingBoxContext.state.rootNode.children.length
      ) {
        const minIndex = Math.min(index, sIndex);
        const maxIndex = Math.max(index, sIndex);
        codingBoxContext.state.rootNode.children.forEach((n, i) => {
          if (i >= minIndex && i <= maxIndex) {
            setNodeSelectionById(n.id, true);
          }
        });
      }
    } else {
      setNodeSelectionById(node.id, !selected);
      setSelectedNodeId(node.id);
    }
    // if (infoBoxRef.current.props.isOpen)
    //   infoBoxRef.current.targetRef.current.click();
    event.stopPropagation();
  };

  const handleFunctionSelection = (event, node) => {
    const toggle = !node.data.selected;
    selectAllNodes(false);
    selectAllOperator(false);
    setSelectedNodeId("");

    const isCtrlKey = event.metaKey || event.ctrlkey;

    if (!isCtrlKey) selectAllFunctions(false);

    selectFunctionById(node.id, toggle);
    // if (infoBoxRef.current.props.isOpen)
    //   infoBoxRef.current.targetRef.current.click();
    event.stopPropagation();
  };

  const drawNodeHeirarchy = (
    topNode,
    lastNodeInArray,
    commaSeperated = false,
  ) => {
    const drawEachNode = (node) => {
      let output = <Fragment />;

      switch (node.type) {
        default:
          break;

        case cnsts.CB_NODETYPE_CUSTOMDATAPOINT: {
          output = (
            <CustomDatapointBlock
              node={node}
              handleClick={handleListSelections}
            />
          );
          break;
        }
        case cnsts.CB_NODETYPE_OPERATOR: {
          output = (
            <OperatorBlock
              rootNode={node}
              handleClick={handleListSelections}
              handleOpClick={handleOperatorSelections}
              drawNodeHeirarchy={drawNodeHeirarchy}
            />
          );
          break;
        }
        case cnsts.CB_NODETYPE_SAVEDDATAPOINT: {
          output = (
            <SavedDatapointBlock
              node={node}
              handleClick={handleListSelections}
            />
          );
          break;
        }
        case cnsts.CB_NODETYPE_FUNCTION: {
          output = (
            <FunctionBlock
              node={node}
              drawNodeHeirarchy={drawNodeHeirarchy}
              handleClick={handleListSelections}
              handleFuncClick={handleFunctionSelection}
            />
          );
          break;
        }
      }

      return output;
    };

    return (
      <DivItem
        ref={lastNodeInArray ? codeBox : null}
        key={topNode.id}
        selected={topNode.selected}
        group={0}
        commaSeperated={commaSeperated}
        oneBelowRoot={topNode.rootNodeChild === cnsts.CB_NODETYPE_ROOT}
      >
        {drawEachNode(topNode)}
      </DivItem>
    );
  };

  return (
    <div
      style={
        savedDatapointTab
          ? {
              height: selEditLabelBoxactive
                ? "calc(100vh - 370px)"
                : "calc(100vh - 335px)",
            }
          : {
              height: saveDatapointActive
                ? selEditLabelBoxactive
                  ? "calc(100vh - 392px)"
                  : "calc(100vh - 357px)"
                : selEditLabelBoxactive
                ? "calc(100vh - 420px)"
                : "calc(100vh - 387px)",
            }
      }
      className={classNames("coding-box-content-box")}
      onClick={(e) => handleBoxClick(e)}
      tabIndex='-1'
      onKeyDown={(e) => keyHandler(e)}
      ref={codingBoxRef}
    >
      {!hasChildren ? (
        <div className='warning-msg'> Add Datapoint from Left Section</div>
      ) : (
        <Fragment>
          {codingBoxContext.state.rootNode.children.map((node) =>
            drawNodeHeirarchy(node, true, false),
          )}
        </Fragment>
      )}
    </div>
  );
};

CodingBoxItems.propTypes = {};

export default CodingBoxItems;
