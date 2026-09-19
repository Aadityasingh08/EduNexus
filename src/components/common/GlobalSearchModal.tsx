import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { Search, BookOpen, Brain, CheckSquare, FileText, Sparkles, X, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, toggleSearchModal, courses, knowledgeNodes, quizzes, studySessions } = useEduNexusStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearchModal();
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        toggleSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, toggleSearchModal]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  // Search filter across courses, topics, quizzes, and tasks
  const matchedCourses = courses.filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  const matchedNodes = knowledgeNodes.filter(n => n.label.toLowerCase().includes(q) || n.category.toLowerCase().includes(q));
  const matchedQuizzes = quizzes.filter(qz => qz.title.toLowerCase().includes(q) || qz.topic.toLowerCase().includes(q));
  const matchedSessions = studySessions.filter(s => s.title.toLowerCase().includes(q));

  const handleSelect = (path: string) => {
    toggleSearchModal(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-500" />
          <input
            type="text"
            placeholder="Search courses, curriculum topics, quizzes, study notes... (Try 'Normalization')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-base outline-none"
          />
          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">
            ESC to close
          </span>
          <button
            onClick={() => toggleSearchModal(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick AI Suggestion */}
          <div
            onClick={() => handleSelect(`/tutor?topic=${encodeURIComponent(query || 'Normalization')}`)}
            className="flex items-center justify-between p-3.5 rounded-xl bg-blue-600/10 border border-blue-500/20 cursor-pointer hover:bg-blue-600/15 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Study "{query || 'Normalization'}" with Academic Syllabus Tutor
                </p>
                <p className="text-xs text-blue-400">
                  Concept breakdown, worked examples, common exam pitfalls, and practice questions
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Matched Knowledge Nodes */}
          {matchedNodes.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Knowledge Graph Concepts ({matchedNodes.length})
              </p>
              <div className="space-y-1">
                {matchedNodes.slice(0, 4).map((node) => (
                  <div
                    key={node.id}
                    onClick={() => handleSelect(`/knowledge-map?highlight=${node.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Brain className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {node.label}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                        {node.category}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {node.mastery}% mastery
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Courses */}
          {matchedCourses.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Curriculum Courses ({matchedCourses.length})
              </p>
              <div className="space-y-1">
                {matchedCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleSelect(`/learning/${course.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {course.code} • {course.currentTopic}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                      {course.progressPercent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Quizzes */}
          {matchedQuizzes.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Quizzes & Diagnostic Tests ({matchedQuizzes.length})
              </p>
              <div className="space-y-1">
                {matchedQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    onClick={() => handleSelect(`/quizzes/${quiz.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {quiz.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {quiz.questionCount} Questions • {quiz.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state if nothing matched */}
          {matchedCourses.length === 0 && matchedNodes.length === 0 && matchedQuizzes.length === 0 && query && (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                No direct matches found for "{query}"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Press enter to ask the Academic Syllabus Tutor.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">↑</kbd> <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">↓</kbd></span>
            <span>Select: <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">↵</kbd></span>
          </div>
          <span>EduNexus Command Palette</span>
        </div>
      </div>
    </div>
  );
};
