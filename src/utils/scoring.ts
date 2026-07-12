import type { Grade, QuizResult } from '../types';

export function calculateResult(
  total: number,
  correct: number,
  incorrect: number,
  timeTaken: number,
  technology: string,
  topic: string
): QuizResult {
  const unanswered = total - correct - incorrect;
  const percentage = Math.round((correct / total) * 100);
  const grade = getGrade(percentage);
  return { totalQuestions: total, correct, incorrect, unanswered, percentage, grade, timeTaken, technology, topic };
}

export function getGrade(percentage: number): Grade {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 75) return 'Great';
  if (percentage >= 60) return 'Good';
  return 'Needs Practice';
}

export const GRADE_COLORS: Record<Grade, string> = {
  Excellent: '#22c55e',
  Great: '#06b6d4',
  Good: '#f59e0b',
  'Needs Practice': '#ef4444',
};

export const GRADE_MESSAGES: Record<Grade, string> = {
  Excellent: '🏆 Outstanding! You\'re interview-ready!',
  Great: '🎯 Great job! Almost there!',
  Good: '👍 Good effort! Keep practicing!',
  'Needs Practice': '💪 Keep going! Practice makes perfect!',
};
