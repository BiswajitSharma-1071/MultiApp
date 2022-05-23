/* eslint-disable import/no-anonymous-default-export */
// import uuid from "uuidv4";
// import _ from "lodash";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.covidTracker, action) => {
  switch (action.type) {
    case types.GET_AFFECTED_COUNTRY_LIST: {
      return { ...state };
    }
    case types.GET_ACTIVE_CASES_LIST: {
      return { ...state };
    }

    case types.GET_CONFIRMED_CASES_LIST: {
      return { ...state };
    }

    default:
      return state;
  }
};
