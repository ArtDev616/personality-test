import React from "react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../settings/constants";
import { getBestDuplicateNumber } from "../../settings/helper";
import { useQuestion } from "../../store/question/hooks";

export const Evaluation = () => {
  const navigator = useNavigate();
  const {
    isLoading,
    isPersonalityLoading,
    questions,
    personality,
    getAllQuestions,
    postQuestionResult,
  } = useQuestion();

  const [step, setStep] = useState(0);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (questions.length === 0) getAllQuestions();
  }, [questions, getAllQuestions]);

  useEffect(() => {
    const gotoFinal = async () => {
      if (!isPersonalityLoading && personality) {
        await localStorage.setItem("result", personality);
        await navigator(ROUTES.FINAL);
      }
    };

    gotoFinal();
  }, [isPersonalityLoading, personality, navigator]);

  const handlePreviousQuestion = () => {
    if (step > 0) setStep(step - 1);
    else navigator(ROUTES.HOME);
  };

  const handleNextQuestion = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else {
      let scoreArray = [];

      result.forEach((item) => {
        scoreArray.push(item.score);
      });

      const score = getBestDuplicateNumber(scoreArray);
      postQuestionResult({ score });
    }
  };

  const handleAnswer = (answer_id, score) => {
    const question_id = questions[step].id;
    const tmpResult = result.filter((item) => item.question_id !== question_id);
    setResult([...tmpResult, { question_id, answer_id, score }]);
  };

  const [nextBtnTitle] = useMemo(() => {
    if (step === questions.length - 1) {
      if (isPersonalityLoading) return ["Loading"];
      else return ["Submit"];
    } else return ["Next questions"];
  }, [step, questions.length, isPersonalityLoading]);

  const [prevBtnTitle] = useMemo(() => {
    if (step === 0) return ["Go to Home"];
    else return ["Previous"];
  }, [step]);

  const haveAnswer = result.find(
    (item) => item.question_id === questions[step].id
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading && <p>Loading...</p>}
      {questions && questions.length > 0 && (
        <div className="max-w-2xl rounded overflow-hidden shadow-lg p-8 bg-gray-100">
          <p>
            Questions {step + 1} / {questions.length}
          </p>
          <p className="my-4 text-lg font-semibold">
            {questions[step].question}
          </p>
          <p className="mb-4 italic">All questions are required</p>
          {JSON.parse(questions[step].answers).map((answer, index) => {
            const isSelect = result.find(
              (item) =>
                item.question_id === questions[step].id &&
                item.answer_id === answer.id
            );
            return (
              <div
                key={answer.id}
                className={`mt-2 flex items-center p-3 rounded-md border border-gray-400 cursor-pointer bg-white hover:bg-gray-300 ${
                  isSelect && "border-pink-500"
                }`}
                onClick={() => handleAnswer(answer.id, answer.score)}
              >
                <div
                  className={`w-[24px] h-[24px] bg-gray-200 rounded-sm text-center ${
                    isSelect && "bg-pink-500 text-white"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-4">{answer.answer}</div>
              </div>
            );
          })}
          <div className="mt-4 flex">
            <button
              id="btn-prev"
              type="button"
              className="py-3 mr-2 w-full rounded-md border border-gray-300 hover:bg-gray-200"
              onClick={handlePreviousQuestion}
            >
              {prevBtnTitle}
            </button>
            <button
              id="btn-next"
              type="button"
              className="py-3 w-full rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed"
              onClick={handleNextQuestion}
              disabled={!haveAnswer}
            >
              {nextBtnTitle}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
