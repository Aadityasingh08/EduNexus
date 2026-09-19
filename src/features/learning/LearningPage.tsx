import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  BookOpen,
  Search,
  Bookmark,
  Clock,
  CheckCircle2,
  Play,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export const LearningPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, toggleSaveCourse } = useEduNexusStore();
  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed' | 'Saved'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'In Progress') return c.progressPercent < 100;
    if (activeTab === 'Completed') return c.progressPercent === 100;
    if (activeTab === 'Saved') return c.isSaved;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Curriculum & Courses
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            University syllabus, lecture notes, textbook breakdowns, and midterm diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search curriculum courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-amber-500 w-60 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(['All', 'In Progress', 'Completed', 'Saved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                    style={{ backgroundColor: course.color }}
                  >
                    {course.code.slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      {course.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                      {course.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaveCourse(course.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    course.isSaved
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Bookmark Course"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Faculty: {course.instructor}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{course.completedLessons}/{course.totalLessons} Syllabus Modules</span>
                  <span className="font-bold text-amber-500">{course.progressPercent}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progressPercent}%`,
                    backgroundColor: course.color
                  }}
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 mb-5">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Current Syllabus Focus:
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                  {course.currentTopic}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => navigate(`/learning/${course.id}`)}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Open Syllabus</span>
              </button>
              <button
                onClick={() => navigate(`/tutor?topic=${encodeURIComponent(course.currentTopic)}`)}
                className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-600/10 text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
                title="Ask Academic Tutor about this course"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
