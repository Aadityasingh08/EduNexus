import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Play,
  Pause,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  FileText,
  Clock,
  ArrowRight,
  ListOrdered,
  Plus
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, updateLessonProgress, addCourseNote, addToast } = useEduNexusStore();

  const course = courses.find((c) => c.id === courseId) || courses[0];

  const [activeLessonId, setActiveLessonId] = useState<string>(
    course.currentLessonId || course.lessons[0].id
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const activeLesson =
    course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === activeLessonId);

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setActiveLessonId(course.lessons[currentLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(course.lessons[currentLessonIndex - 1].id);
    }
  };

  const handleToggleComplete = () => {
    const nextState = !activeLesson.completed;
    updateLessonProgress(course.id, activeLesson.id, nextState);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addCourseNote(course.id, newNoteText.trim());
    setNewNoteText('');
    addToast({
      type: 'success',
      title: 'Revision Note Saved',
      message: 'Added to your persistent curriculum notebook.'
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/learning')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#111827] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase font-mono">
                {course.code}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {course.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(`/tutor?topic=${encodeURIComponent(course.currentTopic)}`)}
            className="px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/30 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Consult Course Companion</span>
          </button>
          <button
            onClick={() => navigate('/quizzes/quiz-normalization')}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all"
          >
            <span>Take Diagnostic Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Player on Left, Lessons List & Notes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Lesson Content Player */}
        <div className="lg:col-span-2 space-y-5">
          {/* Lecture / Video Study Viewfinder */}
          <div className="relative aspect-video rounded-3xl bg-[#0E1524] border border-slate-800 overflow-hidden flex flex-col justify-between p-6 text-white shadow-xl">
            {/* Top Bar inside player */}
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full text-slate-200">
                Module {currentLessonIndex + 1} of {course.lessons.length}
              </span>
              <span className="text-xs text-slate-300 font-medium">{activeLesson.durationMinutes} minutes</span>
            </div>

            {/* Center Play Graphic */}
            <div className="text-center z-10 my-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center mx-auto shadow-xl transition-transform active:scale-95 border-2 border-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>
              <h3 className="text-lg font-bold mt-4 max-w-md mx-auto text-slate-100">
                {activeLesson.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isPlaying ? 'Streaming academic curriculum lecture...' : 'Click to stream curriculum lecture'}
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between z-10 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className="text-xs text-slate-300 hover:text-white disabled:opacity-30 flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === course.lessons.length - 1}
                  className="text-xs text-slate-300 hover:text-white disabled:opacity-30 flex items-center gap-1 font-semibold"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleToggleComplete}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLesson.completed
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeLesson.completed ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Metadata & Syllabus Alignment */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Lesson Summary & Curriculum Alignment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeLesson.summary}</p>
              </div>

              <button
                onClick={() =>
                  navigate(`/tutor?topic=${encodeURIComponent(activeLesson.title)}`)
                }
                className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-600 hover:text-white transition-all flex items-center gap-1 border border-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain Concept</span>
              </button>
            </div>

            {/* Key concepts chips */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Key Concepts Covered:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeLesson.keyConcepts.map((k, i) => (
                  <span
                    key={i}
                    onClick={() => navigate(`/tutor?topic=${encodeURIComponent(k)}`)}
                    className="px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-300 text-xs font-semibold border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition-colors"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Lecture Transcript if available */}
            {activeLesson.transcript && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Lecture Transcript Highlights:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {activeLesson.transcript}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Course Syllabus & Revision Notes */}
        <div className="space-y-6">
          {/* Syllabus Lessons Checklist */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Course Modules ({course.lessons.length})
              </h3>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {course.progressPercent}% Done
              </span>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    lesson.id === activeLesson.id
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/40 text-amber-600 dark:text-amber-300 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-[#161F30] border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-400 w-4">{idx + 1}.</span>
                    <div className="truncate">
                      <p
                        className={`text-xs font-bold truncate ${
                          lesson.id === activeLesson.id
                            ? 'text-amber-600 dark:text-amber-300'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {lesson.durationMinutes}m • {lesson.type}
                      </span>
                    </div>
                  </div>

                  {lesson.completed && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Student Revision Notes for this course */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Course Revision Notes
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">{course.notes.length} Notes</span>
            </div>

            {/* Note creation input */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Jot down a quick revision formula, theorem, or query..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500 resize-none h-20"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Revision Note</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {course.notes.map((note, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
