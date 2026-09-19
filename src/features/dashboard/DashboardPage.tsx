import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  UploadCloud,
  CheckSquare,
  Calendar,
  Camera,
  Play,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  BookOpen,
  Star,
  Plus,
  X,
  Brain,
  GraduationCap,
  Sun,
  Moon
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    studentProfile,
    courses,
    studySessions,
    toggleSessionComplete,
    recommendations,
    toggleFocusMode,
    toggleUploadModal,
    toggleScannerModal,
    knowledgeNodes,
    addCustomCourse,
    toggleTheme
  } = useEduNexusStore();

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseInstructor, setNewCourseInstructor] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Core Subject');
  const [newCourseDescription, setNewCourseDescription] = useState('');

  // Primary active course for quick resume
  const primaryCourse = courses[0] || {
    id: 'course-dbms',
    code: 'CS204',
    title: 'Database Management Systems',
    currentTopic: 'Normalization & Functional Dependencies',
    progressPercent: 68
  };

  const normNode = knowledgeNodes.find((n) => n.id === 'node-dbms-norm');

  // Today's scheduled sessions
  const todaySessions = studySessions.filter((s) => s.date === 'Today' || s.date === '2026-09-19');
  const completedCount = todaySessions.filter((s) => s.completed).length;
  const progressPercent = todaySessions.length > 0
    ? Math.round((completedCount / todaySessions.length) * 100)
    : 0;

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    addCustomCourse({
      title: newCourseTitle.trim(),
      code: newCourseCode.trim() || 'CS301',
      instructor: newCourseInstructor.trim() || 'Faculty Professor',
      category: newCourseCategory,
      description: newCourseDescription.trim() || 'Comprehensive university curriculum modules.'
    });
    setNewCourseTitle('');
    setNewCourseCode('');
    setNewCourseInstructor('');
    setNewCourseDescription('');
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-white dark:from-[#111827] dark:via-[#161F30] dark:to-[#111827] border border-amber-200/80 dark:border-slate-800 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden transition-all">
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good morning, {studentProfile.name.split(' ')[0]} 👋
            </h1>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 font-bold">
              {studentProfile.targetRole} Track
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 font-semibold">
              3.8 / 4.0 Target GPA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            {studentProfile.degree} • {studentProfile.university || 'University Institute of Technology'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={toggleTheme}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 shadow-xs hover:border-amber-500 transition-all active:scale-95 cursor-pointer"
            title="Toggle between Light and Dark themes"
          >
            {studentProfile.theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleFocusMode(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center gap-2 shadow-xs"
          >
            <Maximize2 className="w-4 h-4 text-orange-500" />
            <span>Focus Mode</span>
          </button>

          <button
            onClick={() => navigate('/tutor?topic=Normalization')}
            className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-700/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Companion</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-slate-700 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-1 rounded-full font-mono">
                Today's Syllabus Priority
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {completedCount} of {todaySessions.length} sessions completed ({progressPercent}%)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Revise Database Normalization & Functional Dependency Proofs
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-6">
              Diagnostic test identified transitive functional dependencies as your highest priority hurdle before the midterm exam. Focus on 2NF vs 3NF decomposition proofs.
            </p>

            <div className="w-full bg-slate-100 dark:bg-[#0F172A] h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 mb-6">
              <div
                className="bg-gradient-to-r from-amber-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(8, progressPercent)}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/tutor?topic=Normalization')}
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-700/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Start Learning Module</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/quizzes/quiz-normalization')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Diagnostic Practice Test</span>
            </button>
            <button
              onClick={() => navigate('/knowledge-map?highlight=node-dbms-norm')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              <span>Knowledge Map</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-3">
              <BookOpen className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Academic Progress Insight
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              "You demonstrate solid command over SQL Joins (86%), while Relational Normalization ({normNode?.mastery || 52}%) has 2 flagged misconceptions. A 20-minute practice drill has been added."
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Target Concept</span>
                <span className="font-semibold text-slate-900 dark:text-white">2NF vs 3NF Decomposition</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Mastery Level</span>
                <span
                  className={`font-semibold capitalize ${
                    normNode?.status === 'mastered'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : normNode?.status === 'learning'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {normNode?.status || 'needs practice'} ({normNode?.mastery || 52}%)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Midterm Exam</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">6 Days Remaining</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">Personalized for {studentProfile.name.split(' ')[0]}</span>
            <button
              onClick={() => navigate('/study-plan')}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Academic Utilities & Studio
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              label: 'Upload Notes',
              icon: UploadCloud,
              color: 'text-amber-700 dark:text-amber-400',
              bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
              action: () => toggleUploadModal(true)
            },
            {
              label: 'Study Companion',
              icon: BookOpen,
              color: 'text-orange-700 dark:text-orange-400',
              bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
              action: () => navigate('/tutor')
            },
            {
              label: 'Practice Quiz',
              icon: CheckSquare,
              color: 'text-emerald-600 dark:text-emerald-400',
              bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
              action: () => navigate('/quizzes')
            },
            {
              label: 'Study Sprints',
              icon: Calendar,
              color: 'text-amber-600 dark:text-amber-400',
              bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
              action: () => navigate('/study-plan')
            },
            {
              label: 'Scan Notes',
              icon: Camera,
              color: 'text-rose-600 dark:text-rose-400',
              bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
              action: () => toggleScannerModal(true)
            },
            {
              label: 'Continue Course',
              icon: Play,
              color: 'text-orange-600 dark:text-orange-400',
              bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
              action: () => navigate(`/learning/${primaryCourse.id}`)
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md shadow-xs transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl ${item.bg} border ${item.color} flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              University Curriculum & Subjects
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">({courses.length} Active Courses)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-white dark:bg-[#111827] text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Add Real Course</span>
            </button>
            <button
              onClick={() => navigate('/learning')}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-slate-700 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-2.5 py-1 rounded-lg">
                    {course.code}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    {course.progressPercent}%
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  {course.instructor} • {course.completedLessons}/{course.totalLessons} modules
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Current Syllabus Topic:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                    {course.currentTopic}
                  </p>
                </div>

                <div className="w-full bg-slate-100 dark:bg-[#0F172A] h-1.5 rounded-full overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-700"
                    style={{ width: `${course.progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => navigate(`/learning/${course.id}`)}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-700 hover:border-amber-700 hover:text-white text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Academic Sessions & Study Tasks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click checkbox to mark session completed</p>
            </div>
            <button
              onClick={() => navigate('/study-plan')}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
            >
              Open Timetable →
            </button>
          </div>

          <div className="space-y-3">
            {todaySessions.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleSessionComplete(task.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  task.completed
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 opacity-60'
                    : 'bg-slate-50 dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-amber-700 cursor-pointer accent-amber-700"
                  />
                  <div>
                    <h5
                      className={`text-xs font-bold ${
                        task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{task.subject}</span>
                      <span>•</span>
                      <span>{task.timeSlot}</span>
                      {task.aiSuggested && (
                        <>
                          <span>•</span>
                          <span className="text-orange-600 dark:text-orange-400 font-medium flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3" /> Study Drill
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                    task.priority === 'high'
                      ? 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'
                      : 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recommended Study Modules
              </h3>
              <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                      {rec.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{rec.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2.5 line-clamp-2">
                    {rec.reason}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">
                      {rec.estimatedTime} • {rec.difficulty}
                    </span>
                    <button
                      onClick={() => navigate(rec.linkRoute)}
                      className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Start Module →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Add Real University Subject
                </h3>
              </div>
              <button
                onClick={() => setIsAddCourseModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems / Cloud Computing / Machine Learning"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS301"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Faculty / Professor</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Priya Nair"
                    value={newCourseInstructor}
                    onChange={(e) => setNewCourseInstructor(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Department Category</label>
                <select
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-amber-600"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Core Engineering">Core Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Syllabus Overview</label>
                <textarea
                  rows={3}
                  placeholder="Paste brief syllabus description or module overview..."
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-amber-600 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-700/20"
                >
                  Enroll Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
