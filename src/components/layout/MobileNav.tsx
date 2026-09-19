import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Home,
  BookOpen,
  Sparkles,
  Brain,
  Calendar,
  Menu,
  X,
  CheckSquare,
  BarChart3,
  Compass,
  FolderArchive,
  Users,
  Settings,
  User,
  LogOut
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useEduNexusStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mainItems = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/learning', label: 'Learning', icon: BookOpen },
    { to: '/tutor', label: 'AI Tutor', icon: Sparkles },
    { to: '/knowledge-map', label: 'Map', icon: Brain },
    { to: '/study-plan', label: 'Plan', icon: Calendar }
  ];

  const drawerItems = [
    { to: '/quizzes', label: 'Quizzes & Diagnostics', icon: CheckSquare },
    { to: '/progress', label: 'Progress & Analytics', icon: BarChart3 },
    { to: '/career', label: 'Career Pathways', icon: Compass },
    { to: '/resources', label: 'Resource Library', icon: FolderArchive },
    { to: '/community', label: 'Student Community', icon: Users },
    { to: '/profile', label: 'Student Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="absolute bottom-16 inset-x-0 bg-white dark:bg-[#111827] rounded-t-3xl p-6 border-t border-slate-200 dark:border-slate-800 shadow-2xl max-h-[70vh] overflow-y-auto space-y-2 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                All EduNexus Modules
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 hover:border-amber-500/40"
                  >
                    <Icon className="w-4 h-4 text-amber-500" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                logout();
                navigate('/login');
              }}
              className="w-full mt-3 p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out from EduNexus</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-30 md:hidden">
        {mainItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
                  isActive
                    ? 'text-amber-500'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            isDrawerOpen ? 'text-amber-500' : 'text-slate-400'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>
    </>
  );
};
