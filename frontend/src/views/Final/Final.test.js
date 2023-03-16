import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ROUTES } from "../../settings/constants";
import { Final } from "./Final";

const mockNavigate = jest.fn();
const mockClearQuestionResult = jest.fn();

// Mock useNavigate and useQuestion
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("../../store/question/hooks", () => ({
  useQuestion: jest.fn(() => ({
    clearQuestionResult: mockClearQuestionResult,
  }))
}));

describe("Final component", () => {
  beforeEach(() => {
    localStorage.setItem("result", "Introvert");
  });

  it("renders personality result and retake test button", () => {
    render(<Final />);
    expect(screen.getByText("You are Introvert!")).toBeInTheDocument();
    expect(screen.getByText("Retake the Test")).toBeInTheDocument();
  });

  it("clicking the retake test button navigates to evaluation page and clears local storage", () => {

    // Render the component
    render(<Final />);

    // Click retake button
    const button = screen.getByText("Retake the Test");
    fireEvent.click(button);

    // Check that localStorage was cleared and clearQuestionResult was called
    expect(localStorage.getItem("result")).toBe(null);
    expect(mockClearQuestionResult).toHaveBeenCalledTimes(1);

    // Check that navigate was called with EVALUATION route
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EVALUATION);
  });
});
