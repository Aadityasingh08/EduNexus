import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Home,
  BookOpen,
  Sparkles,
  Calendar,
  Brain,
  CheckSquare,
  BarChart3,
  Compass,
  FolderArchive,
  Users,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  onOpenNotifications: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNotifications }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { notifications, studentProfile, logout } = useEduNexusStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/learning', label: 'My Learning', icon: BookOpen },
    { to: '/tutor', label: 'AI Tutor', icon: Sparkles, badge: 'Smart' },
    { to: '/study-plan', label: 'Study Plan', icon: Calendar },
    { to: '/knowledge-map', label: 'Knowledge Map', icon: Brain, badge: 'Graph' },
    { to: '/quizzes', label: 'Quizzes', icon: CheckSquare },
    { to: '/progress', label: 'Progress', icon: BarChart3 },
    { to: '/career', label: 'Career', icon: Compass },
    { to: '/resources', label: 'Resources', icon: FolderArchive },
    { to: '/community', label: 'Community', icon: Users }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] transition-all duration-300 select-none z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800/80">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center shrink-0 shadow-md shadow-amber-600/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                EduNexus
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mt-0.5">
                Learning OS
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User & System Controls */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
        {/* Notifications trigger */}
        <button
          onClick={onOpenNotifications}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
          title="Notifications"
        >
          <div className="relative">
            <Bell className="w-4 h-4 shrink-0" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
          )}
        </button>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-amber-600/10 text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`
          }
          title="Settings"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>

        {/* Profile Card */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2.5 rounded-2xl text-sm font-medium transition-all mt-2 ${
              isActive
                ? 'bg-amber-600/10 border border-amber-500/30'
                : 'bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-slate-700'
            }`
          }
          title="Student Profile"
        >
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-8 h-8 rounded-xl object-cover shrink-0 border border-amber-500/40"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {studentProfile.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {studentProfile.year.split('•')[0]}
              </p>
            </div>
          )}
        </NavLink>

        {/* Log Out Button */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 transition-colors mt-1"
          title="Log Out of EduNexus"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
