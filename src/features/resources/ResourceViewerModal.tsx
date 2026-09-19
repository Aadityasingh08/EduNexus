import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceItem } from '../../types';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  X,
  ExternalLink,
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
  Maximize2,
  Volume2,
  VolumeX,
  Award,
  Layers,
  HelpCircle,
  Code
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

  // Navigation & viewer states
  const [activeTab, setActiveTab] = useState<'content' | 'cheatsheet' | 'interactive'>('content');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedText, setCopiedText] = useState(false);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(18); // percent
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Code runner state for Python video
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  // Assignment checklist state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: false,
    task3: false
  });

  useEffect(() => {
    // Reset page and tab when resource changes
    setCurrentPage(1);
    setActiveTab('content');
    setIsPlaying(false);
    setVideoProgress(18);
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
Type: ${resource.type}
Difficulty: ${resource.difficulty}
Summary: ${resource.summary}

---
EduNexus Academic Learning OS Notes
Extracted for student revision.
Downloaded on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([contentToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Resource Downloaded',
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

  // Video chapters for Python Functional Programming
  const pythonChapters = [
    {
      time: '00:00',
      title: 'Introduction to Pure Functions & Immutability',
      description: 'Why pure functions prevent state leakage and make concurrent code bug-free.'
    },
    {
      time: '04:15',
      title: 'Anonymous Lambdas: Syntax & Limitations',
      description: 'Single-expression lambda semantics, inline arguments, and scoping rules.'
    },
    {
      time: '10:30',
      title: 'map() vs List Comprehensions Benchmark',
      description: 'Memory efficiency of lazy map iterators compared to eager list comprehension allocations.'
    },
    {
      time: '16:00',
      title: 'filter() with Predicate Functions',
      description: 'Constructing high-performance boolean filters on large streaming datasets.'
    },
    {
      time: '20:45',
      title: 'functools.reduce() Deep Dive',
      description: 'Accumulators, initial values, and folding sequences into composite results.'
    }
  ];

  // Run mock python code
  const handleRunPythonCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput(`[EduNexus Python 3.12 Runtime]
=========================================
Executing: functional_pipeline.py
>>> Raw Students Data: 4 records loaded
>>> Filtered Passing Grades (>= 75): ['Aaditya (92)', 'Maya (88)', 'Dev (79)']
>>> Transformed with map() & lambda (Curves Applied):
    {'name': 'Aaditya', 'curved_score': 96.6}
    {'name': 'Maya', 'curved_score': 92.4}
    {'name': 'Dev', 'curved_score': 82.9}
>>> Aggregate Class Weighted Average (via functools.reduce): 90.63%
-----------------------------------------
Process finished with exit code 0 (Execution: 42ms)`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl h-[92vh] max-h-[900px] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col text-slate-900 dark:text-slate-100">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#131d33]/80 backdrop-blur-xs flex items-center justify-between gap-4">
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
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {resource.subject} • {resource.type}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {resource.durationOrPages}
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
              title="Download Material"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleAskAITutor}
              className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs shadow-amber-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
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
        <div className="px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'content'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {resource.type === 'Video' ? 'Video Player & Chapters' : 'Document Reader'}
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'cheatsheet'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Key Takeaways & Formulas
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {resource.type === 'Assignment' ? 'Lab Workspace' : 'Interactive Code / Practice'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice Quiz on {resource.topic}</span>
            </button>
          </div>
        </div>

        {/* Modal Main Viewport (Scrollable) */}
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
                    <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between p-4 group">
                      
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
                            Timestamp: {pythonChapters[activeChapterIndex].time} / 24:00 • Python 3.12
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
                      <div className="relative z-10 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-2">
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
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
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

              {/* PDF & NOTES READER (For PDF & Notes types) */}
              {(resource.type === 'PDF' || resource.type === 'Notes') && (
                <div className="space-y-4">
                  {/* PDF Toolbar Controls */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono font-semibold px-2">
                        Page <span className="font-bold text-amber-500">{currentPage}</span> of 4
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(4, p + 1))}
                        disabled={currentPage >= 4}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

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
                        onClick={() => setZoomLevel(z => Math.min(140, z + 10))}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Syllabus Notes
                      </span>
                    </div>
                  </div>

                  {/* PDF Document Page Container */}
                  <div 
                    className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-md max-w-4xl mx-auto space-y-6 transition-all"
                    style={{ fontSize: `${(zoomLevel / 100) * 14}px` }}
                  >
                    {/* Header of academic sheet */}
                    <div className="border-b-2 border-amber-500 pb-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                          EduNexus Academic Repository • Curriculum Standard
                        </span>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                          {resource.title}
                        </h1>
                      </div>
                      <div className="text-right font-mono text-xs text-slate-400">
                        <div>REF: EDX-{resource.subject.toUpperCase()}-001</div>
                        <div>Sheet Page {currentPage} of 4</div>
                      </div>
                    </div>

                    {/* Dynamic Page Content Based on Page Number */}
                    {currentPage === 1 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-medium">
                          <strong>Core Objective:</strong> Understand why database anomalies occur in unnormalized schemas, identify Functional Dependencies (FDs), and apply First Normal Form (1NF) decomposition.
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">1</span>
                          Database Anomalies in Denormalized Relations
                        </h3>

                        <p className="text-xs leading-relaxed">
                          When a database schema is poorly designed, redundancy leads to severe operational hazards during everyday SQL transactions:
                        </p>

                        {/* Anomalies Table */}
                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white">
                              <tr>
                                <th className="p-2.5">Anomaly Type</th>
                                <th className="p-2.5">Real-world Consequence</th>
                                <th className="p-2.5">Mitigation Mechanism</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                              <tr>
                                <td className="p-2.5 font-semibold text-rose-500">Insertion Anomaly</td>
                                <td className="p-2.5">Cannot add a course until at least one student enrolls because Student_ID is part of primary key.</td>
                                <td className="p-2.5 font-mono text-[11px]">Decompose into independent entities</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-semibold text-rose-500">Deletion Anomaly</td>
                                <td className="p-2.5">Deleting the last student enrolled in a department inadvertently deletes the entire department record.</td>
                                <td className="p-2.5 font-mono text-[11px]">Separate master and transaction tables</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-semibold text-rose-500">Update Anomaly</td>
                                <td className="p-2.5">Changing a professor's office phone requires updating 5,000 course rows. Incomplete updates yield inconsistent data.</td>
                                <td className="p-2.5 font-mono text-[11px]">Eliminate transitive dependencies</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">
                          First Normal Form (1NF) Rules:
                        </h3>
                        <ul className="list-disc pl-5 text-xs space-y-1.5">
                          <li>Every attribute value must be <strong>atomic</strong> (no multivalued attributes like comma-separated telephone numbers or nested JSON arrays).</li>
                          <li>Each row must be unique and identifiable by a Primary Key.</li>
                          <li>Column values must belong to the exact domain type specified in schema.</li>
                        </ul>
                      </div>
                    )}

                    {currentPage === 2 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">2</span>
                          Second Normal Form (2NF) & Partial Dependency
                        </h3>

                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
                          <div className="text-amber-500 font-bold">// Formal Rule of 2NF</div>
                          <div>A relation R is in 2NF if and only if:</div>
                          <div>1. R is in 1NF.</div>
                          <div>2. No non-prime attribute is partially dependent on any candidate key of R.</div>
                        </div>

                        <p className="text-xs leading-relaxed">
                          <strong>What is a Partial Dependency?</strong> If a table has a composite primary key <code className="text-amber-500 font-bold font-mono">{"{StudentID, CourseID}"}</code>, and attribute <code className="text-amber-500 font-bold font-mono">CourseName</code> depends only on <code className="text-amber-500 font-bold font-mono">CourseID</code> (a proper subset of the primary key), then it violates 2NF!
                        </p>

                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
                          <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Step-by-step Decomposition into 2NF:</h4>
                          <p>1. Identify composite candidate keys: <span className="font-mono font-bold">{"{StudentID, CourseID}"}</span>.</p>
                          <p>2. Extract partially dependent attributes into a new relation: <span className="font-mono font-bold">COURSES(CourseID, CourseName, Credits)</span>.</p>
                          <p>3. Keep only primary key and fully dependent attributes: <span className="font-mono font-bold">ENROLLMENTS(StudentID, CourseID, Grade)</span>.</p>
                        </div>
                      </div>
                    )}

                    {currentPage === 3 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">3</span>
                          Third Normal Form (3NF) & Transitive Dependencies
                        </h3>

                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
                          <div className="text-amber-500 font-bold">// Formal Condition for 3NF</div>
                          <div>A relation R is in 3NF if for every functional dependency X -&gt; Y:</div>
                          <div>• Either X is a Superkey, OR</div>
                          <div>• Y is a Prime Attribute (member of a candidate key).</div>
                        </div>

                        <p className="text-xs leading-relaxed">
                          <strong>Transitive Dependency:</strong> If <code className="font-mono text-amber-500 font-bold">A -&gt; B</code> and <code className="font-mono text-amber-500 font-bold">B -&gt; C</code>, then <code className="font-mono text-amber-500 font-bold">A -&gt; C</code> is transitive. For example:
                          <br />
                          <code className="font-mono text-slate-800 dark:text-slate-200">StudentID -&gt; DeptID</code> and <code className="font-mono text-slate-800 dark:text-slate-200">DeptID -&gt; DeptBuilding</code>.
                          <br />
                          <code className="font-mono text-rose-500">DeptBuilding</code> transitively depends on <code className="font-mono text-rose-500">StudentID</code> through <code className="font-mono text-rose-500">DeptID</code>.
                        </p>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                          <strong className="text-amber-600 dark:text-amber-400">Exam Trick:</strong> 3NF preserves functional dependencies while guaranteeing a lossless-join decomposition!
                        </div>
                      </div>
                    )}

                    {currentPage === 4 && (
                      <div className="space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">4</span>
                          Boyce-Codd Normal Form (BCNF) Comparison Matrix
                        </h3>

                        <p className="text-xs leading-relaxed">
                          BCNF is a stricter version of 3NF. In BCNF, for every functional dependency <code className="font-mono text-amber-500 font-bold">X -&gt; Y</code>, <code className="font-mono text-amber-500 font-bold">X</code> <strong>MUST</strong> be a Superkey. There is no second clause for prime attributes!
                        </p>

                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white">
                              <tr>
                                <th className="p-2.5">Normal Form</th>
                                <th className="p-2.5">Disallows</th>
                                <th className="p-2.5">Lossless Join?</th>
                                <th className="p-2.5">Dependency Preserving?</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                              <tr>
                                <td className="p-2.5 font-bold">1NF</td>
                                <td className="p-2.5">Non-atomic attributes</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-bold">2NF</td>
                                <td className="p-2.5">Partial dependencies</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-bold">3NF</td>
                                <td className="p-2.5">Transitive dependencies</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                              </tr>
                              <tr className="bg-amber-500/5">
                                <td className="p-2.5 font-bold text-amber-500">BCNF</td>
                                <td className="p-2.5">Any FD where LHS is not a Superkey</td>
                                <td className="p-2.5 text-emerald-500 font-semibold">Yes</td>
                                <td className="p-2.5 text-rose-500 font-semibold">Not always guaranteed!</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                          <button
                            onClick={handleAskAITutor}
                            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                          >
                            <Brain className="w-4 h-4" />
                            <span>Ask AI Tutor to test me on BCNF</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ARTICLE READER (For Article type, e.g. SQL Query Optimization) */}
              {resource.type === 'Article' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <span className="text-[11px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                        Advanced Systems Deep-Dive • Relational Engines
                      </span>
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {resource.title}
                      </h1>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          12 min read
                        </span>
                        <span>•</span>
                        <span>PostgreSQL 16 & MySQL 8.4 Engine Internals</span>
                      </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                      <p>
                        In production relational databases, writing queries is easy; writing queries that execute in sub-10 milliseconds across tables with tens of millions of rows requires understanding the query planner and indexing data structures.
                      </p>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        1. Clustered vs Non-Clustered B-Tree Indices
                      </h3>
                      <p>
                        A <strong>Clustered Index</strong> dictates the physical sorting order of rows on disk (such as InnoDB's Primary Key). Because data pages are physically organized by this key, range queries like <code className="font-mono text-amber-500">WHERE id BETWEEN 1000 AND 2000</code> require zero extra disk seeks.
                      </p>
                      <p>
                        A <strong>Non-Clustered (Secondary) Index</strong> maintains an independent B-Tree where leaf nodes store pointers back to the clustered index key. Performing a query that selects columns not present in the secondary index triggers a <em>Bookmark / Key Lookup</em>, which can degrade throughput on high concurrent load.
                      </p>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        2. The Leftmost Prefix Rule & Compound Indexes
                      </h3>
                      <p>
                        If you create a composite index on <code className="font-mono text-amber-500">(tenant_id, created_at, status)</code>:
                      </p>
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                        <span className="text-emerald-400">-- Uses Index Efficiently (Range Scan):</span><br />
                        SELECT * FROM events WHERE tenant_id = 42 AND created_at &gt; '2026-01-01';<br /><br />
                        <span className="text-rose-400">-- CANNOT Use Index (Skips Leftmost column tenant_id):</span><br />
                        SELECT * FROM events WHERE status = 'PENDING';
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        3. Reading EXPLAIN ANALYZE Output
                      </h3>
                      <p>
                        Never guess what the engine is doing. Run <code className="font-mono text-amber-500">EXPLAIN (ANALYZE, BUFFERS)</code> to see the exact execution plan:
                      </p>
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                        Index Scan using idx_events_tenant on events  (cost=0.43..8.45 rows=1 width=72) (actual time=0.041..0.043 rows=1 loops=1)<br />
                        &nbsp;&nbsp;Index Cond: (tenant_id = 42)<br />
                        &nbsp;&nbsp;Buffers: shared hit=4<br />
                        Planning Time: 0.082 ms<br />
                        Execution Time: 0.061 ms
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ASSIGNMENT VIEW (For Assignment type, e.g. Wireshark Lab) */}
              {resource.type === 'Assignment' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
                          Practical Lab Assignment • Hands-on Networking
                        </span>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                          {resource.title}
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                          Estimated Duration: 45 minutes • Packet Capture Analysis
                        </p>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                        Status: Due in 4 Days
                      </div>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Lab Tasks & Deliverables Checklist
                      </h3>

                      <div className="space-y-2.5">
                        <div 
                          onClick={() => toggleTask('task1')}
                          className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                            completedTasks.task1
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-50 dark:bg-[#161F30] border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={completedTasks.task1} 
                            onChange={() => {}}
                            aria-label="Capture 3-Way Handshake task"
                            className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="font-bold">Task 1: Capture 3-Way Handshake</span>
                            <p className="text-xs opacity-80">Filter for SYN, SYN-ACK, ACK and record initial sequence numbers (ISNs).</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => toggleTask('task2')}
                          className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                            completedTasks.task2
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-50 dark:bg-[#161F30] border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={completedTasks.task2} 
                            onChange={() => {}}
                            aria-label="Calculate TCP Window Scaling and MSS task"
                            className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="font-bold">Task 2: Calculate TCP Window Scaling and MSS</span>
                            <p className="text-xs opacity-80">Inspect TCP options header to locate Maximum Segment Size (MSS) and Window scale factor.</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => toggleTask('task3')}
                          className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                            completedTasks.task3
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-50 dark:bg-[#161F30] border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={completedTasks.task3} 
                            onChange={() => {}}
                            aria-label="Wireshark Display Filter Verification task"
                            className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="font-bold">Task 3: Wireshark Display Filter Verification</span>
                            <p className="text-xs opacity-80">Extract DNS UDP queries on port 53 and calculate header size comparison with TCP.</p>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-3">
                        Wireshark Display Filter Cheatsheet:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono text-xs flex items-center justify-between">
                          <code>tcp.flags.syn == 1</code>
                          <button 
                            onClick={() => copyToClipboard('tcp.flags.syn == 1')}
                            className="text-slate-400 hover:text-amber-500 p-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono text-xs flex items-center justify-between">
                          <code>tcp.analysis.retransmission</code>
                          <button 
                            onClick={() => copyToClipboard('tcp.analysis.retransmission')}
                            className="text-slate-400 hover:text-amber-500 p-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: KEY TAKEAWAYS & FORMULAS */}
          {/* ==================================================== */}
          {activeTab === 'cheatsheet' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    High-Yield Revision Formula & Cheat Sheet
                  </h3>
                  <button
                    onClick={handleDownload}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Notes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase font-mono">
                      Definition & Core Theory
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {resource.summary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase font-mono">
                      Curriculum Placement
                    </span>
                    <div className="text-xs space-y-1">
                      <div><strong>Subject:</strong> {resource.subject}</div>
                      <div><strong>Topic Module:</strong> {resource.topic}</div>
                      <div><strong>Estimated Mastery Gain:</strong> +15% upon completion</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Frequently Tested Exam Concepts:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Lossless Decomposition Test:</strong> R1 ∩ R2 must be a superkey in at least one of R1 or R2.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Dependency Preservation:</strong> (F1 ∪ F2)+ must equal F+. If dependencies are lost in BCNF, we preserve 3NF.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span><strong>Candidate Key Calculation:</strong> Compute attribute closure X+ using Armstrong's axioms (Reflexivity, Augmentation, Transitivity).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: INTERACTIVE CODE / PRACTICE */}
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
                    onClick={handleRunPythonCode}
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
                    <span>functional_pipeline.py</span>
                    <button
                      onClick={() => copyToClipboard(`from functools import reduce

students = [
    {"name": "Aaditya", "score": 92},
    {"name": "Maya", "score": 88},
    {"name": "Dev", "score": 79},
    {"name": "Rohan", "score": 54}
]

# 1. Filter passing marks using lambda
passing = list(filter(lambda s: s["score"] >= 75, students))

# 2. Map curve using pure function (+5% boost)
curved = list(map(lambda s: {"name": s["name"], "curved_score": round(s["score"] * 1.05, 1)}, passing))

# 3. Reduce to compute weighted average
total = reduce(lambda acc, s: acc + s["curved_score"], curved, 0)
avg = round(total / len(curved), 2)`)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="p-4 text-emerald-300 overflow-x-auto leading-relaxed">
                    <pre>{`from functools import reduce

students = [
    {"name": "Aaditya", "score": 92},
    {"name": "Maya", "score": 88},
    {"name": "Dev", "score": 79},
    {"name": "Rohan", "score": 54}
]

# 1. Filter passing marks using lambda predicate
passing = list(filter(lambda s: s["score"] >= 75, students))

# 2. Transform with pure mapping function (+5% curve)
curved = list(map(lambda s: {"name": s["name"], "curved_score": round(s["score"] * 1.05, 1)}, passing))

# 3. Fold with reduce to calculate class aggregate
total = reduce(lambda acc, s: acc + s["curved_score"], curved, 0)
avg = round(total / len(curved), 2)
print(f"Weighted Class Average: {avg}%")`}</pre>
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
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span>Subject: <strong className="text-slate-800 dark:text-slate-200">{resource.subject}</strong></span>
            <span>•</span>
            <span>Topic: <strong className="text-slate-800 dark:text-slate-200">{resource.topic}</strong></span>
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
