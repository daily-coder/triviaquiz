import QuizButton from "../QuizButton/QuizButton";

function StartPage({ hideStartPage }) {
  return (
    <div data-testid="start-page" className="text-center text-blue-dark">
      <h1 className="text-4xl font-semibold tracking-wide">Trivia Quiz</h1>
      <p className="mt-1 mb-7">your favorite quiz app</p>
      <QuizButton text="Start Quiz" handleClick={hideStartPage} />
    </div>
  );
}

export default StartPage;
