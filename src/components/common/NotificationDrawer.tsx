import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { Bell, CheckCheck, X, Sparkles, AlertCircle, Flame, Calendar, BookOpen } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useEduNexusStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAction = (id: string, route?: string) => {
    markNotificationRead(id);
    onClose();
    if (route) {
      navigate(route);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'streak':
        return <Flame className="w-4 h-4 text-[#F59E0B]" />;
      case 'tutor':
        return <Sparkles className="w-4 h-4 text-[#7657FF]" />;
      case 'plan':
        return <Calendar className="w-4 h-4 text-[#1677FF]" />;
      case 'quiz':
        return <AlertCircle className="w-4 h-4 text-[#EF4444]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#22A06B]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-[#0E1524] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Academic Notifications
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold">
              {notifications.filter((n) => !n.read).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleAction(n.id, n.actionRoute)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-transparent border-slate-200 dark:border-slate-800/60 opacity-70'
                    : 'bg-slate-50 dark:bg-[#111827] border-blue-500/30 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#161F30] flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{n.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {n.description}
                    </p>
                    {n.actionRoute && (
                      <span className="inline-block text-[11px] font-semibold text-blue-400 mt-2">
                        Take Action →
                      </span>
                    )}
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
