import { Quiz, QuizQuestion, QuizAttemptResult } from '../types';

export interface GenerateQuizParams {
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  questionType: 'All' | 'MCQ' | 'True/False' | 'Short Answer';
}

export const generateQuizByTopic = (params: GenerateQuizParams): Quiz => {
  const { subject, topic, difficulty, questionCount } = params;
  const quizId = `quiz-gen-${Date.now()}`;

  const generatedQuestions: QuizQuestion[] = [];
  const questionDifficulty: 'Easy' | 'Medium' | 'Hard' =
    difficulty === 'Beginner' ? 'Easy' : difficulty === 'Advanced' ? 'Hard' : 'Medium';

  for (let i = 1; i <= questionCount; i++) {
    if (i === 1) {
      generatedQuestions.push({
        id: `q-${quizId}-${i}`,
        type: 'mcq',
        question: `In ${topic}, which condition is fundamental to satisfying Second Normal Form (2NF)?`,
        options: [
          'No non-prime attribute is partially dependent on any candidate key',
          'All columns contain delimited strings',
          'Every attribute must be a foreign key',
          'Tables must have at least three indexes'
        ],
        correctAnswer: 'No non-prime attribute is partially dependent on any candidate key',
        explanation: '2NF prevents partial dependencies on composite candidate keys.',
        topic: `${topic} - 2NF`,
        difficulty: questionDifficulty
      });
    } else if (i === 2) {
      generatedQuestions.push({
        id: `q-${quizId}-${i}`,
        type: 'true_false',
        question: `True or False: In ${topic}, a transitive dependency occurs when non-key attribute A determines non-key attribute B in a relation.`,
        options: ['True', 'False'],
        correctAnswer: true,
        explanation: 'True: Transitive dependency exists when non-prime attributes determine other non-prime attributes, which violates 3NF.',
        topic: `${topic} - Transitive`,
        difficulty: questionDifficulty
      });
    } else if (i === 3) {
      generatedQuestions.push({
        id: `q-${quizId}-${i}`,
        type: 'mcq',
        question: `Which normal form is strictly stronger than 3NF and requires that for every functional dependency X -> Y, X must be a superkey?`,
        options: ['1NF', '2NF', 'Boyce-Codd Normal Form (BCNF)', '4NF'],
        correctAnswer: 'Boyce-Codd Normal Form (BCNF)',
        explanation: 'BCNF enforces that every determinant X must be a superkey.',
        topic: `${topic} - BCNF`,
        difficulty: questionDifficulty
      });
    } else {
      generatedQuestions.push({
        id: `q-${quizId}-${i}`,
        type: 'mcq',
        question: `Given relation R with attributes (EmpID, ProjectID, HoursWorked, EmpName), what is the partial dependency present?`,
        options: [
          'EmpID -> EmpName',
          'ProjectID -> HoursWorked',
          '(EmpID, ProjectID) -> EmpName',
          'HoursWorked -> EmpID'
        ],
        correctAnswer: 'EmpID -> EmpName',
        explanation: 'EmpName depends solely on EmpID, which is only a part of the composite primary key (EmpID, ProjectID).',
        topic: `${topic} - Partial Dependency`,
        difficulty: questionDifficulty
      });
    }
  }

  return {
    id: quizId,
    title: `AI Generated Quiz: ${topic} (${difficulty})`,
    subject,
    topic,
    questionCount,
    estimatedMinutes: Math.max(3, Math.round(questionCount * 1.5)),
    difficulty,
    questions: generatedQuestions.slice(0, questionCount)
  };
};

export const analyzeQuizPerformance = (
  quiz: Quiz,
  answers: Record<string, string | boolean>,
  timeSpentSeconds: number
): QuizAttemptResult => {
  let score = 0;
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];

  quiz.questions.forEach((q) => {
    const userAnswer = answers[q.id];
    let isCorrect = false;

    if (typeof q.correctAnswer === 'boolean') {
      isCorrect = userAnswer === q.correctAnswer;
    } else if (typeof q.correctAnswer === 'string') {
      isCorrect =
        String(userAnswer || '').trim().toLowerCase() ===
        q.correctAnswer.trim().toLowerCase();
    }

    if (isCorrect) {
      score++;
      if (!strongTopics.includes(q.topic)) strongTopics.push(q.topic);
    } else {
      if (!weakTopics.includes(q.topic)) weakTopics.push(q.topic);
    }
  });

  const totalQuestions = quiz.questions.length;
  const accuracyPercent = Math.round((score / totalQuestions) * 100);

  // Formulate dynamic AI misconception analysis
  let misconceptionAnalysis = '';
  let recommendedTopic = '';

  if (accuracyPercent >= 80) {
    misconceptionAnalysis =
      'Outstanding mastery! You have a solid grasp of core schema properties and functional constraints. Ready for advanced optimization and query scheduling.';
    recommendedTopic = 'Advanced Query Optimization & Indexing';
  } else if (accuracyPercent >= 50) {
    misconceptionAnalysis =
      'Good foundational understanding, but you are confusing 2NF partial dependencies with 3NF transitive dependencies. Remember: 2NF only applies when candidate keys are composite, whereas 3NF handles transitive dependencies between non-prime attributes.';
    recommendedTopic = '2NF vs 3NF Transitive Dependency Decomposition';
  } else {
    misconceptionAnalysis =
      'EduNexus detected critical gaps in understanding candidate keys and prime vs non-prime attributes. We recommend reviewing 1NF and Armstrong axioms before advancing to BCNF.';
    recommendedTopic = 'Relational Keys, Functional Dependencies & 1NF Foundations';
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
    weakTopics: weakTopics.length > 0 ? weakTopics : ['Edge cases'],
    aiMisconceptionAnalysis: misconceptionAnalysis,
    recommendedRevisionTopic: recommendedTopic
  };
};
