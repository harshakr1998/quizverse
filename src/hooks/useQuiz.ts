import { useState, useCallback, useMemo } from 'react';
import type { Question, ShuffledQuestion, QuizState, QuizResult, ReviewItem, UserAnswer } from '../types';

import { shuffle } from '../utils/shuffle';
import { calculateResult } from '../utils/scoring';

const TIME_LIMIT = 600; // 10 minutes in seconds

function shuffleQuestion(q: Question): ShuffledQuestion {
  const indices = [0, 1, 2, 3].slice(0, q.options.length);
  const shuffledIndices = shuffle(indices);
  const shuffledOptions = shuffledIndices.map(i => q.options[i]);
  const correctShuffledIndex = shuffledIndices.indexOf(q.correctAnswer);
  return { ...q, shuffledOptions, correctShuffledIndex };
}

export function useQuiz() {
  const [state, setState] = useState<QuizState | null>(null);

  // ── Initialize ──────────────────────────────────────────────────────────────
  const startQuiz = useCallback((technology: string, topic: string, questions: Question[]) => {
    const shuffledQuestions = shuffle(questions).map(shuffleQuestion);
    setState({
      technology,
      topic,
      questions: shuffledQuestions,
      currentIndex: 0,
      answers: shuffledQuestions.map((_, i) => ({ questionIndex: i, selectedOption: null })),
      status: 'active',
      startTime: Date.now(),
      endTime: null,
      timeLimit: TIME_LIMIT,
    });
  }, []);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goToQuestion = useCallback((index: number) => {
    setState(prev => {
      if (!prev) return prev;
      if (index < 0 || index >= prev.questions.length) return prev;
      return { ...prev, currentIndex: index };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      return { ...prev, currentIndex: Math.min(prev.currentIndex + 1, prev.questions.length - 1) };
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      return { ...prev, currentIndex: Math.max(prev.currentIndex - 1, 0) };
    });
  }, []);

  // ── Answer Selection ────────────────────────────────────────────────────────
  const selectAnswer = useCallback((optionIndex: number) => {
    setState(prev => {
      if (!prev || prev.status !== 'active') return prev;
      const answers = prev.answers.map((a, i) =>
        i === prev.currentIndex ? { ...a, selectedOption: optionIndex } : a
      );
      return { ...prev, answers };
    });
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const submitQuiz = useCallback(() => {
    setState(prev => {
      if (!prev || prev.status === 'submitted') return prev;
      return { ...prev, status: 'submitted', endTime: Date.now() };
    });
  }, []);

  // ── Computed ────────────────────────────────────────────────────────────────
  const currentQuestion = state ? state.questions[state.currentIndex] : null;
  const currentAnswer = state ? state.answers[state.currentIndex] : null;

  const answeredCount = useMemo(() => {
    if (!state) return 0;
    return state.answers.filter(a => a.selectedOption !== null).length;
  }, [state?.answers]);

  const result: QuizResult | null = useMemo(() => {
    if (!state || state.status !== 'submitted') return null;
    let correct = 0, incorrect = 0;
    state.answers.forEach((ans, i) => {
      if (ans.selectedOption === null) return;
      if (ans.selectedOption === state.questions[i].correctShuffledIndex) correct++;
      else incorrect++;
    });
    const timeTaken = state.endTime ? Math.floor((state.endTime - state.startTime) / 1000) : state.timeLimit;
    return calculateResult(state.questions.length, correct, incorrect, timeTaken, state.technology, state.topic);
  }, [state?.status]);

  const reviewItems: ReviewItem[] = useMemo(() => {
    if (!state || state.status !== 'submitted') return [];
    return state.questions.map((q, i) => {
      const userAnswer = state.answers[i].selectedOption;
      return {
        question: q,
        userAnswer,
        isCorrect: userAnswer === q.correctShuffledIndex,
      };
    });
  }, [state?.status]);

  const getAnswerForQuestion = useCallback((index: number): UserAnswer | null => {
    return state?.answers[index] ?? null;
  }, [state?.answers]);

  return {
    state,
    startQuiz,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    selectAnswer,
    submitQuiz,
    currentQuestion,
    currentAnswer,
    answeredCount,
    result,
    reviewItems,
    getAnswerForQuestion,
  };
}
