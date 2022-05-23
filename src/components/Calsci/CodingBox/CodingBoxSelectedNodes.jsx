import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classNames from "classnames";
import CodingBoxContext from "../CalsciContext/CodingBoxContext";
import {
  CB_NODETYPE_ROOT,
  CB_NODETYPE_CUSTOMDATAPOINT,
  CB_NODETYPE_SAVEDDATAPOINT,
  CB_NODETYPE_OPERATOR,
  CB_NODETYPE_FUNCTION,
} from "../../../constants";

const EndpointBlock = (props) => {
  const { node } = props;

  switch (node.type) {
    case CB_NODETYPE_SAVEDDATAPOINT: {
      return <span value={node.id}>{`${node.data.title}`}</span>;
    }

    case CB_NODETYPE_CUSTOMDATAPOINT: {
      let outStr = "";
      outStr =
        node && node.data && node.data.label && node.data.label.join(", ");
      return <span value={node.id}>{outStr}</span>;
    }

    default:
      return <span>error</span>;
  }
};

EndpointBlock.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      title: PropTypes.string,
      labels: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

// **************************************************************************************** //
export const SavedDatapointBlock = (props) => {
  const { node, handleClick } = props;

  return (
    <span onClick={(e) => handleClick(e, node)} value={node.id}>
      {`${node.data.title}`}
    </span>
  );
};

SavedDatapointBlock.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  handleClick: PropTypes.func,
};

// *************************************************************************************** //
export const CustomDatapointBlock = (props) => {
  const { node, handleClick } = props;

  return (
    <span onClick={(e) => handleClick(e, node)}>
      <EndpointBlock node={node} />
    </span>
  );
};

CustomDatapointBlock.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      label: PropTypes.shape([]),
    }),
  }),
  handleClick: PropTypes.func,
};

// ************************************************************************************** //

export const CodingOperator = (props) => {
  const { node, handleOpClick } = props;

  const codingBoxContext = useContext(CodingBoxContext);

  const isTopNode = () => {
    const isTop =
      _.isUndefined(
        _.find(codingBoxContext.state.topLevelOpNodes, (n) => node.id),
      ) === false;

    return isTop;
  };

  return !isTopNode() ? (
    <span
      value={node.id}
      className='coding-box-item-box-item-operator-inner'
    >{`${node.data.type.label}`}</span>
  ) : (
    <span
      value={node.id}
      className={classNames("coding-box-item-box-item-operator-root", {
        "coding-box-item-box-item-operator-break": !node.combine(),
        "coding-box-item-box-item-operator-selected": node.data.selected,
      })}
      onClick={(e) => {
        handleOpClick(e, node);
        e.stopPropagation();
      }}
    >{`${node.data.type.label}`}</span>
  );
};

CodingOperator.propTypes = {
  node: PropTypes.shape({
    combine: PropTypes.func,
    id: PropTypes.string,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      isTop: PropTypes.bool,
      selected: PropTypes.bool,
      type: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
  }),
  handleOpClick: PropTypes.func,
};

// ************************************************************************************** //

export const OperatorBlock = (props) => {
  const { rootNode, drawNodeHeirarchy, handleClick, handleOpClick } = props;

  const drawNodeQuestion = (innerNode) => {
    return innerNode.type === CB_NODETYPE_CUSTOMDATAPOINT ? (
      <EndpointBlock node={innerNode} />
    ) : (
      drawNodeQuestion(innerNode.children[0])
    );
  };

  const drawMergedNode = (innerNode) => {
    const drawNodesMerged = (innerNode) => {
      if (innerNode.type === CB_NODETYPE_OPERATOR) {
        return (
          <Fragment>
            {drawNodesMerged(innerNode.children[0])}
            <CodingOperator node={innerNode} handleOpClick={handleOpClick} />
            {drawNodesMerged(innerNode.children[1])}
          </Fragment>
        );
      }

      return <EndpointBlock node={innerNode} />;
    };

    return (
      <span>
        {innerNode.rootNodeChild !== CB_NODETYPE_ROOT && (
          <span className='coding-box-item-box-item-operator-parens'>
            {" ( "}
          </span>
        )}
        {drawNodeQuestion(innerNode.children[0])}
        <span className='coding-box-item-box-item-operator-parens'>
          {" ( "}
        </span>
        {drawNodesMerged(innerNode)}
        <span className='coding-box-item-box-item-operator-parens'>
          {" ) "}
        </span>
        {innerNode.rootNodeChild !== CB_NODETYPE_ROOT && (
          <span className='coding-box-item-box-item-operator-parens'>
            {" ) "}
          </span>
        )}
      </span>
    );
  };

  const drawNodesIndividually = (innerNode) => {
    switch (innerNode.type) {
      case CB_NODETYPE_OPERATOR: {
        if (innerNode.combine() === false) {
          return (
            <Fragment>
              {drawNodesIndividually(innerNode.children[0])}
              <CodingOperator node={innerNode} handleOpClick={handleOpClick} />
              {drawNodesIndividually(innerNode.children[1])}
            </Fragment>
          );
        }
        return <Fragment>{drawMergedNode(innerNode)}</Fragment>;
      }
      case CB_NODETYPE_FUNCTION: {
        return drawNodeHeirarchy(innerNode, false, false);
      }

      default: {
        return (
          <Fragment>
            <span className='coding-box-item-box-item-operator-parens'>
              {" ( "}
            </span>
            <EndpointBlock node={innerNode} />
            <span className='coding-box-item-box-item-operator-parens'>
              {" ) "}
            </span>
          </Fragment>
        );
      }
    }
  };

  const drawOperatorNode = (node) => {
    const outerParensNeeded = !node.combine();
    if (!outerParensNeeded === true) {
      return (
        <div onClick={(e) => handleClick(e, rootNode)}>
          {drawMergedNode(node)}
        </div>
      );
    }

    return (
      <div onClick={(e) => handleClick(e, rootNode)}>
        {outerParensNeeded && (
          <div
            className='coding-box-item-box-item-operator-parens'
            style={{ fontSize: "16px" }}
          >
            {" ( "}
          </div>
        )}
        <div className='coding-box-inner-block'>
          {drawNodesIndividually(node)}
        </div>
        {outerParensNeeded && (
          <div
            className='coding-box-item-box-item-operator-parens'
            style={{ fontSize: "16px" }}
          >
            {" ) "}
          </div>
        )}
      </div>
    );
  };

  return drawOperatorNode(rootNode);
};

OperatorBlock.propTypes = {
  rootNode: PropTypes.shape({}),
  drawNodeHeirarchy: PropTypes.func,
  handleClick: PropTypes.func,
  handleOpClick: PropTypes.func,
};

// ************************************************************************************* //

export const FunctionBlock = (props) => {
  const { node, drawNodeHeirarchy, handleClick, handleFuncClick } = props;

  const drawFunction = (node) => {
    return node.data.editable && node.rootNodeChild === CB_NODETYPE_ROOT ? (
      <span
        value={node.id}
        className={classNames("coding-box-item-box-item-operator-root", {
          "coding-box-item-box-item-operator-selected": node.data.selected,
        })}
        onClick={(e) => {
          handleFuncClick(e, node);
          e.stopPropagation();
        }}
      >
        {` ${node.data.funcName} `}
      </span>
    ) : (
      <span value={node.id} className='coding-box-item-box-item-operator-inner'>
        {` ${node.data.funcName} `}
      </span>
    );
  };

  const drawSuffix = (node) => {
    switch (_.upperCase(node.data.funcName)) {
      default:
        return <Fragment />;
    }
  };

  return (
    <div onClick={(e) => handleClick(e, node)}>
      {drawFunction(node)}
      <span className='coding-box-item-box-item-operator-parens'>{" ( "}</span>
      {node.children.map((n, i) =>
        drawNodeHeirarchy(n, false, i < node.children.length - 1),
      )}
      {drawSuffix(node)}
      <span className='coding-box-item-box-item-operator-parens'>{" ) "}</span>
    </div>
  );
};

FunctionBlock.propTypes = {
  node: PropTypes.shape({}),
  drawNodeHeirarchy: PropTypes.func,
  handleClick: PropTypes.func,
  handleFuncClick: PropTypes.func,
};
