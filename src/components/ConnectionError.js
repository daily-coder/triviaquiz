import QuizButton from "./QuizButton/QuizButton";

function ConnectionError({ retryAPIRequest }) {
  return (
    <div className="flex flex-col items-center dark:text-white">
      <span className="mb-4">There was an error. Check your internet connection.</span>
      <QuizButton text="Try Again" handleClick={retryAPIRequest} />
    </div>
  );
}

export default ConnectionError;
