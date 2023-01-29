interface Option {
  id: string;
  isHeld: boolean;
  value: string;
}

interface QuestionProps {
  question: {
    question: string;
    correct_answer: string;
    id: string;
  };
  options: Option[];
  selectOption(index: number, id: string): void;
  index: number;
  check: boolean;
}

function Question({
  question,
  options,
  selectOption,
  index,
  check,
}: QuestionProps) {
  function findOptionStyles(
    check: boolean,
    value: string,
    isHeld: boolean,
    correctAnswer: string
  ) {
    const heldStyles =
      "bg-violet-light border-transparent dark:text-green-light dark:bg-grey";
    const correctStyles = "bg-green-light border-transparent dark:text-dark";
    const wrongStyles =
      "bg-pink-light border-transparent dark:text-dark dark:bg-red-300";

    if (!check && isHeld) {
      return heldStyles;
    }

    if (check) {
      const isCorrect = value === correctAnswer;

      if (isCorrect) {
        return correctStyles;
      }

      if (!isCorrect && isHeld) {
        return wrongStyles;
      }
    }

    // options with isHeld: false
    return "border-current";
  }

  const optionElements = options.map((option) => {
    const { id, value, isHeld } = option;
    const { correct_answer } = question;
    const hoverStyles = `cursor-pointer hover:bg-violet-light hover:border-transparent 
                         dark:hover:text-green-light dark:hover:bg-grey dark:hover:border-dark focus:ring-2`;
    const optionStyles = findOptionStyles(check, value, isHeld, correct_answer);

    return (
      <span
        key={id}
        className={`mr-5 mt-5 px-3 py-3 border-2 rounded-2xl min-w-[100px] text-center focus:ring-2
                   ${!check && hoverStyles} ${optionStyles}`}
        onClick={() => selectOption(index, id)}
      >
        {value}
      </span>
    );
  });

  return (
    <div className="my-10">
      <h2 className="text-lg font-semibold">{question.question}</h2>
      <div className="flex flex-wrap">{optionElements}</div>
    </div>
  );
}

export default Question;
