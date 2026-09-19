import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { analyzeUploadedMaterial, UploadAnalysisResult } from '../../services/uploadService';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Brain,
  Sparkles,
  ArrowRight,
  X,
  AlertTriangle,
  Loader2,
  Calendar,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, toggleUploadModal, addStudySession, addResource, addToast } = useEduNexusStore();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepName, setStepName] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [result, setResult] = useState<UploadAnalysisResult | null>(null);

  if (!isUploadModalOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setProgressPercent(10);
    const fileName = selectedFile ? selectedFile.name : 'DBMS_Lecture_Module_Normalization.pdf';

    try {
      const data = await analyzeUploadedMaterial(fileName, (step, name, pct) => {
        setCurrentStep(step);
        setStepName(name);
        setProgressPercent(pct);
      });

      setResult(data);
      setIsAnalyzing(false);

      // Also automatically add to user resources library
      addResource({
        title: fileName.replace(/\.[^/.]+$/, ''),
        type: 'PDF',
        subject: 'DBMS',
        topic: 'Normalization',
        durationOrPages: '14 Pages',
        difficulty: 'Intermediate',
        isSaved: true,
        fileSize: '2.4 MB',
        summary: data.summary
      });
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    toggleUploadModal(false);
    setSelectedFile(null);
    setIsAnalyzing(false);
    setResult(null);
    setCurrentStep(0);
    setProgressPercent(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload & Curriculum Concept Extraction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                EduNexus ingests your notes, diagnoses weak areas, and maps them to your syllabus.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isAnalyzing && !result && (
            <div className="space-y-4">
              {/* Drag & Drop Box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-slate-50 dark:bg-[#0B0F19] rounded-2xl p-8 text-center transition-colors cursor-pointer"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.txt,.docx,.png,.jpg';
                  input.onchange = (e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  };
                  input.click();
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedFile ? selectedFile.name : 'Choose a file or drag & drop here'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF, DOCX, TXT, or lecture slides (up to 50MB)
                </p>
                {selectedFile ? (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    Ready to analyze ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                ) : (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-xs bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg font-medium text-blue-500">
                      Browse Files
                    </span>
                    <span className="text-xs text-slate-400">or load lecture notes</span>
                  </div>
                )}
              </div>

              {/* Quick Preset for instantaneous demo */}
              <div className="bg-slate-50 dark:bg-[#161F30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      Sample: DBMS_Normalization_Lecture_Module_CS204.pdf
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Pre-bundled university notes covering 1NF, 2NF, 3NF & BCNF decomposition
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(new File(['demo'], 'DBMS_Normalization_Lecture_Module_CS204.pdf'));
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Use This File
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartAnalysis}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Extract Concepts
                </button>
              </div>
            </div>
          )}

          {/* Processing Animation Screen */}
          {isAnalyzing && (
            <div className="py-8 space-y-6 text-center">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                  style={{ animationDuration: '1.2s' }}
                ></div>
                <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Extracting Concepts & Syllabus Alignment...
                </h4>
                <p className="text-xs text-blue-400 font-medium mt-1">
                  STEP {currentStep} OF 5: {stepName}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Step checklist */}
              <div className="max-w-md mx-auto text-left space-y-2 text-xs pt-2">
                {[
                  'Step 1: Uploading material & verifying encoding',
                  'Step 2: Analyzing semantic structure & syllabus alignment',
                  'Step 3: Extracting key concepts & formulas',
                  'Step 4: Finding relationships to Knowledge Map',
                  'Step 5: Synthesizing diagnostic quiz & study recommendations'
                ].map((st, i) => {
                  const done = i + 1 < currentStep;
                  const active = i + 1 === currentStep;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 ${
                        done ? 'text-emerald-400' : active ? 'text-blue-400 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : active ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700" />
                      )}
                      <span>{st}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Analysis Complete Output */}
          {result && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Analysis Complete: {result.fileName}
                    </h4>
                    <p className="text-xs text-emerald-400 font-medium">
                      5 concepts identified • Mapped to Database Management Systems (CS204)
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-white dark:bg-[#111827] px-2.5 py-1 rounded-lg font-bold text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-800">
                  100% Parsed
                </span>
              </div>

              {/* Detected Topics Chips */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Detected Topics in Document:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.detectedTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generated Summary & Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <h5 className="text-xs font-bold uppercase tracking-wider">Curriculum Summary</h5>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2 text-amber-500">
                    <AlertTriangle className="w-4 h-4" />
                    <h5 className="text-xs font-bold uppercase tracking-wider">Diagnosed Potential Weak Areas</h5>
                  </div>
                  <ul className="text-xs text-amber-200 space-y-1.5 list-disc list-inside">
                    {result.potentialWeakAreas.map((area, idx) => (
                      <li key={idx} className="leading-snug">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Action CTAs */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Next Actions:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/quizzes/quiz-normalization');
                    }}
                    className="p-3 rounded-xl border border-blue-500/20 bg-blue-600/10 hover:bg-blue-600 hover:text-white group transition-all text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Practice Quiz
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      5 diagnostic questions
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      addStudySession({
                        title: 'Revision: Uploaded Notes on Normalization (2NF/3NF)',
                        subject: 'DBMS',
                        timeSlot: '19:00 - 19:45',
                        durationMinutes: 45,
                        date: '2026-09-19',
                        type: 'revision',
                        priority: 'high',
                        completed: false,
                        aiSuggested: true
                      });
                      handleClose();
                      navigate('/study-plan');
                    }}
                    className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white group transition-all text-left"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Study Sprint
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      Add 45m session
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/knowledge-map?highlight=node-dbms-norm');
                    }}
                    className="p-3 rounded-xl border border-blue-500/20 bg-blue-600/10 hover:bg-blue-600 hover:text-white group transition-all text-left"
                  >
                    <Brain className="w-4 h-4 text-blue-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Knowledge Map
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      View connected nodes
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/tutor?topic=Normalization');
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161F30] hover:bg-blue-600 hover:text-white group transition-all text-left"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Study with Tutor
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      Step-by-step review
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
