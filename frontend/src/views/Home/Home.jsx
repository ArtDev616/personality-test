import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../settings/constants";

export const Home = () => {
  const navigate = useNavigate();

  const goToEvaluation = () => {
    navigate(ROUTES.EVALUATION);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl">Are you an introvert or an extrovert?</h1>
      <p>@Powered By Andrew</p>
      <img className="mt-8" src="assets/imgs/bg-img.jpeg" alt="" />
      <button
        type="button"
        className="mt-8 py-2 px-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
        onClick={goToEvaluation}
      >
        Start Personality Test
      </button>
    </div>
  );
};
