import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

import decodeHTML from "../helper/decode";
import type {
  Option,
  OriginalQuestionData,
  ModifiedQuestionData,
} from "../types";

import ConnectionError from "./ConnectionError";
import Loading from "./Loading";
import Question from "./Question";
import QuizButton from "./QuizButton";

function Quiz() {
  const [quizData, setQuizData] = useState<ModifiedQuestionData[]>([]);
  const [check, setCheck] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(0);
  const [status, setStatus] = useState<"pending" | "resolved" | "rejected">(
    "pending"
  );

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from https://opentdb.com, response: ${response}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const decodedQuizData = decodeHTML(data.results);
        setQuizData(createQuizData(decodedQuizData as OriginalQuestionData[]));
        setStatus("resolved");
      })
      .catch((error) => {
        setStatus("rejected");
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [resetQuiz]);

  function createQuizData(data: OriginalQuestionData[]) {
    return data.map((questionData: OriginalQuestionData) => {
      // sort options so that correctAnswer is not always the first one.

      const allAnswers = [
        questionData.correct_answer,
        ...questionData.incorrect_answers,
      ].sort();

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

  function toggleIsHeld(options: Option[], id: string) {
    return options.map((option) => {
      // only one option should contain isHeld: true
      return option.id === id
        ? { ...option, isHeld: !option.isHeld }
        : { ...option, isHeld: false };
    });
  }

  function selectOption(index: number, id: string) {
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
    setStatus("pending");
  }

  function retryAPIRequest() {
    setStatus("pending");
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
      (option) =>
        option.isHeld && option.value === questionData.question.correct_answer
    )
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="my-3">
        {status === "rejected" ? (
          <ConnectionError retryAPIRequest={retryAPIRequest} />
        ) : status === "pending" ? (
          <Loading />
        ) : (
          <div className="my-16 text-blue-dark dark:text-white">
            {questionElements}
            <div className="flex justify-center items-center mt-16">
              <p className="mr-4 text-lg">
                {check && `Score: ${score}/${total}`}
              </p>

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
