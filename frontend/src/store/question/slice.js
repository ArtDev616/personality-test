import { createSlice } from "@reduxjs/toolkit";

import { getAllQuestions, postQuestionResult } from "./actions";

const initialState = {
  isLoading: false,
  isPersonalityLoading: false,
  questions: [],
  personality: null,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearQuestionResult: (state, action) => {
      state.personality = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllQuestions.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.questions = payload;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.errors;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(postQuestionResult.pending, (state) => {
        state.isPersonalityLoading = true;
        state.error = null;
      })
      .addCase(postQuestionResult.fulfilled, (state, { payload }) => {
        state.isPersonalityLoading = false;
        state.personality = payload;
      })
      .addCase(postQuestionResult.rejected, (state, action) => {
        state.isPersonalityLoading = false;
        if (action.payload) {
          state.error = action.payload.errors;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { reducer, actions: sliceActions } = questionSlice;

export default questionSlice;
