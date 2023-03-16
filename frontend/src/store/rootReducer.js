import { combineReducers } from "@reduxjs/toolkit";

import { reducer as questionReducer } from "./question/slice";

const rootReducer = combineReducers({
  question: questionReducer,
});

export default rootReducer;
