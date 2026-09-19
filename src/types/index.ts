// EduNexus Core Type Definitions

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  degree: string;
  year: string;
  university: string;
  primaryGoal: string;
  targetRole: string;
  streakDays: number;
  totalStudyHours: number;
  coursesEnrolled: number;
  quizzesTaken: number;
  overallMastery: number;
  dailyGoalMinutes: number;
  preferredStudyTime: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  difficultyPreference: 'Adaptive' | 'Challenging' | 'Fundamentals First';
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  type: 'video' | 'interactive' | 'reading';
  summary: string;
  videoUrl?: string;
  transcript?: string;
  keyConcepts: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  category: string;
  color: string;
  progressPercent: number;
  totalLessons: number;
  completedLessons: number;
  currentTopic: string;
  currentLessonId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeRemaining: string;
  lastStudied: string;
  isSaved?: boolean;
  lessons: Lesson[];
  notes: string[];
  description: string;
}

export interface KnowledgeNode {
  id: string;
  courseId: string;
  label: string;
  category: string;
  mastery: number; // 0-100
  status: 'mastered' | 'learning' | 'needs-practice' | 'weak';
  prerequisites: string[];
  relatedConcepts: string[];
  commonMisconception?: string;
  recommendedAction?: string;
  x?: number;
  y?: number;
  radius?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  concept?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  breakdown?: {
    concept: string;
    example: string;
    commonMistake: string;
    quickCheck: string;
  };
  reactions?: {
    liked?: boolean;
    disliked?: boolean;
    savedToNotes?: boolean;
  };
}

export interface TutorSession {
  id: string;
  topic: string;
  courseId: string;
  courseName: string;
  lastActive: string;
  messages: AIMessage[];
}

export interface StudySession {
  id: string;
  title: string;
  subject: string;
  courseId?: string;
  timeSlot: string; // e.g. "09:00 - 10:00"
  durationMinutes: number;
  date: string; // YYYY-MM-DD
  type: 'lecture' | 'practice' | 'quiz' | 'revision' | 'assignment';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  aiSuggested?: boolean;
  notes?: string;
}

export interface AdaptiveSuggestion {
  id: string;
  title: string;
  reason: string;
  actionType: 'reschedule' | 'add_revision' | 'lighten_load';
  payload?: any;
  status: 'pending' | 'accepted' | 'dismissed';
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  topic: string;
  questionCount: number;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
  lastScore?: number;
  completed?: boolean;
}

export interface QuizAttemptResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  accuracyPercent: number;
  timeSpentSeconds: number;
  timestamp: string;
  strongTopics: string[];
  weakTopics: string[];
  aiMisconceptionAnalysis: string;
  recommendedRevisionTopic: string;
}

export interface RecommendedItem {
  id: string;
  title: string;
  category: string;
  reason: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  rating: number;
  linkRoute: string;
  courseId?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  readinessPercent: number;
  strongSkills: string[];
  needsImprovement: string[];
  recommendedRoadmap: string[];
  portfolioProjects: {
    title: string;
    description: string;
    skillsCovered: string[];
  }[];
  avgSalaryRange: string;
  industryDemand: 'Very High' | 'High' | 'Moderate';
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Article' | 'Notes' | 'Assignment';
  subject: string;
  topic: string;
  durationOrPages: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isSaved: boolean;
  fileSize?: string;
  summary: string;
  downloadUrl?: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  userHasUpvoted?: boolean;
  repliesCount: number;
  timestamp: string;
  replies: {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    upvotes: number;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'quiz' | 'tutor' | 'plan' | 'streak' | 'course' | 'achievement';
  read: boolean;
  actionRoute?: string;
}
