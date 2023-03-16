import { useCallback } from "react";

import { useAppSelector, useAppDispatch } from "../store";

import * as actions from "./actions";
import { sliceActions } from "./slice";

export const useQuestion = () => {
  const dispatch = useAppDispatch();
  const questionState = useAppSelector(({ question }) => question);

  const getAllQuestions = useCallback(() => {
    dispatch(actions.getAllQuestions());
  }, [dispatch]);

  const postQuestionResult = useCallback(
    (params) => {
      dispatch(actions.postQuestionResult(params));
    },
    [dispatch]
  );

  const clearQuestionResult = useCallback(() => {
    dispatch(sliceActions.clearQuestionResult(""));
  }, [dispatch]);

  return {
    ...questionState,
    getAllQuestions,
    postQuestionResult,
    clearQuestionResult,
  };
};
