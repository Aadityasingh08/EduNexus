import React from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEduNexusStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#22A06B] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#1677FF] shrink-0" />
        };

        const borders = {
          success: 'border-[#22A06B]/30 bg-white dark:bg-[#111827]',
          error: 'border-[#EF4444]/30 bg-white dark:bg-[#111827]',
          warning: 'border-[#F59E0B]/30 bg-white dark:bg-[#111827]',
          info: 'border-[#1677FF]/30 bg-white dark:bg-[#111827]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all animate-slide-up ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                {toast.title}
              </h4>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#64748B] hover:text-[#0F172A] dark:hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
