import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Search,
  Flame,
  Sun,
  Moon,
  Bell,
  Sparkles,
  UploadCloud,
  Maximize2,
  Menu,
  LogOut
} from 'lucide-react';

interface TopHeaderProps {
  onOpenNotifications: () => void;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenNotifications,
  onOpenMobileMenu
}) => {
  const navigate = useNavigate();
  const {
    studentProfile,
    toggleTheme,
    toggleSearchModal,
    toggleFocusMode,
    toggleUploadModal,
    notifications,
    logout
  } = useEduNexusStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => toggleSearchModal(true)}
          className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-blue-500" />
            <span className="hidden sm:inline">Search courses, syllabus, notes, problem sets...</span>
            <span className="sm:hidden">Search EduNexus...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] bg-white dark:bg-[#0B0F19] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Upload Notes Quick Trigger */}
        <button
          onClick={() => toggleUploadModal(true)}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all shadow-2xs"
          title="Upload notes for automated concept extraction"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload Notes</span>
        </button>

        {/* Focus Mode button */}
        <button
          onClick={() => toggleFocusMode(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs"
          title="Enter distraction-free study sprint"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Focus Mode</span>
        </button>

        {/* Streak Indicator */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-500 dark:text-amber-400 text-xs font-bold"
          title="Current daily learning streak"
        >
          <Flame className="w-4 h-4 fill-current" />
          <span>{studentProfile.streakDays}d Streak</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-all shadow-2xs cursor-pointer"
          title={`Switch to ${studentProfile.theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {studentProfile.theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline text-[11px]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              <span className="hidden sm:inline text-[11px]">Dark Mode</span>
            </>
          )}
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Student Avatar & Log Out */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            title={studentProfile.name}
            className="w-8 h-8 rounded-xl object-cover border border-blue-500/40 shadow-xs"
          />

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all shadow-2xs ml-1"
            title="Log Out from EduNexus"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
