import { Quiz, QuizQuestion, QuizAttemptResult } from '../types';
import { GoogleGenAI } from '@google/genai';

export interface GenerateQuizParams {
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  questionType: 'All' | 'MCQ' | 'True/False' | 'Short Answer';
  weakAreas?: string[];
}

// ─── Topic-aware question bank (local fallback) ────────────────────────────
const LOCAL_QUESTION_BANK: Record<string, QuizQuestion[]> = {
  normalization: [
    {
      id: 'local-norm-1', type: 'mcq',
      question: 'Which normal form eliminates partial functional dependencies on candidate keys?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctAnswer: '2NF',
      explanation: '2NF requires that every non-prime attribute be fully functionally dependent on each candidate key.',
      topic: '2NF', difficulty: 'Medium'
    },
    {
      id: 'local-norm-2', type: 'mcq',
      question: 'A table has attributes (EmpID, DeptID, DeptHead). EmpID → DeptID and DeptID → DeptHead. What normal form violation exists?',
      options: ['1NF violation (non-atomic values)', '2NF violation (partial dependency)', '3NF violation (transitive dependency)', 'BCNF violation (non-superkey determinant)'],
      correctAnswer: '3NF violation (transitive dependency)',
      explanation: 'DeptHead is transitively dependent on EmpID through DeptID. This violates 3NF because DeptID is not a candidate key.',
      topic: '3NF', difficulty: 'Hard'
    },
    {
      id: 'local-norm-3', type: 'true_false',
      question: 'True or False: A relation with a single-attribute primary key is automatically in 2NF if it is in 1NF.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'True. Partial dependency requires a composite candidate key. A single-attribute key has no proper subsets, so no partial dependencies can exist.',
      topic: '2NF', difficulty: 'Medium'
    },
    {
      id: 'local-norm-4', type: 'mcq',
      question: 'Which of the following is the correct condition for BCNF?',
      options: [
        'For every FD X → Y, X must be a superkey',
        'Every non-prime attribute depends on the whole key',
        'No non-prime attribute depends on another non-prime attribute',
        'All attributes must be atomic'
      ],
      correctAnswer: 'For every FD X → Y, X must be a superkey',
      explanation: 'BCNF (Boyce-Codd Normal Form) requires that for every non-trivial functional dependency X → Y, X must be a superkey.',
      topic: 'BCNF', difficulty: 'Hard'
    },
    {
      id: 'local-norm-5', type: 'mcq',
      question: 'Given R(A, B, C, D) with FDs: {AB → C, C → D, D → A}. Which is a candidate key?',
      options: ['A', 'AB', 'BC', 'CD'],
      correctAnswer: 'BC',
      explanation: 'BC+ = {B, C, D, A} which covers all attributes. B and C individually do not cover all attributes, so BC is the minimal candidate key.',
      topic: 'Candidate Keys', difficulty: 'Hard'
    }
  ],
  'computer networks': [
    {
      id: 'local-cn-1', type: 'mcq',
      question: 'Which layer of the OSI model is responsible for logical addressing (IP addresses)?',
      options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
      correctAnswer: 'Network Layer',
      explanation: 'The Network Layer (Layer 3) handles logical addressing using IP addresses and is responsible for routing packets across networks.',
      topic: 'OSI Model', difficulty: 'Easy'
    },
    {
      id: 'local-cn-2', type: 'true_false',
      question: 'True or False: TCP guarantees in-order delivery of packets, while UDP does not.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'True. TCP uses sequence numbers to ensure packets are delivered in order and retransmits lost packets. UDP has no such guarantee.',
      topic: 'TCP vs UDP', difficulty: 'Easy'
    },
    {
      id: 'local-cn-3', type: 'mcq',
      question: 'Which routing algorithm does OSPF use to compute shortest paths?',
      options: ["Bellman-Ford", "Dijkstra's Algorithm", "Floyd-Warshall", "Prim's Algorithm"],
      correctAnswer: "Dijkstra's Algorithm",
      explanation: 'OSPF (Open Shortest Path First) is a link-state routing protocol that uses Dijkstra\'s algorithm to compute shortest paths from a complete network topology map.',
      topic: 'Routing Algorithms', difficulty: 'Medium'
    },
    {
      id: 'local-cn-4', type: 'mcq',
      question: 'In a TCP 3-way handshake, what is the correct sequence of messages?',
      options: ['ACK → SYN → SYN-ACK', 'SYN → SYN-ACK → ACK', 'SYN-ACK → SYN → ACK', 'ACK → SYN-ACK → SYN'],
      correctAnswer: 'SYN → SYN-ACK → ACK',
      explanation: 'The client sends SYN to initiate. Server responds with SYN-ACK. Client acknowledges with ACK. This 3-way handshake establishes a TCP connection.',
      topic: 'TCP Handshake', difficulty: 'Medium'
    }
  ],
  python: [
    {
      id: 'local-py-1', type: 'mcq',
      question: 'What is the output of: print(type(lambda x: x+1))?',
      options: ['<class "function">', '<class "lambda">', '<class "method">', '<class "type">'],
      correctAnswer: '<class "function">',
      explanation: 'Lambda expressions create anonymous function objects. Their type is just "function", same as functions defined with def.',
      topic: 'Lambda Functions', difficulty: 'Medium'
    },
    {
      id: 'local-py-2', type: 'true_false',
      question: 'True or False: In Python, lists are mutable but tuples are immutable.',
      options: ['True', 'False'],
      correctAnswer: true,
      explanation: 'True. Lists use square brackets [] and can be modified. Tuples use parentheses () and cannot be changed after creation.',
      topic: 'Data Structures', difficulty: 'Easy'
    },
    {
      id: 'local-py-3', type: 'mcq',
      question: 'What does the "self" parameter represent in Python class methods?',
      options: ['A keyword required by Python', 'A reference to the current instance of the class', 'A reference to the class itself', 'A built-in function'],
      correctAnswer: 'A reference to the current instance of the class',
      explanation: '"self" refers to the instance that called the method, allowing you to access and modify instance attributes within the class.',
      topic: 'OOP', difficulty: 'Medium'
    }
  ],
  'data structures': [
    {
      id: 'local-dsa-1', type: 'mcq',
      question: 'What is the time complexity of searching in a balanced Binary Search Tree?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 'O(log n)',
      explanation: 'In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) search complexity.',
      topic: 'BST', difficulty: 'Medium'
    },
    {
      id: 'local-dsa-2', type: 'true_false',
      question: 'True or False: A stack follows FIFO (First In, First Out) ordering.',
      options: ['True', 'False'],
      correctAnswer: false,
      explanation: 'False. A stack follows LIFO (Last In, First Out). A queue follows FIFO.',
      topic: 'Stack vs Queue', difficulty: 'Easy'
    }
  ]
};

/** Find local questions matching the topic */
const getLocalQuestions = (topic: string, count: number): QuizQuestion[] => {
  const lowerTopic = topic.toLowerCase();
  let matches: QuizQuestion[] = [];

  for (const [key, questions] of Object.entries(LOCAL_QUESTION_BANK)) {
    if (lowerTopic.includes(key) || key.includes(lowerTopic.split(' ')[0])) {
      matches = [...matches, ...questions];
    }
  }

  // If no match, mix from all banks
  if (matches.length === 0) {
    matches = Object.values(LOCAL_QUESTION_BANK).flat();
  }

  // Re-ID and shuffle
  const shuffled = [...matches].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, i) => ({ ...q, id: `q-${Date.now()}-${i}` }));
};

/** Try to generate questions via Gemini AI */
const generateQuestionsWithAI = async (params: GenerateQuizParams): Promise<QuizQuestion[] | null> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_google_gemini_api_key_here' || apiKey.trim() === '') {
    return null;
  }

  const prompt = `Generate exactly ${params.questionCount} quiz questions about "${params.topic}" in "${params.subject}" at ${params.difficulty} difficulty level.

${params.weakAreas?.length ? `Focus on these weak areas: ${params.weakAreas.join(', ')}` : ''}

CRITICAL: Return ONLY valid JSON array in this exact format, no other text:
[
  {
    "question": "Question text here",
    "type": "mcq",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Why Option A is correct",
    "topic": "Sub-topic name",
    "difficulty": "Medium"
  }
]

Rules:
- Type can be "mcq" or "true_false"
- For true_false: options=["True","False"], correctAnswer must be boolean true or false (not string)
- Mix difficulty: ~30% Easy, 50% Medium, 20% Hard
- Each question must test a distinct concept
- Explanations must be educational and clear
- ${params.questionCount} questions total, no more, no less`;

  try {
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const rawText = response.text || '';
    // Extract JSON array from response
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return null;

    return parsed.slice(0, params.questionCount).map((q: any, i: number) => ({
      id: `q-ai-${Date.now()}-${i}`,
      type: q.type || 'mcq',
      question: q.question,
      options: q.options || ['True', 'False'],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || 'See course notes for details.',
      topic: q.topic || params.topic,
      difficulty: q.difficulty || 'Medium'
    }));
  } catch (e) {
    console.warn('[EduNexus] AI quiz generation failed, using local bank:', e);
    return null;
  }
};

export const generateQuizByTopic = async (params: GenerateQuizParams): Promise<Quiz> => {
  const { subject, topic, difficulty, questionCount } = params;
  const quizId = `quiz-gen-${Date.now()}`;

  // Try AI generation first, fall back to local bank
  let questions = await generateQuestionsWithAI(params);
  if (!questions || questions.length < questionCount) {
    questions = getLocalQuestions(topic, questionCount);
  }

  return {
    id: quizId,
    title: `${topic} — ${difficulty} Practice Quiz`,
    subject,
    topic,
    questionCount: questions.length,
    estimatedMinutes: Math.max(3, Math.round(questions.length * 1.8)),
    difficulty,
    questions
  };
};

// ─── Quiz Performance Analysis ────────────────────────────────────────────────
export const analyzeQuizPerformance = (
  quiz: Quiz,
  answers: Record<string, string | boolean>,
  timeSpentSeconds: number
): QuizAttemptResult => {
  let score = 0;
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];
  const topicScores: Record<string, { correct: number; total: number }> = {};

  quiz.questions.forEach((q) => {
    const userAnswer = answers[q.id];
    let isCorrect = false;

    if (typeof q.correctAnswer === 'boolean') {
      // For true/false, user answer might be string "True"/"False" or actual boolean
      if (typeof userAnswer === 'boolean') {
        isCorrect = userAnswer === q.correctAnswer;
      } else {
        isCorrect = String(userAnswer).toLowerCase() === String(q.correctAnswer).toLowerCase();
      }
    } else {
      isCorrect = String(userAnswer || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    }

    // Track per-topic scores
    if (!topicScores[q.topic]) topicScores[q.topic] = { correct: 0, total: 0 };
    topicScores[q.topic].total++;
    if (isCorrect) {
      score++;
      topicScores[q.topic].correct++;
    }
  });

  // Categorize topics into strong/weak based on topic accuracy
  Object.entries(topicScores).forEach(([topic, { correct, total }]) => {
    const accuracy = correct / total;
    if (accuracy >= 0.7) {
      if (!strongTopics.includes(topic)) strongTopics.push(topic);
    } else {
      if (!weakTopics.includes(topic)) weakTopics.push(topic);
    }
  });

  const totalQuestions = quiz.questions.length;
  const accuracyPercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Formulate dynamic, evidence-based misconception analysis
  let misconceptionAnalysis = '';
  let recommendedTopic = '';

  const weakTopicList = weakTopics.slice(0, 3).join(', ');
  const strongTopicList = strongTopics.slice(0, 2).join(', ');

  if (accuracyPercent >= 85) {
    misconceptionAnalysis = `Excellent performance! You demonstrated strong mastery of ${strongTopicList || quiz.topic}. You are ready to advance to more complex variations and edge cases. Consider attempting BCNF decomposition or advanced query optimization challenges.`;
    recommendedTopic = `Advanced ${quiz.topic} — Edge Cases & Optimization`;
  } else if (accuracyPercent >= 65) {
    misconceptionAnalysis = `Good foundational understanding of ${quiz.topic}. ${weakTopicList ? `Specific gaps detected in: ${weakTopicList}. ` : ''}Focus on the distinction between concepts — common source of exam errors. Review the relevant theory definitions with examples.`;
    recommendedTopic = weakTopics.length > 0 ? `Targeted Revision: ${weakTopics[0]}` : `${quiz.topic} — Concept Clarification`;
  } else if (accuracyPercent >= 40) {
    misconceptionAnalysis = `Partial understanding detected for ${quiz.topic}. ${weakTopicList ? `Critical gaps: ${weakTopicList}. ` : ''}Review the formal definitions and work through 3-4 practical examples before retaking this assessment.`;
    recommendedTopic = `${quiz.topic} — Fundamental Review`;
  } else {
    misconceptionAnalysis = `EduNexus detected significant gaps in ${quiz.topic} fundamentals. Recommend starting from prerequisite concepts, reviewing lecture notes, and working through examples step-by-step with the AI Tutor before attempting another assessment.`;
    recommendedTopic = `${quiz.topic} — Prerequisites & Foundations`;
  }

  return {
    quizId: quiz.id,
    quizTitle: quiz.title,
    score,
    totalQuestions,
    accuracyPercent,
    timeSpentSeconds,
    timestamp: new Date().toISOString(),
    strongTopics: strongTopics.length > 0 ? strongTopics : ['Basic Concepts'],
    weakTopics: weakTopics.length > 0 ? weakTopics : [],
    aiMisconceptionAnalysis: misconceptionAnalysis,
    recommendedRevisionTopic: recommendedTopic
  };
};
