import React, { useState } from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  Clock,
  Award,
  Flame,
  TrendingUp,
  Brain,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { studentProfile } = useEduNexusStore();
  const [timeFilter, setTimeFilter] = useState<'7 days' | '30 days' | '3 months' | 'All time'>('7 days');

  // Study time per day data
  const studyTimeData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.1 },
    { day: 'Wed', hours: 0.8 },
    { day: 'Thu', hours: 2.4 },
    { day: 'Fri', hours: 1.2 },
    { day: 'Sat', hours: 2.8 },
    { day: 'Sun', hours: 1.0 }
  ];

  // Accuracy progression data
  const accuracyTrendData = [
    { date: 'Sep 12', accuracy: 68 },
    { date: 'Sep 14', accuracy: 72 },
    { date: 'Sep 15', accuracy: 70 },
    { date: 'Sep 17', accuracy: 78 },
    { date: 'Sep 18', accuracy: 81 },
    { date: 'Sep 19', accuracy: studentProfile.overallMastery || 82 }
  ];

  // Subject Mastery breakdown
  const subjectMasteryData = [
    { subject: 'DBMS & Relational Algebra', mastery: 82, color: '#2563EB' },
    { subject: 'Python Systems & Data Structures', mastery: 74, color: '#6366F1' },
    { subject: 'Tree & Graph Algorithms', mastery: 61, color: '#10B981' },
    { subject: 'Computer Networks & TCP/IP', mastery: 55, color: '#F59E0B' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-mono">
              Academic Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum Analytics & Progress
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Empirical measurements of retention, time allocation, cognitive mastery, and weekly revision consistency.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl shadow-xs">
          {(['7 days', '30 days', '3 months', 'All time'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeFilter === filter
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 5 METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Overall Progress
            </span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.overallMastery}%
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 inline-block">
            +4% this week
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-orange-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Weekly Study Time
            </span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            8h 42m
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 inline-block">
            Daily avg: 1h 14m
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-emerald-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Concept Mastery
            </span>
            <Brain className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            64%
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 inline-block">
            18 Nodes mapped
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quiz Accuracy
            </span>
            <Award className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            81%
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 inline-block">
            {studentProfile.quizzesTaken} Quizzes taken
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-rose-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Streak
            </span>
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.streakDays} Days
          </p>
          <span className="text-[11px] text-amber-500 font-semibold mt-1 inline-block">
            Personal best!
          </span>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Time Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Weekly Study Time Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hours logged per day (Mon - Sun)</p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 px-2.5 py-1 rounded-full">
              Target: 2h/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="hours" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Accuracy Progression Line Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Diagnostic Accuracy Progression
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Scores over recent tests & sprints</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              +14% This Month
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOPIC MASTERY BREAKDOWN & BEHAVIORAL DIAGNOSTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Mastery List */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Topic Performance Breakdown
          </h3>

          <div className="space-y-4">
            {subjectMasteryData.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{item.subject}</span>
                  <span style={{ color: item.color }} className="font-bold">{item.mastery}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#161F30] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.mastery}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Diagnostics (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Academic Retention & Learning Diagnostics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#161F30] border border-amber-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                Peak Retention Window
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                "Your test accuracy is 22% higher when you study between 7:00 PM and 10:00 PM compared to early morning sessions."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#161F30] border border-amber-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                Curriculum Interleaving
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                "Binary tree traversal needs 1 more practice session to prevent decay before graph algorithms start next week."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#161F30] border border-emerald-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                Retention Velocity
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                "Your quiz accuracy has improved 14% this month, with consistent syllabus coverage across 7 continuous days."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
