import axios from "axios";
import * as types from "./actionTypes";

export const getUserSearch = ({ keyword }) => {
  // any logic if required
  const url = "any url" + keyword;

  return (dispatch) => {
    axios({
      url,
      method: "get",
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
      responseType: "json",
      // data: anyVariableorRequired,
    })
      .then((response) => {
        dispatch({
          type: types.GET_GITHUB_USERS_SEARCH_DATA,
          payload: response.data.data,
          // any other feilds if required
        });
      })
      .catch((error) => console.warn(error));
  };
};
