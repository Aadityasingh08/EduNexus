import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { analyzeQuizPerformance } from '../../services/quizService';
import { QuizAttemptResult } from '../../types';
import {
  CheckSquare,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Calendar,
  Brain,
  ChevronRight,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const QuizRunnerPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quizzes, recordQuizAttempt, addStudySession, addToast } = useEduNexusStore();

  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<QuizAttemptResult | null>(null);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimeSpent((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const currentQ = quiz.questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100);

  const handleSelectOption = (answer: string | boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const handleNextOrSubmit = () => {
    if (currentQ.type === 'short_answer' && shortAnswerInput.trim()) {
      handleSelectOption(shortAnswerInput.trim());
      setShortAnswerInput('');
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      // Complete quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const result = analyzeQuizPerformance(quiz, userAnswers, timeSpent);
    setDiagnosticResult(result);
    setIsCompleted(true);

    // Record in global reactive store (updates knowledge map, adds revision session, updates profile)
    recordQuizAttempt(result);

    // Fire fireworks celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Safe fallback
    }
  };

  const formattedTime = `${Math.floor(timeSpent / 60)}:${String(timeSpent % 60).padStart(2, '0')}`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {!isCompleted ? (
        /* ACTIVE QUIZ SCREEN */
        <div className="space-y-6">
          {/* Top Progress & Info Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 bg-amber-600/10 border border-amber-500/20 px-3 py-1 rounded-full">
                {quiz.subject} • Diagnostic Assessment
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                {quiz.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111827] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span>{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-2 block">
                Topic: {currentQ.topic}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Answer Options */}
            {currentQ.type === 'mcq' && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = userAnswers[currentQ.id] === option;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-600/10 dark:bg-amber-950/40 border-amber-500 text-amber-500 dark:text-amber-400 font-semibold shadow-xs'
                          : 'bg-slate-50 dark:bg-[#161F30] hover:bg-slate-100 dark:hover:bg-[#1c273d] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'border-slate-300 dark:border-slate-700 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm">{option}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
                    </div>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-4">
                {[true, false].map((val) => {
                  const isSelected = userAnswers[currentQ.id] === val;
                  return (
                    <div
                      key={String(val)}
                      onClick={() => handleSelectOption(val)}
                      className={`p-5 rounded-2xl border text-center transition-all cursor-pointer font-bold text-sm ${
                        isSelected
                          ? 'bg-amber-600/10 dark:bg-amber-950/40 border-amber-500 text-amber-500 dark:text-amber-400'
                          : 'bg-slate-50 dark:bg-[#161F30] hover:bg-slate-100 dark:hover:bg-[#1c273d] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {val ? 'True' : 'False'}
                    </div>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'short_answer' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Type your concise technical answer (e.g. superkey)..."
                  value={shortAnswerInput || (userAnswers[currentQ.id] as string) || ''}
                  onChange={(e) => {
                    setShortAnswerInput(e.target.value);
                    handleSelectOption(e.target.value);
                  }}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            )}

            {/* Navigation / Next Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                {currentQuestionIndex < quiz.questions.length - 1
                  ? 'Answer is saved automatically.'
                  : 'Ready to calculate diagnostic mastery.'}
              </span>

              <button
                onClick={handleNextOrSubmit}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>
                  {currentQuestionIndex < quiz.questions.length - 1
                    ? 'Next Question'
                    : 'Submit & View Diagnostics'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* DIAGNOSTIC REPORT CARD */
        diagnosticResult && (
          <div className="space-y-6 animate-scale-up">
            {/* Celebration Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#111827] to-amber-950 border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
                  Diagnostic Assessment Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Score: {diagnosticResult.score} / {diagnosticResult.totalQuestions} ({diagnosticResult.accuracyPercent}%)
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  EduNexus has synchronized your performance across your Knowledge Map and updated your curriculum mastery.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {formattedTime}
                  </span>
                  <p className="text-[10px] text-slate-400">Time Spent</p>
                </div>
              </div>
            </div>

            {/* AI Misconception Diagnosis Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Brain className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Curriculum Diagnostic Analysis
                </h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                "{diagnosticResult.aiMisconceptionAnalysis}"
              </p>

              {/* Strong vs Weak Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mastered Topics:</span>
                  </div>
                  <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-1 list-disc list-inside">
                    {diagnosticResult.strongTopics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Needs Targeted Practice:</span>
                  </div>
                  <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-1 list-disc list-inside">
                    {diagnosticResult.weakTopics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/knowledge-map?highlight=node-dbms-norm')}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 text-slate-900 dark:text-white font-bold text-xs shadow-xs transition-all flex flex-col items-center justify-center text-center gap-2 group"
              >
                <Brain className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Open in Knowledge Map</span>
                <span className="text-[10px] text-slate-400">
                  Updated concept mastery node
                </span>
              </button>

              <button
                onClick={() => navigate('/study-plan')}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-slate-900 dark:text-white font-bold text-xs shadow-xs transition-all flex flex-col items-center justify-center text-center gap-2 group"
              >
                <Calendar className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>View Study Plan</span>
                <span className="text-[10px] text-slate-400">
                  Adaptive revision session queued
                </span>
              </button>

              <button
                onClick={() =>
                  navigate(`/tutor?topic=${encodeURIComponent(diagnosticResult.recommendedRevisionTopic || 'Normalization')}`)
                }
                className="p-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex flex-col items-center justify-center text-center gap-2 group"
              >
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Practice with Academic Tutor</span>
                <span className="text-[10px] text-amber-100">
                  Step-by-step clarification
                </span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
