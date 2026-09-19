import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Laptop,
  Bell,
  Sparkles,
  BookOpen,
  LogOut
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { studentProfile, toggleTheme, updateProfile, logout, addToast } = useEduNexusStore();

  const handleToggleTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateProfile({ theme });
    addToast({
      type: 'info',
      title: 'Theme Updated',
      message: `Appearance set to ${theme} mode.`
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure EduNexus appearance, curriculum diagnostic parameters, notification frequency, and workspace states.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Sun className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Appearance & Theme
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize contrast and palette for day and late-night study sessions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'system', label: 'System Sync', icon: Laptop }
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = studentProfile.theme === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleToggleTheme(mode.id as any)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
                    : 'hover:bg-slate-50 dark:hover:bg-[#161F30] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111827]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Companion & Reasoning Preferences
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Control how the academic assistant formulates proofs, analogies, and diagnostic steps.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Socratic Diagnostic Mode
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Companion asks guiding questions first rather than immediately dumping code solutions.
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-700 cursor-pointer accent-amber-700" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Automatic Concept Misconception Flagging
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Highlight conflicting mental models in quiz explanations (e.g. 2NF vs 3NF transitive dependencies).
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-700 cursor-pointer accent-amber-700" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Bell className="w-5 h-5 text-emerald-500" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Notifications & Exam Reminders
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exam countdown alerts, revision streak reminders, and adaptive reschedule alerts.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161F30]">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Upcoming Exam Countdown (6 Days to DBMS Midterm)
            </span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-700 accent-amber-700" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161F30]">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Daily Study Streak Protection Reminders
            </span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-700 accent-amber-700" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161F30]">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Peer Discussion Thread Updates
            </span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-amber-700 accent-amber-700" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Account Session
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Signed in as <span className="font-semibold text-amber-700 dark:text-amber-400">{studentProfile.name}</span> ({studentProfile.email})
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs flex items-center gap-2 self-start sm:self-center transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out from EduNexus</span>
        </button>
      </div>
    </div>
  );
};
