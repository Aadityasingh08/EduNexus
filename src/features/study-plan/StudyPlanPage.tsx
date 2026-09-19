import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  MoveRight
} from 'lucide-react';

export const StudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    studySessions,
    toggleSessionComplete,
    addStudySession,
    rescheduleSession,
    deleteSession,
    adaptiveSuggestions,
    acceptAdaptiveSuggestion,
    dismissAdaptiveSuggestion
  } = useEduNexusStore();

  const [activeTab, setActiveTab] = useState<'Plan' | 'Schedule' | 'Goals' | 'Adaptive'>('Plan');
  const [calendarView, setCalendarView] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New session state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('DBMS');
  const [newTimeSlot, setNewTimeSlot] = useState('16:00 - 17:00');
  const [newDuration, setNewDuration] = useState(60);
  const [newDate, setNewDate] = useState('2026-09-19');
  const [newType, setNewType] = useState<'lecture' | 'practice' | 'quiz' | 'revision'>('practice');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const todaySessions = studySessions.filter((s) => s.date === '2026-09-19');
  const tomorrowSessions = studySessions.filter((s) => s.date === '2026-09-20');

  const completedToday = todaySessions.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedToday / (todaySessions.length || 1)) * 100);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addStudySession({
      title: newTitle.trim(),
      subject: newSubject,
      timeSlot: newTimeSlot,
      durationMinutes: newDuration,
      date: newDate,
      type: newType,
      priority: newPriority,
      completed: false
    });
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Schedule & Study Sprints
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Dynamic study roadmap calibrated to upcoming midterms, weak topic diagnostics, and syllabus goals.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Session</span>
        </button>
      </div>

      {/* Adaptive Suggestion Banner */}
      {adaptiveSuggestions.filter((s) => s.status === 'pending').map((suggestion) => (
        <div
          key={suggestion.id}
          className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950/30 via-[#111827] to-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-600/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Adaptive Syllabus Recommendation
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {suggestion.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {suggestion.reason}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => dismissAdaptiveSuggestion(suggestion.id)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => acceptAdaptiveSuggestion(suggestion.id)}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Accept & Reschedule</span>
            </button>
          </div>
        </div>
      ))}

      {/* Tabs & Calendar View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        {/* Module Tabs */}
        <div className="flex items-center gap-2">
          {(['Plan', 'Schedule', 'Goals', 'Adaptive'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
          {(['Day', 'Week', 'Month'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                calendarView === view
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Progress Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Today's Execution Progress (Saturday, Sept 19)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {completedToday} of {todaySessions.length} sessions completed ({progressPercent}%)
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {completedToday >= 3 ? 'On Track for Daily Goal' : 'Sessions Remaining'}
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Calendar / Sessions Stream */}
      <div className="space-y-6">
        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              Today's Timeline
            </h3>
            <span className="text-xs text-slate-400">{todaySessions.length} Planned Sessions</span>
          </div>

          <div className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  session.completed
                    ? 'bg-slate-50/50 dark:bg-[#111827]/40 border-slate-200 dark:border-slate-800/60 opacity-60'
                    : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-blue-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={session.completed}
                    onChange={() => toggleSessionComplete(session.id)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-600/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                        {session.subject}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {session.timeSlot} ({session.durationMinutes}m)
                      </span>
                      {session.aiSuggested && (
                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Adaptive
                        </span>
                      )}
                    </div>
                    <h4
                      className={`text-sm font-bold mt-1.5 ${
                        session.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {session.title}
                    </h4>
                    {session.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      const newTime = prompt('Enter new time slot:', session.timeSlot);
                      if (newTime) rescheduleSession(session.id, session.date, newTime);
                    }}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                    title="Reschedule"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow's Schedule */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
              Tomorrow's Preview (Sunday, Sept 20)
            </h3>
            <span className="text-xs text-slate-400">{tomorrowSessions.length} Sessions</span>
          </div>

          <div className="space-y-3">
            {tomorrowSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                      {session.subject}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{session.timeSlot}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {session.title}
                  </h4>
                </div>

                <button
                  onClick={() => rescheduleSession(session.id, '2026-09-19', '17:00 - 18:00')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-blue-400 hover:bg-blue-600/10 transition-colors"
                >
                  Move to Today
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Study Session Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Schedule Study Sprint
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practice BCNF Decomposition Problems"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="DBMS">DBMS (CS204)</option>
                    <option value="Python">Python (CS101)</option>
                    <option value="Data Structures">Data Structures (CS201)</option>
                    <option value="Computer Networks">Networks (CS302)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Time Slot</label>
                  <input
                    type="text"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    placeholder="18:00 - 19:00"
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Type</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="practice">Practice</option>
                    <option value="lecture">Lecture</option>
                    <option value="revision">Revision</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
