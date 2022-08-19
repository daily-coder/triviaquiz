import { render, screen } from "@testing-library/react";
import QuizButton from "./QuizButton";

const mockHideStartPage = jest.fn();

describe("QuizButton", function () {
  test("should render button with given text", function () {
    render(<QuizButton text="test" hideStartPage={mockHideStartPage} />);
    const quizButton = screen.getByRole("button", { name: "test" });
    expect(quizButton).toBeInTheDocument();
  });
});
