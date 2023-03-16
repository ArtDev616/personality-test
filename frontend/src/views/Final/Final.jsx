import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../settings/constants";
import { useQuestion } from "../../store/question/hooks";

export const Final = () => {
  const navigate = useNavigate();
  const { clearQuestionResult } = useQuestion();
  const personality = localStorage.getItem("result");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="min-w-[50%] max-w-2xl rounded overflow-hidden shadow-lg p-8 bg-gray-100">
        <h1 className="text-4xl text-center">You are {personality}!</h1>
        <button
          type="button"
          className="mt-8 py-2 px-8 w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
          onClick={() => {
            localStorage.setItem("result", "");
            clearQuestionResult();
            navigate(ROUTES.EVALUATION);
          }}
        >
          Retake the Test
        </button>
      </div>
    </div>
  );
};
