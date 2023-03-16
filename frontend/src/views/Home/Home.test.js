import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "./Home";
import { ROUTES } from "../../settings/constants";

// Define mock navigate function
const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home component", () => {
  it("should render the correct heading", () => {
    render(<Home />);
    expect(
      screen.getByText("Are you an introvert or an extrovert?")
    ).toBeInTheDocument();
  });

  it("should call navigate when the button is clicked", () => {
    render(<Home />);
    const button = screen.getByText("Start Personality Test");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EVALUATION);
  });
});
