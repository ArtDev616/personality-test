import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAxiosInstance } from "../../services/api";

const api = getAxiosInstance();

export const getAllQuestions = createAsyncThunk(
  "questions/getAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/all/questions");
      return response.data.questions;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

export const postQuestionResult = createAsyncThunk(
  "questions/result",
  async ({ score }, { rejectWithValue }) => {
    try {
      const response = await api.post("/personality-test", {
        score,
      });
      return response.data.personality;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);
