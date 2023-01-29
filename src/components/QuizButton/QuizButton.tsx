interface QuizButtonProps {
  text: string;
  handleClick(): void;
}

function QuizButton({ text, handleClick }: QuizButtonProps) {
  return (
    <button
      className="justify-self-center ml-3 p-4 w-48 text-white text-lg font-bold rounded-2xl bg-blue-dark text-md hover:bg-blue-900"
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default QuizButton;
