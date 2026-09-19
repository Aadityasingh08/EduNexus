import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { analyzeUploadedMaterial, UploadAnalysisResult, SUBJECT_TOPICS } from '../../services/uploadService';
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
  BookOpen,
  Layers,
  GraduationCap
} from 'lucide-react';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, toggleUploadModal, addStudySession, addResource, addToast } = useEduNexusStore();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('DBMS');
  const [selectedTopic, setSelectedTopic] = useState<string>('Database Normalization');
  const [selectedType, setSelectedType] = useState<'PDF' | 'Notes' | 'Assignment' | 'Article'>('PDF');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepName, setStepName] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [result, setResult] = useState<UploadAnalysisResult | null>(null);

  if (!isUploadModalOpen) return null;

  const detectSubjectFromFileName = (name: string) => {
    const ln = name.toLowerCase();
    if (ln.includes('python') || ln.includes('py_') || ln.includes('lambda') || ln.includes('django') || ln.includes('flask')) {
      setSelectedSubject('Python');
      setSelectedTopic('Functional Programming & Lambdas');
    } else if (ln.includes('dsa') || ln.includes('tree') || ln.includes('graph') || ln.includes('structure') || ln.includes('avl') || ln.includes('bst') || ln.includes('algo')) {
      setSelectedSubject('Data Structures');
      setSelectedTopic('Binary Search Trees & AVL Balancing');
    } else if (ln.includes('network') || ln.includes('tcp') || ln.includes('udp') || ln.includes('wireshark') || ln.includes('ip') || ln.includes('osi')) {
      setSelectedSubject('Computer Networks');
      setSelectedTopic('Transport Layer: TCP vs UDP Deep Dive');
    } else if (ln.includes('os') || ln.includes('operating') || ln.includes('process') || ln.includes('deadlock') || ln.includes('thread') || ln.includes('kernel')) {
      setSelectedSubject('Operating Systems');
      setSelectedTopic('Process Scheduling & Context Switching');
    } else if (ln.includes('ml') || ln.includes('machine') || ln.includes('gradient') || ln.includes('regression') || ln.includes('neural')) {
      setSelectedSubject('Machine Learning');
      setSelectedTopic('Supervised Learning: Regression & Classification');
    } else if (ln.includes('react') || ln.includes('web') || ln.includes('frontend') || ln.includes('css') || ln.includes('javascript') || ln.includes('html')) {
      setSelectedSubject('Web Development');
      setSelectedTopic('React Architecture, Fiber Reconciler & Hooks');
    } else if (ln.includes('dbms') || ln.includes('sql') || ln.includes('database') || ln.includes('norm') || ln.includes('relational')) {
      setSelectedSubject('DBMS');
      setSelectedTopic('Database Normalization');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      detectSubjectFromFileName(file.name);
    }
  };

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    const topics = SUBJECT_TOPICS[newSubject] || [];
    setSelectedTopic(topics[0] || 'General');
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setProgressPercent(10);
    const fileName = selectedFile 
      ? selectedFile.name 
      : `${selectedSubject}_Comprehensive_Study_Notes.pdf`;

    try {
      const data = await analyzeUploadedMaterial(
        fileName,
        selectedSubject,
        selectedTopic,
        (step, name, pct) => {
          setCurrentStep(step);
          setStepName(name);
          setProgressPercent(pct);
        }
      );

      setResult(data);
      setIsAnalyzing(false);

      // Add with REAL selected metadata to user resources library
      addResource({
        title: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : `${selectedSubject}: ${selectedTopic} Masterclass`,
        type: selectedType,
        subject: selectedSubject,
        topic: selectedTopic,
        durationOrPages: '12 Pages',
        difficulty: selectedDifficulty,
        isSaved: true,
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '2.4 MB',
        summary: data.summary
      });

      addToast({
        type: 'success',
        title: 'Notes Added to Academic Library',
        message: `${selectedSubject} material successfully extracted.`
      });
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      addToast({
        type: 'error',
        title: 'Extraction Failed',
        message: 'Could not process material. Please retry.'
      });
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

  const subjectsList = Object.keys(SUBJECT_TOPICS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload & Curriculum Concept Extraction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                EduNexus ingests notes, maps them across 7 curriculum subjects, and generates diagnostic tests.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isAnalyzing && !result && (
            <div className="space-y-5">
              
              {/* Subject Selection Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Select Subject / Course Discipline:
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjectsList.map((sub) => {
                    const isSelected = selectedSubject === sub;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubjectChange(sub)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-xs shadow-amber-600/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic & Metadata Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Curriculum Topic:
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500 font-medium"
                  >
                    {(SUBJECT_TOPICS[selectedSubject] || []).map((top) => (
                      <option key={top} value={top}>
                        {top}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Material Type:
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Notes">Lecture Notes</option>
                    <option value="Assignment">Lab Assignment</option>
                    <option value="Article">Research Article</option>
                  </select>
                </div>
              </div>

              {/* Drag & Drop File Box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-[#0B0F19] rounded-2xl p-7 text-center transition-colors cursor-pointer"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.txt,.docx,.png,.jpg';
                  input.onchange = (e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedFile(file);
                      detectSubjectFromFileName(file.name);
                    }
                  };
                  input.click();
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedFile ? selectedFile.name : 'Click to browse notes or drag & drop here'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF, DOCX, TXT, or slide decks (up to 50MB)
                </p>
                {selectedFile ? (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    Ready to analyze ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                ) : (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-xs bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg font-medium text-amber-500">
                      Choose File
                    </span>
                    <span className="text-xs text-slate-400">or analyze syllabus curriculum</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartAnalysis}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Extract {selectedSubject} Concepts</span>
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
                  className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"
                  style={{ animationDuration: '1.2s' }}
                ></div>
                <Brain className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Extracting Concepts & Syllabus Alignment for {selectedSubject}...
                </h4>
                <p className="text-xs text-amber-400 font-medium mt-1">
                  STEP {currentStep} OF 5: {stepName}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Step checklist */}
              <div className="max-w-md mx-auto text-left space-y-2 text-xs pt-2">
                {[
                  `Step 1: Uploading material & verifying encoding`,
                  `Step 2: Analyzing semantic structure for ${selectedSubject}`,
                  `Step 3: Extracting formulas, definitions & code invariants`,
                  `Step 4: Mapping relationships to EduNexus Knowledge Graph`,
                  `Step 5: Synthesizing diagnostic quiz & personalized study plan`
                ].map((st, i) => {
                  const done = i + 1 < currentStep;
                  const active = i + 1 === currentStep;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 ${
                        done ? 'text-emerald-400' : active ? 'text-amber-400 font-semibold' : 'text-slate-500'
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
                      5 concepts identified • Mapped to {result.subject} Curriculum
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
                  Extracted Concepts & Curriculum Alignment:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.detectedTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600/10 border border-amber-500/20 text-amber-600 dark:text-amber-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generated Summary & Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-amber-500">
                    <BookOpen className="w-4 h-4" />
                    <h5 className="text-xs font-bold uppercase tracking-wider">Curriculum Summary ({result.subject})</h5>
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
                  <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1.5 list-disc list-inside">
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
                      navigate('/quizzes');
                    }}
                    className="p-3 rounded-xl border border-amber-500/20 bg-amber-600/10 hover:bg-amber-600 hover:text-white group transition-all text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Practice Quiz
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      {result.subject} diagnostic test
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const todayStr = new Date().toISOString().split('T')[0];
                      addStudySession({
                        title: `Revision: Uploaded Notes on ${result.detectedTopics[0] || result.subject}`,
                        subject: result.subject,
                        timeSlot: '19:00 - 19:45',
                        durationMinutes: 45,
                        date: todayStr,
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
                    <Calendar className="w-4 h-4 text-emerald-500 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Study Sprint
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      Add to study schedule
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/knowledge-map');
                    }}
                    className="p-3 rounded-xl border border-amber-500/20 bg-amber-600/10 hover:bg-amber-600 hover:text-white group transition-all text-left"
                  >
                    <Brain className="w-4 h-4 text-amber-500 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Knowledge Map
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      View connected nodes
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const top = result.detectedTopics[0] || result.subject;
                      handleClose();
                      navigate(`/tutor?topic=${encodeURIComponent(top)}`);
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161F30] hover:bg-amber-600 hover:text-white group transition-all text-left"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">
                      Study with Tutor
                    </p>
                    <p className="text-[10px] text-slate-400 group-hover:text-white/80">
                      Step-by-step AI review
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
