import type { Technology, Question } from '../types';

// ─── Question Imports ─────────────────────────────────────────────────────────

// Java
import javaBasics from './java/basics.json';
import javaOOP from './java/oop.json';
import javaCollections from './java/collections.json';
import javaExceptions from './java/exceptions.json';
import javaStreams from './java/streams.json';

// Selenium
import seleniumLocators from './selenium/locators.json';
import seleniumXpath from './selenium/xpath.json';
import seleniumWaits from './selenium/waits.json';
import seleniumPOM from './selenium/pom.json';
import seleniumTestNG from './selenium/testng.json';

// Python
import pythonBasics from './python/basics.json';
import pythonOOP from './python/oop.json';
import pythonCollections from './python/collections.json';
import pythonExceptions from './python/exceptions.json';

// Playwright
import playwrightLocators from './playwright/locators.json';
import playwrightAssertions from './playwright/assertions.json';
import playwrightFixtures from './playwright/fixtures.json';
import playwrightAPI from './playwright/api-testing.json';

// ─── Helper ───────────────────────────────────────────────────────────────────

function difficultyMix(questions: { difficulty: string }[]) {
  return {
    easy: questions.filter(q => q.difficulty === 'Easy').length,
    medium: questions.filter(q => q.difficulty === 'Medium').length,
    hard: questions.filter(q => q.difficulty === 'Hard').length,
  };
}

// ─── Technology Registry ──────────────────────────────────────────────────────

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'java',
    name: 'Java',
    description: 'Master Java fundamentals, OOP, Collections, Streams & more for SDET interviews.',
    icon: '☕',
    color: 'from-orange-500 to-amber-600',
    accentColor: '#f97316',
    topics: [
      {
        id: 'basics',
        name: 'Basics',
        description: 'Core Java syntax, data types, operators, and JVM fundamentals.',
        icon: '📌',
        questionCount: javaBasics.length,
        estimatedMinutes: Math.ceil(javaBasics.length * 0.8),
        difficulties: difficultyMix(javaBasics),
      },
      {
        id: 'oop',
        name: 'OOP',
        description: 'Object-Oriented Programming: inheritance, polymorphism, encapsulation, abstraction.',
        icon: '🧬',
        questionCount: javaOOP.length,
        estimatedMinutes: Math.ceil(javaOOP.length * 0.8),
        difficulties: difficultyMix(javaOOP),
      },
      {
        id: 'collections',
        name: 'Collections',
        description: 'ArrayList, HashMap, HashSet, TreeMap, Queue and Collections framework.',
        icon: '📦',
        questionCount: javaCollections.length,
        estimatedMinutes: Math.ceil(javaCollections.length * 0.8),
        difficulties: difficultyMix(javaCollections),
      },
      {
        id: 'exceptions',
        name: 'Exceptions',
        description: 'Exception hierarchy, checked vs unchecked, try-with-resources, multi-catch.',
        icon: '⚠️',
        questionCount: javaExceptions.length,
        estimatedMinutes: Math.ceil(javaExceptions.length * 0.8),
        difficulties: difficultyMix(javaExceptions),
      },
      {
        id: 'streams',
        name: 'Streams',
        description: 'Java 8 Streams API: filter, map, reduce, collectors, parallel streams.',
        icon: '🌊',
        questionCount: javaStreams.length,
        estimatedMinutes: Math.ceil(javaStreams.length * 0.8),
        difficulties: difficultyMix(javaStreams),
      },
    ],
  },
  {
    id: 'selenium',
    name: 'Selenium',
    description: 'Deep dive into Selenium WebDriver, locators, waits, POM, and TestNG.',
    icon: '🔬',
    color: 'from-green-500 to-emerald-600',
    accentColor: '#22c55e',
    topics: [
      {
        id: 'locators',
        name: 'Locators',
        description: 'By.id, By.name, By.cssSelector, By.xpath, and locator strategies.',
        icon: '🎯',
        questionCount: seleniumLocators.length,
        estimatedMinutes: Math.ceil(seleniumLocators.length * 0.8),
        difficulties: difficultyMix(seleniumLocators),
      },
      {
        id: 'xpath',
        name: 'XPath',
        description: 'Absolute vs relative XPath, axes, predicates, functions, and operators.',
        icon: '🗺️',
        questionCount: seleniumXpath.length,
        estimatedMinutes: Math.ceil(seleniumXpath.length * 0.8),
        difficulties: difficultyMix(seleniumXpath),
      },
      {
        id: 'waits',
        name: 'Waits',
        description: 'Implicit, explicit, fluent waits and ExpectedConditions best practices.',
        icon: '⏱️',
        questionCount: seleniumWaits.length,
        estimatedMinutes: Math.ceil(seleniumWaits.length * 0.8),
        difficulties: difficultyMix(seleniumWaits),
      },
      {
        id: 'pom',
        name: 'POM',
        description: 'Page Object Model design pattern, PageFactory, Base Page architecture.',
        icon: '🏗️',
        questionCount: seleniumPOM.length,
        estimatedMinutes: Math.ceil(seleniumPOM.length * 0.8),
        difficulties: difficultyMix(seleniumPOM),
      },
      {
        id: 'testng',
        name: 'TestNG',
        description: 'TestNG annotations, DataProvider, listeners, parallel execution, soft assertions.',
        icon: '🧪',
        questionCount: seleniumTestNG.length,
        estimatedMinutes: Math.ceil(seleniumTestNG.length * 0.8),
        difficulties: difficultyMix(seleniumTestNG),
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Python essentials for automation testers: syntax, OOP, collections & exceptions.',
    icon: '🐍',
    color: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    topics: [
      {
        id: 'basics',
        name: 'Basics',
        description: 'Python syntax, data types, operators, list comprehensions, and builtins.',
        icon: '📌',
        questionCount: pythonBasics.length,
        estimatedMinutes: Math.ceil(pythonBasics.length * 0.8),
        difficulties: difficultyMix(pythonBasics),
      },
      {
        id: 'oop',
        name: 'OOP',
        description: 'Classes, __init__, self, inheritance, super(), decorators, MRO.',
        icon: '🧬',
        questionCount: pythonOOP.length,
        estimatedMinutes: Math.ceil(pythonOOP.length * 0.8),
        difficulties: difficultyMix(pythonOOP),
      },
      {
        id: 'collections',
        name: 'Collections',
        description: 'Lists, tuples, sets, dicts, defaultdict, Counter, and slicing.',
        icon: '📦',
        questionCount: pythonCollections.length,
        estimatedMinutes: Math.ceil(pythonCollections.length * 0.8),
        difficulties: difficultyMix(pythonCollections),
      },
      {
        id: 'exceptions',
        name: 'Exceptions',
        description: 'try/except/else/finally, custom exceptions, chaining, and multi-catch.',
        icon: '⚠️',
        questionCount: pythonExceptions.length,
        estimatedMinutes: Math.ceil(pythonExceptions.length * 0.8),
        difficulties: difficultyMix(pythonExceptions),
      },
    ],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Modern E2E testing with Playwright: locators, assertions, fixtures & API testing.',
    icon: '🎭',
    color: 'from-violet-500 to-purple-600',
    accentColor: '#8b5cf6',
    topics: [
      {
        id: 'locators',
        name: 'Locators',
        description: 'getByRole, getByLabel, getByText, chaining, filter, and nth.',
        icon: '🎯',
        questionCount: playwrightLocators.length,
        estimatedMinutes: Math.ceil(playwrightLocators.length * 0.8),
        difficulties: difficultyMix(playwrightLocators),
      },
      {
        id: 'assertions',
        name: 'Assertions',
        description: 'expect(), toHaveText, toBeVisible, toHaveURL, soft assertions.',
        icon: '✅',
        questionCount: playwrightAssertions.length,
        estimatedMinutes: Math.ceil(playwrightAssertions.length * 0.8),
        difficulties: difficultyMix(playwrightAssertions),
      },
      {
        id: 'fixtures',
        name: 'Fixtures',
        description: 'Built-in and custom fixtures, scope, teardown, and dependency injection.',
        icon: '🔧',
        questionCount: playwrightFixtures.length,
        estimatedMinutes: Math.ceil(playwrightFixtures.length * 0.8),
        difficulties: difficultyMix(playwrightFixtures),
      },
      {
        id: 'api-testing',
        name: 'API Testing',
        description: 'APIRequestContext, GET/POST, route interception, and mock responses.',
        icon: '🔌',
        questionCount: playwrightAPI.length,
        estimatedMinutes: Math.ceil(playwrightAPI.length * 0.8),
        difficulties: difficultyMix(playwrightAPI),
      },
    ],
  },
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

export function getTechnology(techId: string): Technology | undefined {
  return TECHNOLOGIES.find(t => t.id === techId);
}

export function getTopic(techId: string, topicId: string) {
  return getTechnology(techId)?.topics.find(t => t.id === topicId);
}

// ─── Question Loader ──────────────────────────────────────────────────────────

const questionMap: Record<string, Record<string, Question[]>> = {
  java: {
    basics: javaBasics as unknown as Question[],
    oop: javaOOP as unknown as Question[],
    collections: javaCollections as unknown as Question[],
    exceptions: javaExceptions as unknown as Question[],
    streams: javaStreams as unknown as Question[],
  },
  selenium: {
    locators: seleniumLocators as unknown as Question[],
    xpath: seleniumXpath as unknown as Question[],
    waits: seleniumWaits as unknown as Question[],
    pom: seleniumPOM as unknown as Question[],
    testng: seleniumTestNG as unknown as Question[],
  },
  python: {
    basics: pythonBasics as unknown as Question[],
    oop: pythonOOP as unknown as Question[],
    collections: pythonCollections as unknown as Question[],
    exceptions: pythonExceptions as unknown as Question[],
  },
  playwright: {
    locators: playwrightLocators as unknown as Question[],
    assertions: playwrightAssertions as unknown as Question[],
    fixtures: playwrightFixtures as unknown as Question[],
    'api-testing': playwrightAPI as unknown as Question[],
  },
};

export function getQuestions(techId: string, topicId: string): Question[] {
  return (questionMap[techId]?.[topicId] ?? []) as Question[];
}
