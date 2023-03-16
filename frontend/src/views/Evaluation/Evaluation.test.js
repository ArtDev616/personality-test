import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuestion } from '../../store/question/hooks';
import { ROUTES } from "../../settings/constants";
import { Evaluation } from './Evaluation';

const mockNavigate = jest.fn();
const mockPostQuestionResult = jest.fn();
const mockGetAllQuestions = jest.fn();
const mockPersonality = 'INTP';

const mockQuestions = [
  {
    id: 1,
    question: 'Question 1',
    answers: '[{"id":1,"answer":"Answer 1","score":1},{"id":2,"answer":"Answer 2","score":2}]',
  },
  {
    id: 2,
    question: 'Question 2',
    answers: '[{"id":3,"answer":"Answer 3","score":1},{"id":4,"answer":"Answer 4","score":2}]',
  },
]

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../store/question/hooks', () => ({
  useQuestion: jest.fn(),
}));

describe('Evaluation', () => {
  beforeEach(() => {
    useQuestion.mockReturnValue({
      isLoading: false,
      isPersonalityLoading: false,
      questions: mockQuestions,
      personality: mockPersonality,
      getAllQuestions: mockGetAllQuestions,
      postQuestionResult: mockPostQuestionResult,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when questions are not loaded', () => {
    useQuestion.mockReturnValue({
      isLoading: true,
      isPersonalityLoading: false,
      questions: [],
      personality: '',
      getAllQuestions: mockGetAllQuestions,
      postQuestionResult: mockPostQuestionResult,
    });

    render(<Evaluation />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the first question', () => {
    render(<Evaluation />);

    expect(screen.getByText('Questions 1 / 2')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('All questions are required')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 2')).toBeInTheDocument();
  });

  it('renders the final button when all questions are answered', async () => {
    render(<Evaluation />);

    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText("Next questions"));

    expect(screen.getByText('Submit')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Answer 3'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockPostQuestionResult).toHaveBeenCalledWith({ score: 1 }));
  });

  it('navigates to home when going back from the first question', () => {
    render(<Evaluation />);

    const prevBtn = screen.getByText('Go to Home');
    fireEvent.click(prevBtn);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });

  it('navigates to the final page when personality is loaded', async () => {
    useQuestion.mockReturnValue({
      isLoading: false,
      isPersonalityLoading: false,
      questions: mockQuestions,
      personality: mockPersonality,
      getAllQuestions: mockGetAllQuestions,
      postQuestionResult: mockPostQuestionResult,
    });

    render(<Evaluation />);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(ROUTES.FINAL));
  });
});