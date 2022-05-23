import axios from "axios";
import * as types from "./actionTypes";

export const getExpressionOutput = (keyword) => {
  // any logic if required
  const url = "https://calculator-portable.herokuapp.com/calculate";
  // throw new Error("Testing Error boundary");

  return (dispatch) => {
    axios({
      url,
      method: "post",
      headers: {
        Accept: "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      responseType: "json",
      data: {
        Query: keyword,
      },
    })
      .then((response) => {
        dispatch({
          type: types.GET_EXPRESSION_DATA,
          payload: response.data,
          // any other feilds if required
        });
      })
      .catch((error) => console.warn(error));
  };
};
