import { create } from 'zustand';
import {
  StudentProfile,
  Course,
  KnowledgeNode,
  KnowledgeEdge,
  StudySession,
  Quiz,
  QuizAttemptResult,
  CareerPath,
  ResourceItem,
  CommunityPost,
  NotificationItem,
  RecommendedItem,
  TutorSession,
  AdaptiveSuggestion,
  AIMessage
} from '../types';
import {
  initialStudentProfile,
  initialCourses,
  initialKnowledgeNodes,
  initialKnowledgeEdges,
  initialStudySessions,
  initialQuizzes,
  initialRecommendations,
  initialCareerPaths,
  initialResources,
  initialCommunityPosts,
  initialNotifications,
  initialTutorSessions
} from './initialData';

const LOCAL_STORAGE_KEY = 'edunexus_state_v1';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface EduNexusState {
  // Authentication & Profile
  isAuthenticated: boolean;
  studentProfile: StudentProfile;
  registerUser: (userData: {
    name: string;
    email: string;
    password?: string;
    university: string;
    degree: string;
    year: string;
    targetRole: string;
    primaryGoal: string;
    avatar?: string;
  }) => void;
  loginUser: (email: string, password?: string, name?: string) => boolean;
  loginDemoUser: (customName?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  toggleTheme: () => void;

  // Courses & Learning
  courses: Course[];
  activeCourseId: string | null;
  setActiveCourseId: (id: string | null) => void;
  addCustomCourse: (courseData: {
    title: string;
    code: string;
    instructor: string;
    category: string;
    description: string;
    color?: string;
  }) => void;
  updateLessonProgress: (courseId: string, lessonId: string, completed: boolean) => void;
  toggleSaveCourse: (courseId: string) => void;
  addCourseNote: (courseId: string, note: string) => void;

  // Knowledge Graph
  knowledgeNodes: KnowledgeNode[];
  knowledgeEdges: KnowledgeEdge[];
  selectedNodeId: string | null;
  selectNode: (nodeId: string | null) => void;
  updateNodeMastery: (nodeId: string, newMastery: number) => void;

  // Study Plan & Schedule
  studySessions: StudySession[];
  adaptiveSuggestions: AdaptiveSuggestion[];
  toggleSessionComplete: (sessionId: string) => void;
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  rescheduleSession: (sessionId: string, newDate: string, newTimeSlot: string) => void;
  deleteSession: (sessionId: string) => void;
  acceptAdaptiveSuggestion: (suggestionId: string) => void;
  dismissAdaptiveSuggestion: (suggestionId: string) => void;

  // Quizzes
  quizzes: Quiz[];
  quizAttempts: QuizAttemptResult[];
  recordQuizAttempt: (attempt: QuizAttemptResult) => void;
  addGeneratedQuiz: (quiz: Quiz) => void;

  // AI Tutor
  tutorSessions: TutorSession[];
  activeTutorSessionId: string;
  setActiveTutorSessionId: (sessionId: string) => void;
  addMessageToActiveSession: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  createNewTutorSession: (topic: string, courseId?: string, courseName?: string) => string;
  saveMessageToNotes: (messageId: string, content: string) => void;

  // Recommendations & Career
  recommendations: RecommendedItem[];
  careerPaths: CareerPath[];

  // Resources
  resources: ResourceItem[];
  toggleSaveResource: (resourceId: string) => void;
  addResource: (resource: Omit<ResourceItem, 'id'>) => void;

  // Community
  communityPosts: CommunityPost[];
  upvotePost: (postId: string) => void;
  addReplyToPost: (postId: string, content: string) => void;
  createPost: (title: string, content: string, tags: string[]) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timeAgo'>) => void;

  // Global Modals & Utilities
  isFocusModeOpen: boolean;
  isUploadModalOpen: boolean;
  isScannerModalOpen: boolean;
  isSearchModalOpen: boolean;
  toggleFocusMode: (open?: boolean) => void;
  toggleUploadModal: (open?: boolean) => void;
  toggleScannerModal: (open?: boolean) => void;
  toggleSearchModal: (open?: boolean) => void;

  // Toast notifications
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // State reset for demo testing
  resetDemoData: () => void;
}

// Helper to calculate node status from mastery percentage
const getStatusFromMastery = (mastery: number): KnowledgeNode['status'] => {
  if (mastery >= 80) return 'mastered';
  if (mastery >= 60) return 'learning';
  if (mastery >= 40) return 'needs-practice';
  return 'weak';
};

// Load saved state or default
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const isLegacyDemo = parsed.studentProfile?.name === 'Aarav Sharma';
      const cleanProfile = isLegacyDemo
        ? { ...initialStudentProfile }
        : {
            ...(parsed.studentProfile || initialStudentProfile),
            theme: parsed.hasExplicitThemeChoice ? parsed.studentProfile?.theme : 'light'
          };
      
      // Update HTML class immediately on load
      if (cleanProfile.theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      return {
        ...parsed,
        isAuthenticated: isLegacyDemo ? false : Boolean(parsed.isAuthenticated),
        studentProfile: cleanProfile,
        // Make sure modals & toasts start clean
        isFocusModeOpen: false,
        isUploadModalOpen: false,
        isScannerModalOpen: false,
        isSearchModalOpen: false,
        toasts: []
      };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
  }
  return {
    isAuthenticated: false,
    studentProfile: initialStudentProfile,
    courses: initialCourses,
    activeCourseId: 'course-dbms',
    knowledgeNodes: initialKnowledgeNodes,
    knowledgeEdges: initialKnowledgeEdges,
    selectedNodeId: 'node-dbms-norm',
    studySessions: initialStudySessions,
    adaptiveSuggestions: [
      {
        id: 'sugg-01',
        title: 'Heavier workload tomorrow detected',
        reason: 'You have 2 lectures and a project deadline tomorrow. EduNexus suggests moving SQL Practice to today.',
        actionType: 'reschedule',
        status: 'pending'
      }
    ],
    quizzes: initialQuizzes,
    quizAttempts: [],
    tutorSessions: initialTutorSessions,
    activeTutorSessionId: 'session-norm',
    recommendations: initialRecommendations,
    careerPaths: initialCareerPaths,
    resources: initialResources,
    communityPosts: initialCommunityPosts,
    notifications: initialNotifications,
    isFocusModeOpen: false,
    isUploadModalOpen: false,
    isScannerModalOpen: false,
    isSearchModalOpen: false,
    toasts: []
  };
};

export const useEduNexusStore = create<EduNexusState>((set, get) => {
  const initialState = loadInitialState();

  // Helper to persist whenever state changes
  const saveState = (updatedState: Partial<EduNexusState>) => {
    try {
      const current = get();
      const stateToPersist = {
        ...current,
        ...updatedState,
        // Exclude transient modal flags from permanent storage
        isFocusModeOpen: false,
        isUploadModalOpen: false,
        isScannerModalOpen: false,
        isSearchModalOpen: false,
        toasts: []
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }
  };

  return {
    ...initialState,

    registerUser: (userData) => {
      const newProfile: StudentProfile = {
        ...get().studentProfile,
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password || '',
        university: userData.university,
        degree: userData.degree,
        year: userData.year,
        targetRole: userData.targetRole,
        primaryGoal: userData.primaryGoal,
        avatar:
          userData.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        streakDays: 1,
        totalStudyHours: 2.5,
        quizzesTaken: 1,
        overallMastery: 54,
        theme: 'dark'
      };

      set({ isAuthenticated: true, studentProfile: newProfile });
      saveState({ isAuthenticated: true, studentProfile: newProfile });
      get().addToast({
        type: 'success',
        title: `Welcome to EduNexus, ${userData.name}!`,
        message: 'Your personal academic operating system has been initialized.'
      });
    },

    loginUser: (email, password, name) => {
      const current = get().studentProfile;
      const rawName = name?.trim() 
        ? name.trim() 
        : (current.name && current.name !== 'Aarav Sharma' && current.name !== 'Student' 
            ? current.name 
            : (email && email.includes('@') ? email.split('@')[0] : 'Student'));
      
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const updated: StudentProfile = {
        ...current,
        name: formattedName,
        email: email || current.email,
        theme: 'dark'
      };
      set({ isAuthenticated: true, studentProfile: updated });
      saveState({ isAuthenticated: true, studentProfile: updated });
      get().addToast({
        type: 'success',
        title: `Welcome back, ${updated.name}!`,
        message: 'EduNexus is ready to guide your learning.'
      });
      return true;
    },

    loginDemoUser: (customName) => {
      const studentName = customName?.trim() || 'Student Learner';
      const updated: StudentProfile = {
        ...get().studentProfile,
        name: studentName,
        theme: 'light'
      };
      // Immediately reflect on HTML document
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      set({ isAuthenticated: true, studentProfile: updated });
      saveState({ isAuthenticated: true, studentProfile: updated });
      get().addToast({
        type: 'success',
        title: `Welcome, ${studentName}!`,
        message: 'EduNexus student session initialized.'
      });
    },

    logout: () => {
      set({ isAuthenticated: false });
      saveState({ isAuthenticated: false });
      get().addToast({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been logged out of EduNexus successfully.'
      });
    },

    addCustomCourse: (courseData) => {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        code: courseData.code || 'CS' + Math.floor(100 + Math.random() * 800),
        title: courseData.title,
        instructor: courseData.instructor || 'Department Faculty',
        category: courseData.category || 'Core Subject',
        color: courseData.color || '#1677FF',
        progressPercent: 0,
        totalLessons: 6,
        completedLessons: 0,
        currentTopic: 'Introduction & Foundations',
        currentLessonId: `lesson-${Date.now()}-0`,
        difficulty: 'Intermediate',
        timeRemaining: '6h remaining',
        lastStudied: 'Just added',
        description: courseData.description || 'Custom course added to your personal learning workspace.',
        notes: [],
        lessons: [
          {
            id: `lesson-${Date.now()}-0`,
            title: `Module 1: Foundations of ${courseData.title}`,
            durationMinutes: 45,
            completed: false,
            type: 'video',
            summary: `Core principles and overview of ${courseData.title}.`,
            keyConcepts: [courseData.title, 'Fundamentals']
          }
        ]
      };

      const updated = [newCourse, ...get().courses];
      set({ courses: updated });
      saveState({ courses: updated });
      get().addToast({
        type: 'success',
        title: 'Course Added to Workspace',
        message: `${newCourse.title} (${newCourse.code}) is now active.`
      });
    },

    updateProfile: (updates) => {
      const updated = { ...get().studentProfile, ...updates };
      set({ studentProfile: updated });
      saveState({ studentProfile: updated });
      get().addToast({
        type: 'info',
        title: 'Profile Updated',
        message: 'Your learning goals and preferences were saved.'
      });
    },

    toggleTheme: () => {
      const current = get().studentProfile.theme;
      const nextTheme: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';
      const updatedProfile: StudentProfile = { ...get().studentProfile, theme: nextTheme };
      
      // Update HTML tag
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      set({ studentProfile: updatedProfile });
      saveState({ studentProfile: updatedProfile, hasExplicitThemeChoice: true } as any);
      get().addToast({
        type: 'info',
        title: `${nextTheme === 'light' ? 'Light' : 'Dark'} Theme Activated`,
        message: `Switched interface to ${nextTheme} mode.`
      });
    },

    setActiveCourseId: (id) => set({ activeCourseId: id }),

    updateLessonProgress: (courseId, lessonId, completed) => {
      const updatedCourses = get().courses.map(course => {
        if (course.id !== courseId) return course;
        const updatedLessons = course.lessons.map(lesson => {
          if (lesson.id === lessonId) return { ...lesson, completed };
          return lesson;
        });
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const progressPercent = Math.round((completedCount / updatedLessons.length) * 100);
        return {
          ...course,
          lessons: updatedLessons,
          completedLessons: completedCount,
          progressPercent
        };
      });

      set({ courses: updatedCourses });
      saveState({ courses: updatedCourses });
      get().addToast({
        type: 'success',
        title: completed ? 'Lesson Completed! 🎉' : 'Lesson Marked Incomplete',
        message: 'Your course progress and mastery have been updated.'
      });
    },

    toggleSaveCourse: (courseId) => {
      const updatedCourses = get().courses.map(c => 
        c.id === courseId ? { ...c, isSaved: !c.isSaved } : c
      );
      set({ courses: updatedCourses });
      saveState({ courses: updatedCourses });
    },

    addCourseNote: (courseId, note) => {
      const updatedCourses = get().courses.map(c => {
        if (c.id !== courseId) return c;
        return { ...c, notes: [note, ...c.notes] };
      });
      set({ courses: updatedCourses });
      saveState({ courses: updatedCourses });
      get().addToast({
        type: 'success',
        title: 'Note Saved',
        message: 'Saved to course revision notebook.'
      });
    },

    selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

    updateNodeMastery: (nodeId, newMastery) => {
      const clamped = Math.max(0, Math.min(100, Math.round(newMastery)));
      const newStatus = getStatusFromMastery(clamped);

      const updatedNodes = get().knowledgeNodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            mastery: clamped,
            status: newStatus
          };
        }
        return node;
      });

      set({ knowledgeNodes: updatedNodes });
      saveState({ knowledgeNodes: updatedNodes });
    },

    toggleSessionComplete: (sessionId) => {
      let isCompleted = false;
      const updatedSessions = get().studySessions.map(session => {
        if (session.id === sessionId) {
          isCompleted = !session.completed;
          return { ...session, completed: isCompleted };
        }
        return session;
      });

      set({ studySessions: updatedSessions });
      saveState({ studySessions: updatedSessions });
      get().addToast({
        type: isCompleted ? 'success' : 'info',
        title: isCompleted ? 'Task Completed! ✅' : 'Task Reopened',
        message: isCompleted ? 'Streak maintained. Great job!' : 'Task returned to active schedule.'
      });
    },

    addStudySession: (sessionData) => {
      const newSession: StudySession = {
        ...sessionData,
        id: `session-${Date.now()}`
      };
      const updated = [newSession, ...get().studySessions];
      set({ studySessions: updated });
      saveState({ studySessions: updated });
      get().addToast({
        type: 'success',
        title: 'Study Session Added',
        message: `Scheduled: ${newSession.title} on ${newSession.date}`
      });
    },

    rescheduleSession: (sessionId, newDate, newTimeSlot) => {
      const updated = get().studySessions.map(session => {
        if (session.id === sessionId) {
          return { ...session, date: newDate, timeSlot: newTimeSlot };
        }
        return session;
      });
      set({ studySessions: updated });
      saveState({ studySessions: updated });
      get().addToast({
        type: 'info',
        title: 'Session Rescheduled',
        message: `Moved to ${newDate} at ${newTimeSlot}`
      });
    },

    deleteSession: (sessionId) => {
      const updated = get().studySessions.filter(s => s.id !== sessionId);
      set({ studySessions: updated });
      saveState({ studySessions: updated });
      get().addToast({
        type: 'info',
        title: 'Session Removed',
        message: 'The scheduled item was deleted from your plan.'
      });
    },

    acceptAdaptiveSuggestion: (suggestionId) => {
      const suggestion = get().adaptiveSuggestions.find(s => s.id === suggestionId);
      if (!suggestion) return;

      // Update study session dynamically
      const updatedSessions = get().studySessions.map(s => {
        if (s.title.includes('SQL Practice')) {
          return { ...s, date: '2026-09-19', timeSlot: '16:00 - 17:00' };
        }
        return s;
      });

      const updatedSuggestions = get().adaptiveSuggestions.map(s => 
        s.id === suggestionId ? { ...s, status: 'accepted' as const } : s
      );

      set({
        studySessions: updatedSessions,
        adaptiveSuggestions: updatedSuggestions
      });
      saveState({ studySessions: updatedSessions, adaptiveSuggestions: updatedSuggestions });
      get().addToast({
        type: 'success',
        title: 'Adaptive Plan Applied',
        message: 'Workload adjusted. SQL Practice moved to today at 4:00 PM.'
      });
    },

    dismissAdaptiveSuggestion: (suggestionId) => {
      const updatedSuggestions = get().adaptiveSuggestions.map(s => 
        s.id === suggestionId ? { ...s, status: 'dismissed' as const } : s
      );
      set({ adaptiveSuggestions: updatedSuggestions });
      saveState({ adaptiveSuggestions: updatedSuggestions });
    },

    // CRITICAL CLOSED-LOOP REACTION:
    // When a quiz attempt finishes, dynamically update:
    // 1. Knowledge map node color & mastery
    // 2. Study plan revision task
    // 3. Overall student statistics
    // 4. Notifications
    recordQuizAttempt: (attempt) => {
      const currentAttempts = [attempt, ...get().quizAttempts];
      const student = get().studentProfile;

      // Update student profile stats
      const updatedStudent: StudentProfile = {
        ...student,
        quizzesTaken: student.quizzesTaken + 1,
        // Calculate new mastery based on quiz accuracy
        overallMastery: Math.min(100, Math.round((student.overallMastery * 0.8) + (attempt.accuracyPercent * 0.2)))
      };

      // Recalculate Normalization / Topic node mastery in knowledge map
      const updatedNodes = get().knowledgeNodes.map(node => {
        if (node.label.toLowerCase().includes('normalization') || attempt.quizTitle.toLowerCase().includes('normalization')) {
          const newMastery = Math.min(100, Math.max(30, Math.round(node.mastery + (attempt.accuracyPercent > 60 ? 16 : -5))));
          return {
            ...node,
            mastery: newMastery,
            status: getStatusFromMastery(newMastery)
          };
        }
        if (attempt.strongTopics.some(t => node.label.toLowerCase().includes(t.toLowerCase()))) {
          const newMastery = Math.min(98, node.mastery + 10);
          return {
            ...node,
            mastery: newMastery,
            status: getStatusFromMastery(newMastery)
          };
        }
        return node;
      });

      // Automatically schedule a targeted revision session in the study plan
      const revisionSession: StudySession = {
        id: `session-rev-${Date.now()}`,
        title: `AI Revision: ${attempt.recommendedRevisionTopic || '2NF vs 3NF Transitive Dependencies'}`,
        subject: 'DBMS',
        courseId: 'course-dbms',
        timeSlot: '20:30 - 21:00',
        durationMinutes: 30,
        date: '2026-09-19',
        type: 'revision',
        priority: 'high',
        completed: false,
        aiSuggested: true,
        notes: `EduNexus diagnostic identified: ${attempt.aiMisconceptionAnalysis}`
      };

      const updatedSessions = [revisionSession, ...get().studySessions];

      // Mark quiz completed in quizzes catalog
      const updatedQuizzes = get().quizzes.map(q => {
        if (q.id === attempt.quizId) {
          return { ...q, completed: true, lastScore: attempt.score };
        }
        return q;
      });

      // Add high-priority notification
      const newNotification: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Quiz Diagnosed: ${attempt.accuracyPercent}% Score`,
        description: attempt.aiMisconceptionAnalysis,
        timeAgo: 'Just now',
        type: 'quiz',
        read: false,
        actionRoute: '/study-plan'
      };

      set({
        quizAttempts: currentAttempts,
        studentProfile: updatedStudent,
        knowledgeNodes: updatedNodes,
        studySessions: updatedSessions,
        quizzes: updatedQuizzes,
        notifications: [newNotification, ...get().notifications]
      });

      saveState({
        quizAttempts: currentAttempts,
        studentProfile: updatedStudent,
        knowledgeNodes: updatedNodes,
        studySessions: updatedSessions,
        quizzes: updatedQuizzes,
        notifications: [newNotification, ...get().notifications]
      });

      get().addToast({
        type: 'success',
        title: 'Quiz Diagnostics Complete',
        message: `Score: ${attempt.score}/${attempt.totalQuestions}. Knowledge Map & Study Plan updated!`
      });
    },

    addGeneratedQuiz: (newQuiz) => {
      const updated = [newQuiz, ...get().quizzes];
      set({ quizzes: updated });
      saveState({ quizzes: updated });
      get().addToast({
        type: 'success',
        title: 'AI Quiz Generated',
        message: `"${newQuiz.title}" is ready to test your knowledge!`
      });
    },

    setActiveTutorSessionId: (id) => set({ activeTutorSessionId: id }),

    addMessageToActiveSession: (msgData) => {
      const fullMessage: AIMessage = {
        ...msgData,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedSessions = get().tutorSessions.map(session => {
        if (session.id === get().activeTutorSessionId) {
          return {
            ...session,
            lastActive: 'Just now',
            messages: [...session.messages, fullMessage]
          };
        }
        return session;
      });

      set({ tutorSessions: updatedSessions });
      saveState({ tutorSessions: updatedSessions });
    },

    createNewTutorSession: (topic, courseId = 'course-dbms', courseName = 'DBMS (CS204)') => {
      const newId = `session-${Date.now()}`;
      const newSession: TutorSession = {
        id: newId,
        topic,
        courseId,
        courseName,
        lastActive: 'Just now',
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: `Hello ${get().studentProfile.name.split(' ')[0] || 'there'}! Welcome to our session on "${topic}". What specific question, concept, or practice problem shall we conquer first?`,
            concept: topic
          }
        ]
      };

      const updated = [newSession, ...get().tutorSessions];
      set({ tutorSessions: updated, activeTutorSessionId: newId });
      saveState({ tutorSessions: updated, activeTutorSessionId: newId });
      return newId;
    },

    saveMessageToNotes: (messageId, content) => {
      // Find active course or default to DBMS
      const activeCourse = get().courses.find(c => c.id === get().activeCourseId) || get().courses[0];
      const cleanSnippet = content.slice(0, 160) + (content.length > 160 ? '...' : '');
      get().addCourseNote(activeCourse.id, `AI Tutor Note (${new Date().toLocaleDateString()}): ${cleanSnippet}`);
    },

    toggleSaveResource: (resourceId) => {
      const updated = get().resources.map(r => 
        r.id === resourceId ? { ...r, isSaved: !r.isSaved } : r
      );
      set({ resources: updated });
      saveState({ resources: updated });
      const item = updated.find(r => r.id === resourceId);
      get().addToast({
        type: 'info',
        title: item?.isSaved ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
        message: item?.title || 'Resource'
      });
    },

    addResource: (resourceData) => {
      const newRes: ResourceItem = {
        ...resourceData,
        id: `res-${Date.now()}`
      };
      const updated = [newRes, ...get().resources];
      set({ resources: updated });
      saveState({ resources: updated });
      get().addToast({
        type: 'success',
        title: 'Material Added to Library',
        message: newRes.title
      });
    },

    upvotePost: (postId) => {
      const updated = get().communityPosts.map(post => {
        if (post.id !== postId) return post;
        const userHasUpvoted = !post.userHasUpvoted;
        const upvotes = userHasUpvoted ? post.upvotes + 1 : post.upvotes - 1;
        return { ...post, upvotes, userHasUpvoted };
      });
      set({ communityPosts: updated });
      saveState({ communityPosts: updated });
    },

    addReplyToPost: (postId, content) => {
      const student = get().studentProfile;
      const newReply = {
        id: `rep-${Date.now()}`,
        author: {
          name: student.name,
          avatar: student.avatar
        },
        content,
        timestamp: 'Just now',
        upvotes: 0
      };

      const updated = get().communityPosts.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          repliesCount: post.repliesCount + 1,
          replies: [...post.replies, newReply]
        };
      });

      set({ communityPosts: updated });
      saveState({ communityPosts: updated });
      get().addToast({
        type: 'success',
        title: 'Reply Posted',
        message: 'Your insight was shared with the community!'
      });
    },

    createPost: (title, content, tags) => {
      const student = get().studentProfile;
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        author: {
          name: student.name,
          avatar: student.avatar,
          role: `${student.degree.split(' ')[0]} ${student.year.split('•')[0]}`
        },
        title,
        content,
        tags,
        upvotes: 1,
        userHasUpvoted: true,
        repliesCount: 0,
        timestamp: 'Just now',
        replies: []
      };

      const updated = [newPost, ...get().communityPosts];
      set({ communityPosts: updated });
      saveState({ communityPosts: updated });
      get().addToast({
        type: 'success',
        title: 'Question Published',
        message: 'Your post is now live in the student forum.'
      });
    },

    markNotificationRead: (id) => {
      const updated = get().notifications.map(n => n.id === id ? { ...n, read: true } : n);
      set({ notifications: updated });
      saveState({ notifications: updated });
    },

    markAllNotificationsRead: () => {
      const updated = get().notifications.map(n => ({ ...n, read: true }));
      set({ notifications: updated });
      saveState({ notifications: updated });
    },

    addNotification: (notifData) => {
      const newNotif: NotificationItem = {
        ...notifData,
        id: `notif-${Date.now()}`,
        timeAgo: 'Just now'
      };
      const updated = [newNotif, ...get().notifications];
      set({ notifications: updated });
      saveState({ notifications: updated });
    },

    toggleFocusMode: (open) => set(s => ({ isFocusModeOpen: open !== undefined ? open : !s.isFocusModeOpen })),
    toggleUploadModal: (open) => set(s => ({ isUploadModalOpen: open !== undefined ? open : !s.isUploadModalOpen })),
    toggleScannerModal: (open) => set(s => ({ isScannerModalOpen: open !== undefined ? open : !s.isScannerModalOpen })),
    toggleSearchModal: (open) => set(s => ({ isSearchModalOpen: open !== undefined ? open : !s.isSearchModalOpen })),

    addToast: (toastData) => {
      const newToast: ToastMessage = {
        ...toastData,
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      };
      set(s => ({ toasts: [...s.toasts, newToast] }));
      setTimeout(() => {
        get().removeToast(newToast.id);
      }, 4000);
    },

    removeToast: (id) => {
      set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
    },

    resetDemoData: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({
        studentProfile: initialStudentProfile,
        courses: initialCourses,
        activeCourseId: 'course-dbms',
        knowledgeNodes: initialKnowledgeNodes,
        knowledgeEdges: initialKnowledgeEdges,
        selectedNodeId: 'node-dbms-norm',
        studySessions: initialStudySessions,
        quizzes: initialQuizzes,
        quizAttempts: [],
        tutorSessions: initialTutorSessions,
        activeTutorSessionId: 'session-norm',
        recommendations: initialRecommendations,
        careerPaths: initialCareerPaths,
        resources: initialResources,
        communityPosts: initialCommunityPosts,
        notifications: initialNotifications
      });
      get().addToast({
        type: 'info',
        title: 'Demo Data Reset',
        message: 'All courses, nodes, and schedules have been restored to initial state.'
      });
    }
  };
});
