/* eslint-disable import/no-anonymous-default-export */
// import uuid from "uuidv4";
import _ from "lodash";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.calsci, action) => {
  switch (action.type) {
    case types.GET_EXPRESSION_DATA: {
      const expressionResponse = _.cloneDeep(action.payload);

      return {
        ...state,
        expressionResponse,
      };
    }

    default:
      return state;
  }
};
