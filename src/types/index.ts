import { ElementType } from 'react';

// ─── Question & Quiz Types ───────────────────────────────────────────────────

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  tags: string[];
}

// Shuffled question preserves original correctAnswer index after shuffle
export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  correctShuffledIndex: number;
}

// ─── Topic & Technology Types ────────────────────────────────────────────────

export interface Topic {
  id: string;         // e.g. "collections"
  name: string;       // e.g. "Collections"
  description: string;
  icon: ElementType;
  questionCount: number;
  estimatedMinutes: number;
  difficulties: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface Technology {
  id: string;         // e.g. "java"
  name: string;       // e.g. "Java"
  description: string;
  icon: ElementType;
  color: string;      // gradient class or hex
  accentColor: string;
  topics: Topic[];
}

// ─── Quiz State ───────────────────────────────────────────────────────────────

export type QuizStatus = 'idle' | 'active' | 'submitted';

export interface UserAnswer {
  questionIndex: number;
  selectedOption: number | null; // index into shuffledOptions
}

export interface QuizState {
  technology: string;
  topic: string;
  questions: ShuffledQuestion[];
  currentIndex: number;
  answers: UserAnswer[];
  status: QuizStatus;
  startTime: number;
  endTime: number | null;
  timeLimit: number; // seconds
}

// ─── Result Types ─────────────────────────────────────────────────────────────

export type Grade = 'Excellent' | 'Great' | 'Good' | 'Needs Practice';

export interface QuizResult {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
  grade: Grade;
  timeTaken: number; // seconds
  technology: string;
  topic: string;
}

// ─── Review Item ──────────────────────────────────────────────────────────────

export interface ReviewItem {
  question: ShuffledQuestion;
  userAnswer: number | null;
  isCorrect: boolean;
}
