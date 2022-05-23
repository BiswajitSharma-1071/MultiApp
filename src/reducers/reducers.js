import { combineReducers } from "redux";

import githubfinderReducer from "./githubfinderReducer";
import covidtrackerReducer from "./covidtrackerReducer";
import calsciReducer from "./calsciReducer";
import toDoListReducer from "./toDoListReducer";
import notesSuitcaseReducer from "./notesSuitcaseReducer";
import homeDataReducer from "./homeDataReducer";

const appReducer = combineReducers({
  homeData: homeDataReducer,
  toDoList: toDoListReducer,
  notesSuitcase: notesSuitcaseReducer,
  githubFinder: githubfinderReducer,
  covidTracker: covidtrackerReducer,
  calsci: calsciReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
