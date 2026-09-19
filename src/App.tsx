import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEduNexusStore } from './store/useEduNexusStore';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Features
import { LandingPage } from './features/landing/LandingPage';
import { LoginPage } from './features/auth/LoginPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { AITutorPage } from './features/tutor/AITutorPage';
import { LearningPage } from './features/learning/LearningPage';
import { CourseDetailPage } from './features/learning/CourseDetailPage';
import { StudyPlanPage } from './features/study-plan/StudyPlanPage';
import { KnowledgeMapPage } from './features/knowledge-map/KnowledgeMapPage';
import { QuizCatalogPage } from './features/quizzes/QuizCatalogPage';
import { QuizRunnerPage } from './features/quizzes/QuizRunnerPage';
import { AnalyticsPage } from './features/progress/AnalyticsPage';
import { CareerPage } from './features/career/CareerPage';
import { ResourcesPage } from './features/resources/ResourcesPage';
import { CommunityPage } from './features/community/CommunityPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { SettingsPage } from './features/settings/SettingsPage';
import { NotFoundPage } from './features/NotFoundPage';

export function App() {
  const { studentProfile } = useEduNexusStore();

  // Enforce dark mode by default unless user explicitly chose light
  useEffect(() => {
    if (studentProfile.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [studentProfile.theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Showcase Landing Page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/learning/:courseId" element={<CourseDetailPage />} />
            <Route path="/tutor" element={<AITutorPage />} />
            <Route path="/study-plan" element={<StudyPlanPage />} />
            <Route path="/knowledge-map" element={<KnowledgeMapPage />} />
            <Route path="/quizzes" element={<QuizCatalogPage />} />
            <Route path="/quizzes/:quizId" element={<QuizRunnerPage />} />
            <Route path="/progress" element={<AnalyticsPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
