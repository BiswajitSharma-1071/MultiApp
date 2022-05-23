/* eslint-disable import/no-anonymous-default-export */
// import uuid from "uuidv4";
// import _ from "lodash";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.githubFinder, action) => {
  switch (action.type) {
    case types.GET_GITHUB_USERS_SEARCH_DATA: {
      return { ...state };
    }
    case types.GET_GITHUB_USER_DATA: {
      return { ...state };
    }

    case types.GET_USER_REPO_DATA: {
      return { ...state };
    }

    default:
      return state;
  }
};
