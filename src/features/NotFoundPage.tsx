import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex flex-col items-center justify-center p-6 text-center text-slate-900 dark:text-slate-100">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-md">
        <BookOpen className="w-8 h-8" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
        404: Concept Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8">
        The learning module or page you were looking for is not mapped in EduNexus's syllabus graph.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#161F30] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
