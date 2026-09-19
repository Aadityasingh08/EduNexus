import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { generateQuizByTopic } from '../../services/quizService';
import {
  CheckSquare,
  Sparkles,
  Play,
  Clock,
  Award,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle2,
  X,
  BookOpen
} from 'lucide-react';

export const QuizCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizzes, addGeneratedQuiz } = useEduNexusStore();

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('DBMS');
  const [selectedTopic, setSelectedTopic] = useState('Normalization');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [questionType, setQuestionType] = useState<'All' | 'MCQ' | 'True/False' | 'Short Answer'>('All');

  const handleGenerateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuiz = generateQuizByTopic({
      subject: selectedSubject,
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      questionCount,
      questionType
    });
    addGeneratedQuiz(newQuiz);
    setIsGeneratorOpen(false);
    navigate(`/quizzes/${newQuiz.id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum Diagnostic Quizzes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Test your understanding, detect cognitive misconceptions, and auto-update your Knowledge Map.
          </p>
        </div>

        <button
          onClick={() => setIsGeneratorOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Practice Quiz</span>
        </button>
      </div>

      {/* Featured Diagnostic Banner (Normalization) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#111827] to-emerald-950/20 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              High Priority Diagnostic
            </span>
            <span className="text-xs font-bold text-rose-400">Midterm Exam in 6 Days</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Database Normalization & Functional Dependency Diagnostics
          </h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Diagnoses 2NF vs 3NF partial and transitive dependency confusion. Automatically schedules revision and updates your Knowledge Map.
          </p>
        </div>

        <button
          onClick={() => navigate('/quizzes/quiz-normalization')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-transform active:scale-95 flex items-center gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Assessment</span>
        </button>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-600/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  {quiz.subject}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {quiz.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                {quiz.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-5">
                <span className="flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                  {quiz.questionCount} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  ~{quiz.estimatedMinutes} Mins
                </span>
              </div>

              {quiz.completed && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Last Score
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {quiz.lastScore} / {quiz.questionCount}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate(`/quizzes/${quiz.id}`)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-[#161F30] hover:bg-blue-600 dark:hover:bg-blue-600 border border-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>{quiz.completed ? 'Retake Assessment' : 'Start Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* AI Quiz Generator Modal */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Create Diagnostic Quiz
                </h3>
              </div>
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateQuiz} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="DBMS">Database Management Systems</option>
                  <option value="Python">Python Programming</option>
                  <option value="Data Structures">Data Structures & Algorithms</option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Specific Topic</label>
                <input
                  type="text"
                  required
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  placeholder="e.g. 2NF vs 3NF Normalization"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e: any) => setSelectedDifficulty(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Questions</label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value={3}>3 Questions (Quick Sprint)</option>
                    <option value={5}>5 Questions (Standard)</option>
                    <option value={10}>10 Questions (Deep Exam Prep)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGeneratorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Generate Assessment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
