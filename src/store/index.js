import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reduxThunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "../reducers/reducers";
// import initialState from "../reducers/initialState';

const configureStore = (initialState) => {
  // const middleWares =
  //   process.env.NODE_ENV === "development"
  //     ? [reduxThunk, reduxImmutableStateInvariant()]
  //     : [reduxThunk];

  const middleWares = [reduxThunk, reduxImmutableStateInvariant()];

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares)),
  );
};

export default configureStore;
