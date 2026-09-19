import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceItem } from '../../types';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  X,
  Download,
  Bookmark,
  FileText,
  Video,
  BookOpen,
  FileCode,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Terminal,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Layers,
  Award,
  AlertCircle
} from 'lucide-react';

interface ResourceViewerModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceViewerModal: React.FC<ResourceViewerModalProps> = ({
  resource,
  onClose
}) => {
  const navigate = useNavigate();
  const { toggleSaveResource, addToast } = useEduNexusStore();

  const [activeTab, setActiveTab] = useState<'content' | 'cheatsheet' | 'interactive'>('content');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedText, setCopiedText] = useState(false);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(22);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Interactive sandbox state
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  // Lab assignment checklist state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: false,
    task3: false,
    task4: false
  });

  useEffect(() => {
    setCurrentPage(1);
    setActiveTab('content');
    setIsPlaying(false);
    setVideoProgress(22);
    setActiveChapterIndex(0);
    setCodeOutput(null);
  }, [resource?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  const handleToggleSave = () => {
    toggleSaveResource(resource.id);
  };

  const handleDownload = () => {
    const contentToDownload = `# ${resource.title}
Subject: ${resource.subject}
Module Topic: ${resource.topic}
Difficulty: ${resource.difficulty}
Estimated Study Time: ${resource.durationOrPages}
Resource Type: ${resource.type}

==================================================
1. EXECUTIVE SUMMARY
==================================================
${resource.summary}

==================================================
2. COMPREHENSIVE ACADEMIC CURRICULUM NOTES
==================================================
[EduNexus Academic Learning OS - Verified Standard]

SECTION I: THEORETICAL FOUNDATION & INVARIANTS
This module establishes formal invariants for ${resource.subject}, specifically focusing on ${resource.topic}.
Mastery of this topic guarantees proficiency in university examinations and industry system design interviews.

SECTION II: FORMULAS, THEOREMS & CANONICAL RULES
- Mathematical formalization
- Axiomatic derivations
- Asymptotic time and space complexities

SECTION III: STEP-BY-STEP WORKED EXAMPLES
Detailed step-by-step trace showing problem decomposition, edge case handling, and algorithmic verification.

SECTION IV: COMMON EXAM TRAPS & MISCONCEPTIONS
Identifies the top 5 areas where students lose marks during midterm and final assessments.

SECTION V: RAPID REVISION FLASHCARD SUMMARY
Key mnemonics and condensed formulas for night-before exam revision.

SECTION VI: PRACTICE PROBLEMS & MODEL SOLUTIONS
Exam-style questions with detailed grading rubrics.

---
Extracted from EduNexus Academic Learning Platform.
Downloaded on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([contentToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Complete_Notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Full 6-Page Study Notes Downloaded',
      message: `${resource.title} saved to your device.`
    });
  };

  const handleAskAITutor = () => {
    onClose();
    navigate(`/tutor?topic=${encodeURIComponent(resource.topic)}`);
    addToast({
      type: 'info',
      title: 'AI Tutor Initialized',
      message: `Tutor context updated for ${resource.topic}`
    });
  };

  const handleStartQuiz = () => {
    onClose();
    navigate('/quizzes');
    addToast({
      type: 'info',
      title: 'Quiz Center Opened',
      message: `Practice questions on ${resource.topic}`
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const pythonChapters = [
    {
      time: '00:00',
      title: 'Pure Functions & Referential Transparency',
      description: 'Why pure functions eliminate side effects, state mutation bugs, and enable parallel safety.'
    },
    {
      time: '04:15',
      title: 'Anonymous Lambdas & Lexical Closures',
      description: 'Single-expression lambda syntax, late-binding gotchas inside loops, and closure memory scope.'
    },
    {
      time: '10:30',
      title: 'map() vs List Comprehensions Benchmarks',
      description: 'Memory profiling: Lazy map iterator (112 bytes) vs eager list comprehension allocation (8.4 MB).'
    },
    {
      time: '16:00',
      title: 'filter() with Predicates & Generator Pipelines',
      description: 'Chaining declarative filter streams across massive dataset pipelines without intermediate allocations.'
    },
    {
      time: '20:45',
      title: 'functools.reduce() Folding & Accumulator Patterns',
      description: 'Cumulative aggregation, initial values, associative reduction, and NumPy vectorization trade-offs.'
    }
  ];

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput(`[EduNexus Academic Runtime Engine]
============================================================
Environment: Active Curriculum Sandbox (${resource.subject})
Executing: ${resource.subject.toLowerCase()}_solution_trace.py
------------------------------------------------------------
>>> Loading raw records and initializing memory structures...
>>> Verified Core Invariant: PASSED (All axioms satisfied)
>>> Computed Result:
    • Primary Metric: 96.4% Efficiency Score
    • Asymptotic Complexity: O(log N) Time | O(1) Auxiliary Space
    • Boundary Conditions: Handled [empty set, single node, max integer]
------------------------------------------------------------
SUCCESS: Execution completed in 34ms with exit code 0.`);
    }, 500);
  };

  // Determine subject for customized lengthy notes
  const sub = resource.subject;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl h-[94vh] max-h-[950px] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col text-slate-900 dark:text-slate-100">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#131d33]/90 backdrop-blur-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500">
              {resource.type === 'PDF' && <FileText className="w-5 h-5 text-rose-500" />}
              {resource.type === 'Video' && <Video className="w-5 h-5 text-amber-500" />}
              {resource.type === 'Article' && <BookOpen className="w-5 h-5 text-orange-500" />}
              {resource.type === 'Notes' && <Layers className="w-5 h-5 text-cyan-500" />}
              {resource.type === 'Assignment' && <FileCode className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {resource.subject} • {resource.type}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  6-Page Academic Edition • {resource.durationOrPages}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {resource.difficulty}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {resource.title}
              </h2>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleSave}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                resource.isSaved
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={resource.isSaved ? 'Saved to Bookmarks' : 'Save to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${resource.isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{resource.isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Download Full 6-Page Notes"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Export Notes</span>
            </button>

            <button
              onClick={handleAskAITutor}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs shadow-amber-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ask AI Tutor</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Subheader / Tabs */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'content'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {resource.type === 'Video' ? 'Video Player & Chapters' : 'Comprehensive Document Reader (6 Pages)'}
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'cheatsheet'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Formula Sheet & Exam Invariants
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Interactive Code Sandbox & Lab
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Quiz on {resource.topic}</span>
            </button>
          </div>
        </div>

        {/* Modal Main Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-[#0b1120]">
          
          {/* ==================================================== */}
          {/* TAB 1: MAIN CONTENT VIEWER */}
          {/* ==================================================== */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              
              {/* VIDEO PLAYER VIEW (For Video type) */}
              {resource.type === 'Video' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Video Screen & Player Controls */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between p-4 group">
                      
                      {/* Video Visualizer Canvas Simulation */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/40 via-slate-900 to-indigo-950/40 flex items-center justify-center pointer-events-none">
                        <div className="text-center space-y-3 p-6 max-w-md">
                          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 animate-pulse">
                            <Video className="w-8 h-8" />
                          </div>
                          <h4 className="text-base font-bold text-white tracking-wide">
                            {pythonChapters[activeChapterIndex].title}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono">
                            Timestamp: {pythonChapters[activeChapterIndex].time} / 24:00 • {resource.subject} Masterclass
                          </p>
                        </div>
                      </div>

                      {/* Video Top Bar Overlay */}
                      <div className="relative z-10 flex items-center justify-between text-xs text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span className="font-semibold">EduNexus HD Player • 1080p 60fps</span>
                        </div>
                        <span className="font-mono text-[11px] text-amber-400">
                          Chapter {activeChapterIndex + 1} of {pythonChapters.length}
                        </span>
                      </div>

                      {/* Video Bottom Controls Bar */}
                      <div className="relative z-10 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-2">
                        {/* Timeline Scrubber */}
                        <div 
                          className="h-2 w-full bg-white/20 hover:bg-white/30 rounded-full cursor-pointer relative overflow-hidden transition-all"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const pct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
                            setVideoProgress(pct);
                            const chapterIdx = Math.min(
                              pythonChapters.length - 1,
                              Math.floor((pct / 100) * pythonChapters.length)
                            );
                            setActiveChapterIndex(chapterIdx);
                          }}
                        >
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all" 
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-white">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center transition-transform active:scale-90"
                            >
                              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                            </button>

                            <button
                              onClick={() => {
                                setVideoProgress(0);
                                setActiveChapterIndex(0);
                              }}
                              className="text-white/70 hover:text-white"
                              title="Restart"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>

                            <span className="font-mono text-[11px] text-white/80">
                              {Math.floor((videoProgress / 100) * 24)}:{String(Math.floor(((videoProgress / 100) * 24 * 60) % 60)).padStart(2, '0')} / 24:00
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="text-white/70 hover:text-white p-1"
                            >
                              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                            </button>

                            <select
                              value={videoSpeed}
                              onChange={(e) => setVideoSpeed(Number(e.target.value))}
                              aria-label="Playback speed"
                              className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg px-2 py-1 outline-none border border-white/10 cursor-pointer"
                            >
                              <option value="0.75" className="text-slate-900">0.75x</option>
                              <option value="1" className="text-slate-900">1.0x Normal</option>
                              <option value="1.25" className="text-slate-900">1.25x</option>
                              <option value="1.5" className="text-slate-900">1.5x</option>
                              <option value="2" className="text-slate-900">2.0x</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Chapter Explainer Card */}
                    <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                          Current Segment Overview
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {pythonChapters[activeChapterIndex].time}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                        {pythonChapters[activeChapterIndex].title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {pythonChapters[activeChapterIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Chapter Timestamps List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Video Chapters & Topics
                      </h4>
                      <span className="text-[11px] text-amber-500 font-semibold">
                        5 Timestamps
                      </span>
                    </div>

                    <div className="space-y-2">
                      {pythonChapters.map((chap, idx) => {
                        const isActive = activeChapterIndex === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveChapterIndex(idx);
                              setVideoProgress(Math.round((idx / pythonChapters.length) * 100) + 2);
                            }}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              isActive
                                ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                                : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                                isActive ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}>
                                {chap.time}
                              </span>
                              {isActive && (
                                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider animate-pulse">
                                  Playing Now
                                </span>
                              )}
                            </div>
                            <h5 className={`text-xs font-bold mb-1 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
                              {chap.title}
                            </h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-normal">
                              {chap.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* MULTI-PAGE ACADEMIC READER (FOR ALL SUBJECTS: PDF, NOTES, ARTICLES, ASSIGNMENTS) */}
              {resource.type !== 'Video' && (
                <div className="space-y-4">
                  
                  {/* PDF / Document Toolbar Controls */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between flex-wrap gap-3">
                    
                    {/* Page Number Controls & Direct Selectors */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5, 6].map((pg) => (
                          <button
                            key={pg}
                            onClick={() => setCurrentPage(pg)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              currentPage === pg
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {pg}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Zoom Level Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setZoomLevel(z => Math.max(75, z - 10))}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-500 w-12 text-center">
                        {zoomLevel}%
                      </span>
                      <button
                        onClick={() => setZoomLevel(z => Math.min(130, z + 10))}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Complete Curriculum Standard (Page {currentPage} of 6)
                      </span>
                    </div>
                  </div>

                  {/* DOCUMENT PAGE CONTAINER */}
                  <div 
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-md max-w-4xl mx-auto space-y-6 transition-all"
                    style={{ fontSize: `${(zoomLevel / 100) * 14}px` }}
                  >
                    {/* Header of academic sheet */}
                    <div className="border-b-2 border-amber-500 pb-4 flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                          EduNexus Academic Repository • {resource.subject} Module
                        </span>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                          {resource.title}
                        </h1>
                      </div>
                      <div className="text-right font-mono text-xs text-slate-400">
                        <div>REF: EDX-{resource.subject.toUpperCase().replace(/\s+/g, '')}-0{currentPage}</div>
                        <div className="font-bold text-amber-500">Page {currentPage} of {totalPages}</div>
                      </div>
                    </div>

                    {/* ==================================================== */}
                    {/* PAGE 1: THEORETICAL FOUNDATION & INVARIANTS */}
                    {/* ==================================================== */}
                    {currentPage === 1 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-medium">
                          <strong>Core Syllabus Objective:</strong> Master the foundational definitions, historical evolution, formal axiomatic properties, and necessity of {resource.topic} within computer science systems.
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">1</span>
                          Theoretical Foundations & Problem Motivation
                        </h3>

                        <p className="text-xs sm:text-sm leading-relaxed">
                          In real-world computing environments, {resource.topic} represents an essential architectural pillar. Without understanding the fundamental mathematical and algorithmic constraints governing this domain, software architectures suffer from severe degradation—ranging from memory leaks and synchronization race conditions to relational update anomalies and exponential time complexity.
                        </p>

                        {/* Subject Specific Deep Dive */}
                        {sub === 'DBMS' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              Database Anomalies in Unnormalized Relational Schemas:
                            </h4>
                            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                              <table className="w-full text-xs text-left">
                                <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white">
                                  <tr>
                                    <th className="p-3">Anomaly Type</th>
                                    <th className="p-3">Theoretical Root Cause</th>
                                    <th className="p-3">Concrete Industrial Failure</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                  <tr>
                                    <td className="p-3 font-semibold text-rose-500">Insertion Anomaly</td>
                                    <td className="p-3">Entity Primary Key requires values for unrelated dependent tuples.</td>
                                    <td className="p-3">Cannot register a new Course unless at least one Student has enrolled.</td>
                                  </tr>
                                  <tr>
                                    <td className="p-3 font-semibold text-rose-500">Deletion Anomaly</td>
                                    <td className="p-3">Collateral loss of independent entity data during tuple removal.</td>
                                    <td className="p-3">Deleting the sole student in Robotics deletes the entire Robotics department profile.</td>
                                  </tr>
                                  <tr>
                                    <td className="p-3 font-semibold text-rose-500">Update Anomaly</td>
                                    <td className="p-3">Data redundancy across multiple records causes partial state drift.</td>
                                    <td className="p-3">Changing Professor office requires 4,000 row updates; partial failure creates inconsistent database state.</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {sub === 'Data Structures' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              Binary Search Invariant & Degeneration to Linked List:
                            </h4>
                            <p className="text-xs sm:text-sm">
                              A Binary Search Tree enforces the ordering invariant: for any node $v$, all keys in the left subtree are strictly less than $key(v)$, and all keys in the right subtree are greater than or equal to $key(v)$.
                            </p>
                            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs">
                              Worst-case Degeneration Example:<br />
                              Inserting sorted sequence: [10, 20, 30, 40, 50]<br />
                              10 -&gt; right: 20 -&gt; right: 30 -&gt; right: 40 -&gt; right: 50<br />
                              Height = O(N) | Search Time = O(N) [Unbalanced BST fails its primary purpose!]
                            </div>
                          </div>
                        )}

                        {sub === 'Computer Networks' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              Layer 4 End-to-End Transport Responsibilities:
                            </h4>
                            <p className="text-xs sm:text-sm">
                              While the Network Layer (IP) provides best-effort, host-to-host datagram routing across intermediate routers, the Transport Layer provides process-to-process communication multiplexing via port numbers (0 to 65535) and reliability guarantees.
                            </p>
                          </div>
                        )}

                        {sub !== 'DBMS' && sub !== 'Data Structures' && sub !== 'Computer Networks' && (
                          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              System Architecture Overview for {resource.subject}:
                            </h4>
                            <p className="text-xs">
                              {resource.summary}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* PAGE 2: MATHEMATICAL FORMULATIONS & ARCHITECTURE */}
                    {/* ==================================================== */}
                    {currentPage === 2 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">2</span>
                          Mathematical Formulations, Invariants & Axioms
                        </h3>

                        {sub === 'DBMS' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1.5">
                              <span className="text-amber-400 font-bold">// Armstrong\'s Axioms (Sound and Complete Inference Rules):</span><br />
                              1. Reflexivity: If Y ⊆ X, then X → Y.<br />
                              2. Augmentation: If X → Y, then XZ → YZ for any attribute set Z.<br />
                              3. Transitivity: If X → Y and Y → Z, then X → Z.<br />
                              4. Union (Derived): If X → Y and X → Z, then X → YZ.<br />
                              5. Decomposition (Derived): If X → YZ, then X → Y and X → Z.
                            </div>

                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Attribute Closure Algorithm $X^+$:
                            </h4>
                            <p>
                              Given functional dependency set $F$, the attribute closure $X^+$ determines all attributes uniquely determined by $X$.
                              A set of attributes $K$ is a <strong>Candidate Key</strong> if and only if:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>$K^+ = R$ (K determines all attributes in the relation).</li>
                              <li>No proper subset $K\' \subset K$ satisfies $(K\')^+ = R$ (Minimality condition).</li>
                            </ul>
                          </div>
                        )}

                        {sub === 'Data Structures' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-2">
                              <div className="font-bold text-amber-600 dark:text-amber-400">// AVL Height Balance Invariant Theorem</div>
                              <div>BalanceFactor(v) = Height(v.left) - Height(v.right) ∈ {"{-1, 0, +1}"}</div>
                              <div>Height of empty tree = 0; Height of leaf node = 1.</div>
                            </div>
                            <p>
                              Adelson-Velsky and Landis (1962) proved that the maximum height of an AVL tree containing $N$ nodes satisfies:
                              $$H(N) &lt; 1.4404 \\log_2(N + 2) - 0.328$$
                              This guarantees that search, insertion, and deletion always run strictly in $O(\\log N)$ time, preventing worst-case $O(N)$ degeneration.
                            </p>
                          </div>
                        )}

                        {sub === 'Computer Networks' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Bandwidth-Delay Product (BDP) & TCP Window Scaling:
                            </h4>
                            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                              <div>BDP = Bottleneck Bandwidth (bits/sec) × Round Trip Time (seconds)</div>
                              <div>Example: 10 Gbps link with 50ms RTT:</div>
                              <div>BDP = (10 × 10^9 bits/sec) × (0.050 sec) = 500,000,000 bits = 62.5 Megabytes!</div>
                              <div>Because standard TCP header window size field is only 16 bits (max 65,535 bytes),</div>
                              <div>TCP Window Scaling Option (RFC 1323) must be negotiated during handshake!</div>
                            </div>
                          </div>
                        )}

                        {sub !== 'DBMS' && sub !== 'Data Structures' && sub !== 'Computer Networks' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Core Mechanics & Formal Invariants:
                            </h4>
                            <p>
                              All operations on {resource.topic} adhere to determinism, type safety, and memory lifecycle bounds.
                              Evaluating state transitions requires constant validation against the underlying runtime invariant.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* PAGE 3: STEP-BY-STEP WORKED EXAMPLES */}
                    {/* ==================================================== */}
                    {currentPage === 3 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">3</span>
                          Comprehensive Step-by-Step Worked Problems
                        </h3>

                        {sub === 'DBMS' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
                              <span className="font-bold text-amber-500 uppercase font-mono">Exam Problem:</span>
                              <p className="font-mono">Relation R(A, B, C, D, E, F) with FDs: {"{ A -> B, (B, C) -> D, D -> E, E -> F, A -> C }"}</p>
                              <p>Step 1: Compute closure of A: $A^+ = {"{A, B, C, D, E, F}"}$. Since $A^+$ contains all attributes, $A$ is a Candidate Key!</p>
                              <p>Step 2: Check 2NF: No composite keys, so 2NF is automatically satisfied.</p>
                              <p>Step 3: Check 3NF: For $D \rightarrow E$, is $D$ a superkey? No ($D^+ = {"{D, E, F}"}$). Is $E$ a prime attribute? No ($E \notin {"{A}"}$). Therefore, **R violates 3NF** due to transitive dependency!</p>
                              <p>Step 4: 3NF Decomposition: Split into $R_1(D, E)$, $R_2(E, F)$, $R_3(A, B, C, D)$. All relations are now in 3NF and preserve dependencies!</p>
                            </div>
                          </div>
                        )}

                        {sub === 'Data Structures' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Worked Rotation Trace: Left-Right (LR) Double Rotation
                            </h4>
                            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                              Initial state after inserting [30, 10, 20]:<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;30 (BF = +2) &lt;-- Unbalanced!<br />
                              &nbsp;&nbsp;&nbsp;/ <br />
                              &nbsp;&nbsp;10 (BF = -1) &lt;-- LR condition detected!<br />
                              &nbsp;&nbsp;&nbsp;\ <br />
                              &nbsp;&nbsp;&nbsp;20<br /><br />
                              Step 1: Left-rotate on child (10):<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;30<br />
                              &nbsp;&nbsp;&nbsp;/ <br />
                              &nbsp;&nbsp;20<br />
                              &nbsp;/ <br />
                              10<br /><br />
                              Step 2: Right-rotate on root (30):<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;20 (BF = 0) [Balanced AVL Tree!]<br />
                              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\<br />
                              &nbsp;&nbsp;10&nbsp;&nbsp;30
                            </div>
                          </div>
                        )}

                        {sub === 'Computer Networks' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Wireshark Packet Capture Breakdown of TCP Handshake:
                            </h4>
                            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1.5">
                              Frame 1: Client -&gt; Server [SYN] Seq=1000000000 Ack=0 Window=64240 MSS=1460<br />
                              Frame 2: Server -&gt; Client [SYN, ACK] Seq=2000000000 Ack=1000000001 Window=65535 MSS=1460<br />
                              Frame 3: Client -&gt; Server [ACK] Seq=1000000001 Ack=2000000001 Window=64240<br />
                              Connection State Transition: CLOSED -&gt; SYN_SENT -&gt; ESTABLISHED
                            </div>
                          </div>
                        )}

                        {sub !== 'DBMS' && sub !== 'Data Structures' && sub !== 'Computer Networks' && (
                          <div className="space-y-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white">
                              Step-by-Step Implementation Trace:
                            </h4>
                            <p>
                              Deconstructing {resource.topic} through iterative state transitions provides full visibility into boundary edge cases and performance execution.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* PAGE 4: EDGE CASES & EXAM PITFALLS */}
                    {/* ==================================================== */}
                    {currentPage === 4 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">4</span>
                          Critical Edge Cases, Trade-offs & Exam Traps
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                            <span className="font-bold text-rose-600 dark:text-rose-400 uppercase font-mono flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4" />
                              Top 3 Common Exam Mistakes:
                            </span>
                            <ul className="list-disc pl-4 space-y-1.5 text-rose-900 dark:text-rose-200">
                              <li>Confusing 2NF with 3NF when candidate keys are single-column (2NF is always satisfied if candidate key is 1 column!).</li>
                              <li>Assuming BCNF decomposition always preserves dependencies. BCNF guarantees lossless join, but does NOT guarantee dependency preservation!</li>
                              <li>Overlooking the transitive dependency condition: $X \to Y$ is valid in 3NF if $Y$ is a prime attribute.</li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono flex items-center gap-1.5">
                              <Award className="w-4 h-4" />
                              Proven Exam Scoring Strategies:
                            </span>
                            <ul className="list-disc pl-4 space-y-1.5 text-emerald-900 dark:text-emerald-200">
                              <li>Always state the candidate key explicitly before arguing any normal form violation.</li>
                              <li>Draw the functional dependency graph with arrows to visualize transitive chains instantly.</li>
                              <li>Verify lossless join using the intersection rule: $(R_1 \cap R_2) \to R_1$ or $(R_1 \cap R_2) \to R_2$.</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            The Classic BCNF Dependency Loss Counterexample:
                          </h4>
                          <p>
                            Consider table <code className="font-mono text-amber-500 font-bold">Address(Street, City, ZipCode)</code> with FDs:
                            <br />
                            1. <code className="font-mono">{"(Street, City) -> ZipCode"}</code> (Candidate Key: Street, City)
                            <br />
                            2. <code className="font-mono">{"ZipCode -> City"}</code> (Zip determines City)
                            <br />
                            In 3NF: City is prime (part of key {"{Street, City}"}), so relation is in 3NF!
                            <br />
                            In BCNF: For <code className="font-mono">ZipCode -&gt; City</code>, ZipCode is NOT a superkey. Decomposing into <code className="font-mono">(ZipCode, City)</code> and <code className="font-mono">(Street, ZipCode)</code> loses the dependency <code className="font-mono">(Street, City) -&gt; ZipCode</code>!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* PAGE 5: HIGH-YIELD REVISION CHEAT SHEET */}
                    {/* ==================================================== */}
                    {currentPage === 5 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">5</span>
                          High-Yield Revision Matrix & Summary Table
                        </h3>

                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white">
                              <tr>
                                <th className="p-3">Level / Normal Form</th>
                                <th className="p-3">Core Condition Required</th>
                                <th className="p-3">Disallowed Pattern</th>
                                <th className="p-3">Lossless Join?</th>
                                <th className="p-3">Preserves FDs?</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                              <tr>
                                <td className="p-3 font-bold text-amber-600 dark:text-amber-400">1NF</td>
                                <td className="p-3">Atomic values, Primary Key defined</td>
                                <td className="p-3 text-rose-500">Repeating arrays, nested tables</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                              </tr>
                              <tr>
                                <td className="p-3 font-bold text-amber-600 dark:text-amber-400">2NF</td>
                                <td className="p-3">1NF + No partial dependencies</td>
                                <td className="p-3 text-rose-500">Non-prime attribute depends on subset of key</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                              </tr>
                              <tr>
                                <td className="p-3 font-bold text-amber-600 dark:text-amber-400">3NF</td>
                                <td className="p-3">2NF + For every X-&gt;Y, X is Superkey OR Y is Prime</td>
                                <td className="p-3 text-rose-500">Transitive dependency (Non-key -&gt; Non-key)</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                              </tr>
                              <tr className="bg-amber-500/5">
                                <td className="p-3 font-bold text-amber-500">BCNF</td>
                                <td className="p-3">For EVERY non-trivial X-&gt;Y, X MUST be a Superkey</td>
                                <td className="p-3 text-rose-500">Any FD where LHS is not a Superkey</td>
                                <td className="p-3 text-emerald-500 font-bold">Yes</td>
                                <td className="p-3 text-rose-500 font-bold">Not always guaranteed!</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                          <strong className="text-amber-600 dark:text-amber-400">Night-Before-Exam Mnemonic:</strong>
                          <p className="mt-1">
                            <em>"1NF is about individual cells (atomic). 2NF is about parts of the key (full dependency). 3NF is about passing through other columns (no transitives). BCNF is about keys strictly ruling every dependency."</em>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* PAGE 6: PRACTICE PROBLEMS & MODEL SOLUTIONS */}
                    {/* ==================================================== */}
                    {currentPage === 6 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">6</span>
                          Exam-Style Practice Problems & Model Solutions
                        </h3>

                        <div className="space-y-4 text-xs sm:text-sm">
                          {/* Problem 1 */}
                          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-500 font-mono uppercase">Practice Problem 1:</span>
                              <span className="text-[11px] font-semibold text-slate-400">University Midterm Standard</span>
                            </div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              Given Relation R(P, Q, R, S, T) with FDs: {"{ P -> Q, (P, R) -> S, S -> T, T -> R }"}. Find all Candidate Keys.
                            </p>
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                              <span className="text-emerald-500 font-bold font-mono">Model Solution:</span>
                              <p>1. Attributes not appearing on RHS: P. Therefore, P must be in every candidate key.</p>
                              <p>2. $P^+ = {"{P, Q}"}$. Does not cover all attributes. We must augment P with another attribute.</p>
                              <p>3. Check $(P, R)^+ = {"{P, R, Q, S, T}"} = R$. Minimal candidate key #1: **(P, R)**.</p>
                              <p>4. Since $T \rightarrow R$, replace R with T: $(P, T)^+ = {"{P, T, R, Q, S}"} = R$. Minimal candidate key #2: **(P, T)**.</p>
                              <p>5. Since $S \rightarrow T$, replace T with S: $(P, S)^+ = {"{P, S, T, R, Q}"} = R$. Minimal candidate key #3: **(P, S)**.</p>
                              <p className="font-bold text-amber-500">Final Candidate Keys: {"{(P, R), (P, T), (P, S)}"}. Prime Attributes: {"{P, R, S, T}"}.</p>
                            </div>
                          </div>

                          {/* Problem 2 */}
                          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-500 font-mono uppercase">Practice Problem 2:</span>
                              <span className="text-[11px] font-semibold text-slate-400">Final Exam Standard</span>
                            </div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              Prove whether relation R(A, B, C) with FDs: {"{ (A, B) -> C, C -> A }"} is in 3NF and BCNF.
                            </p>
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                              <span className="text-emerald-500 font-bold font-mono">Model Solution:</span>
                              <p>Candidate Keys: $(A, B)$ and $(B, C)$. Prime attributes: {"{A, B, C}"}.</p>
                              <p>For $(A, B) \rightarrow C$: LHS is superkey (Satisfies both 3NF and BCNF).</p>
                              <p>For $C \rightarrow A$: LHS ($C$) is NOT a superkey. BUT RHS ($A$) is a prime attribute!</p>
                              <p className="font-bold text-emerald-500">Conclusion: R is strictly in 3NF, but VIOLATES BCNF!</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                          <button
                            onClick={handleDownload}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <Download className="w-4 h-4 text-amber-500" />
                            <span>Export All 6 Pages</span>
                          </button>

                          <button
                            onClick={handleAskAITutor}
                            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                          >
                            <Brain className="w-4 h-4" />
                            <span>Ask AI Tutor to Test Me</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: FORMULA SHEET & EXAM INVARIANTS */}
          {/* ==================================================== */}
          {activeTab === 'cheatsheet' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    High-Yield Revision Formula & Cheat Sheet ({resource.subject})
                  </h3>
                  <button
                    onClick={handleDownload}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Full Sheet
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase font-mono">
                      Module Executive Summary
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {resource.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase font-mono">
                      Syllabus Placement
                    </span>
                    <div className="text-xs space-y-1">
                      <div><strong>Discipline:</strong> {resource.subject}</div>
                      <div><strong>Active Topic:</strong> {resource.topic}</div>
                      <div><strong>Mastery Weight:</strong> High-Yield Core Topic</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Frequently Tested Exam Theorems:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Lossless Decomposition Test:</strong> Relation split into $R_1$ and $R_2$ is lossless if and only if $(R_1 \cap R_2) \rightarrow R_1$ or $(R_1 \cap R_2) \rightarrow R_2$.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Dependency Preservation:</strong> $(F_1 \cup F_2)^+ = F^+$. If BCNF loses dependencies, 3NF is preserved instead.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Canonical Cover $F_c$:</strong> Eliminate extraneous attributes and redundant dependencies using minimal cover algorithm.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: INTERACTIVE CODE SANDBOX & LAB */}
          {/* ==================================================== */}
          {activeTab === 'interactive' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Interactive Code Sandbox • {resource.subject}
                    </h3>
                  </div>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {isRunningCode ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Executing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Simulation</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-slate-400 text-[11px]">
                    <span>{resource.subject.toLowerCase().replace(/\s+/g, '_')}_sandbox.py</span>
                    <button
                      onClick={() => copyToClipboard(`# EduNexus Academic Sandbox
# Subject: ${resource.subject} - ${resource.topic}

def compute_solution_trace(data):
    """
    Executes algorithmic pipeline verifying invariants for ${resource.topic}
    """
    print("Validating input domain...")
    return True`)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="p-4 text-emerald-300 overflow-x-auto leading-relaxed">
                    <pre>{`# EduNexus Academic Learning Platform - Interactive Sandbox
# Subject: ${resource.subject} | Module: ${resource.topic}

def verify_curriculum_invariants():
    """
    Simulates academic constraints and checks asymptotic efficiency
    """
    records = [
        {"id": 101, "metric": "Candidate Key Verified", "score": 98.2},
        {"id": 102, "metric": "Lossless Join Preserved", "score": 94.6},
        {"id": 103, "metric": "No Transitive Dependencies", "score": 91.0}
    ]
    
    # Declarative stream validation
    passing = [r for r in records if r["score"] >= 90.0]
    print(f"Verified {len(passing)} core invariants successfully.")
    return True

verify_curriculum_invariants()`}</pre>
                  </div>
                </div>

                {/* Console Output */}
                {codeOutput && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap animate-fade-in">
                    {codeOutput}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span>Subject: <strong className="text-slate-800 dark:text-slate-200">{resource.subject}</strong></span>
            <span>•</span>
            <span>Topic: <strong className="text-slate-800 dark:text-slate-200">{resource.topic}</strong></span>
            <span>•</span>
            <span>Edition: <strong className="text-amber-500">6-Page University Revision</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAskAITutor}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold transition-all flex items-center gap-1.5"
            >
              <Brain className="w-3.5 h-3.5 text-amber-500" />
              <span>Discuss with AI Tutor</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-xs"
            >
              Done Reading
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
