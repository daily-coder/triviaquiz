import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
import decodeHTML from "../helper/decode/decode";
import Question from "./Question";
import QuizButton from "./QuizButton/QuizButton";
import Loading from "./Loading";
import ConnectionError from "./ConnectionError";

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [check, setCheck] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const decodedQuizData = decodeHTML(data.results);
        setQuizData(createQuizData(decodedQuizData));
        setIsLoading(false); // hide loading animation on success
        setIsError(false);
      })
      .catch((error) => {
        setIsLoading(false); // hide loading animation on failure
        setIsError(true);
        console.log(error);
      });
  }, [resetQuiz]);

  function createQuizData(data) {
    return data.map((questionData) => {
      // sort options so that correctAnswer is not always the first one.

      const allAnswers = [questionData.correct_answer, ...questionData.incorrect_answers].sort();

      const options = allAnswers.map((answer) => ({
        id: uuidv4(),
        isHeld: false,
        value: answer,
      }));

      const newQuestion = {
        id: uuidv4(),
        ...questionData,
      };

      return { question: newQuestion, options };
    });
  }

  function toggleIsHeld(options, id) {
    return options.map((option) => {
      // only one option should contain isHeld: true
      return option.id === id
        ? { ...option, isHeld: !option.isHeld }
        : { ...option, isHeld: false };
    });
  }

  function selectOption(index, id) {
    if (check) {
      return;
    }

    setQuizData((prevQuizData) => {
      return prevQuizData.map((questionData, questionIndex) => {
        if (index === questionIndex) {
          const newOptions = toggleIsHeld(questionData.options, id);
          return { ...questionData, options: newOptions };
        } else {
          return questionData;
        }
      });
    });
  }

  function checkAnswers() {
    setCheck(true);
  }

  function resetQuizData() {
    setCheck(false);
    setResetQuiz((prevCount) => prevCount + 1);
    setIsLoading(true);
  }

  function retryAPIRequest() {
    setIsLoading(true);
    setIsError(false);
    setResetQuiz((prevReset) => prevReset + 1);
  }

  const questionElements = quizData.map((questionData, index) => {
    return (
      <Question
        key={questionData.question.id}
        index={index}
        check={check}
        {...questionData}
        selectOption={selectOption}
      />
    );
  });

  const total = quizData.length;
  const score = quizData.filter((questionData) =>
    questionData.options.some(
      (option) => option.isHeld && option.value === questionData.question.correct_answer
    )
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="my-3">
        {isError ? (
          <ConnectionError text="Try Again" retryAPIRequest={retryAPIRequest} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="my-16 text-blue-dark dark:text-white">
            {questionElements}
            <div className="flex justify-center items-center mt-16">
              <p className="mr-4 text-lg">{check && `Score: ${score}/${total}`}</p>

              {!check ? (
                <QuizButton text="Check Answers" handleClick={checkAnswers} />
              ) : (
                <QuizButton text="Play Again" handleClick={resetQuizData} />
              )}
            </div>
          </div>
        )}
        {check && score === total && <Confetti />}
      </div>
    </div>
  );
}

export default Quiz;
