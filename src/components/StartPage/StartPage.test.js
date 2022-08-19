import { render, screen } from "@testing-library/react";
import StartPage from "./StartPage";

describe("StartPage", function () {
  test("should render StartPage", function () {
    render(<StartPage />);
    const StartPageComponent = screen.getByTestId("start-page");
    expect(StartPageComponent).toBeInTheDocument();
  });

  test("should render main heading", function () {
    render(<StartPage />);
    const mainHeading = screen.getByRole("heading", { name: "Trivia Quiz" });
    expect(mainHeading).toBeInTheDocument();
  });

  test("should render description paragraph", function () {
    render(<StartPage />);
    const paragraphElt = screen.getByText("your favorite quiz app");
    expect(paragraphElt).toBeInTheDocument();
  });

  test("should render start quiz button", function () {
    render(<StartPage />);
    const startQuizBtn = screen.getByRole("button", { name: "Start Quiz" });
    expect(startQuizBtn).toBeInTheDocument();
  });
});
