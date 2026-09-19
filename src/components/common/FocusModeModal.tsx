import React, { useState, useEffect } from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  X,
  Sparkles,
  Maximize2,
  Minimize2,
  FileText
} from 'lucide-react';

export const FocusModeModal: React.FC = () => {
  const {
    isFocusModeOpen,
    toggleFocusMode,
    studySessions,
    toggleSessionComplete,
    addCourseNote,
    activeCourseId,
    addToast
  } = useEduNexusStore();

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [ambientSound, setAmbientSound] = useState<string>('Deep Focus Binaural');
  const [isMuted, setIsMuted] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      addToast({
        type: 'success',
        title: 'Focus Sprint Complete! 🎉',
        message: 'Great 25 minutes of deep learning logged to your streak.'
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, addToast]);

  if (!isFocusModeOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const setTimerDuration = (mins: number) => {
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const handleSaveNotes = () => {
    if (!scratchpadText.trim()) return;
    addCourseNote(activeCourseId || 'course-dbms', scratchpadText);
    setScratchpadText('');
  };

  const todaySessions = studySessions.filter((s) => s.date === '2026-09-19');

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] text-slate-100 flex flex-col p-6 sm:p-10 animate-fade-in select-none">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
            EN
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-white">EduNexus Deep Study Studio</h2>
            <p className="text-xs text-slate-400">Zero distractions • Focused academic sprint</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Ambient selector */}
          <div className="hidden sm:flex items-center gap-2 bg-[#161F30] border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-blue-400 transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <select
              value={ambientSound}
              onChange={(e) => setAmbientSound(e.target.value)}
              className="bg-transparent border-none text-slate-200 text-xs outline-none cursor-pointer"
            >
              <option value="Deep Focus Binaural" className="bg-[#111827]">
                Deep Focus (40Hz Binaural)
              </option>
              <option value="Library Rain" className="bg-[#111827]">
                Rain on Window
              </option>
              <option value="White Noise" className="bg-[#111827]">
                Soft Pink Noise
              </option>
              <option value="Coffee Shop" className="bg-[#111827]">
                Quiet Academic Lounge
              </option>
            </select>
          </div>

          <button
            onClick={() => toggleFocusMode(false)}
            className="p-2 rounded-xl bg-[#161F30] hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Focus Center */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full mx-auto my-auto text-center">
        {/* Timer presets */}
        <div className="flex items-center gap-2 mb-6">
          {[15, 25, 50].map((mins) => (
            <button
              key={mins}
              onClick={() => setTimerDuration(mins)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedDuration === mins
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-[#161F30] border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {mins} min Sprint
            </button>
          ))}
        </div>

        {/* Large Timer Display */}
        <div className="font-mono text-7xl sm:text-9xl font-extrabold tracking-tighter mb-8 text-white drop-shadow-lg">
          {formattedTime}
        </div>

        {/* Play/Pause Controls */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => setTimeLeft(selectedDuration * 60)}
            className="p-3.5 rounded-2xl bg-[#161F30] hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center gap-3 transition-transform active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                Pause Focus
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Start Focus
              </>
            )}
          </button>
        </div>

        {/* Bottom Split: Checklist & Scratchpad */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Task Checklist */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Today's Session Targets
            </h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {todaySessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => toggleSessionComplete(session.id)}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#161F30] hover:bg-slate-800 cursor-pointer transition-colors border border-slate-800/60"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <input
                      type="checkbox"
                      checked={session.completed}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs truncate ${
                        session.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {session.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{session.timeSlot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Scratchpad */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                Study Notes & Formula Scratchpad
              </h4>
              <button
                onClick={handleSaveNotes}
                className="text-[11px] font-semibold text-blue-400 hover:underline"
              >
                Save to Course
              </button>
            </div>
            <textarea
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
              placeholder="Jot down quick formulas, reminders, or questions for syllabus tutor..."
              className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-500 outline-none resize-none min-h-[90px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
