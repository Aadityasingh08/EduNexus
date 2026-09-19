import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  User,
  GraduationCap,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  Edit2,
  Save,
  BookOpen,
  Target,
  LogOut
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { studentProfile, updateProfile, logout, addToast } = useEduNexusStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(studentProfile.name);
  const [primaryGoal, setPrimaryGoal] = useState(studentProfile.primaryGoal);
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(studentProfile.dailyGoalMinutes);
  const [preferredStudyTime, setPreferredStudyTime] = useState(studentProfile.preferredStudyTime);
  const [difficultyPreference, setDifficultyPreference] = useState(studentProfile.difficultyPreference);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      primaryGoal,
      targetRole,
      dailyGoalMinutes,
      preferredStudyTime,
      difficultyPreference
    });
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your academic goals & preferences have been updated.'
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-blue-600 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {studentProfile.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                Verified Student
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {studentProfile.degree} • {studentProfile.year}
            </p>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
              {studentProfile.university}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 self-start sm:self-center ${
            isEditing
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#161F30]'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
          <Clock className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.totalStudyHours}h
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400">Total Study Time</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.coursesEnrolled}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400">Courses Enrolled</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
          <Award className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.quizzesTaken}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400">Quizzes Taken</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
          <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1 fill-current" />
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {studentProfile.streakDays} Days
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400">Active Streak</span>
        </div>
      </div>

      {/* EDITABLE LEARNING PREFERENCES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Academic Goals & Study Preferences
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Personalizes your daily schedule & recommendations
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Student Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-blue-500 disabled:opacity-75"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Target Career Role</label>
              <input
                type="text"
                disabled={!isEditing}
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-blue-500 disabled:opacity-75"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Primary Learning Goal</label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-blue-500 disabled:opacity-75 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Daily Study Target</label>
              <select
                disabled={!isEditing}
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs outline-none focus:border-blue-500 disabled:opacity-75"
              >
                <option value={60}>60 minutes / day</option>
                <option value={90}>90 minutes / day</option>
                <option value={120}>120 minutes / day (Recommended)</option>
                <option value={180}>180 minutes / day (Intensive)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Preferred Study Time</label>
              <select
                disabled={!isEditing}
                value={preferredStudyTime}
                onChange={(e: any) => setPreferredStudyTime(e.target.value)}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs outline-none focus:border-blue-500 disabled:opacity-75"
              >
                <option value="Morning">Morning (8 AM - 12 PM)</option>
                <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="Evening">Evening (5 PM - 9 PM)</option>
                <option value="Night">Late Night (9 PM - 1 AM)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Adaptive Diagnostic Level</label>
              <select
                disabled={!isEditing}
                value={difficultyPreference}
                onChange={(e: any) => setDifficultyPreference(e.target.value)}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs outline-none focus:border-blue-500 disabled:opacity-75"
              >
                <option value="Adaptive">Adaptive (Auto-calibrated)</option>
                <option value="Fundamentals First">Fundamentals First</option>
                <option value="Challenging">Challenging (Exam Prep)</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20"
              >
                Save Preferences
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Account Session & Sign Out Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Account Session
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Signed in as <span className="font-semibold text-blue-600 dark:text-blue-400">{studentProfile.name}</span> ({studentProfile.email})
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 self-start sm:self-center transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out from EduNexus</span>
        </button>
      </div>
    </div>
  );
};
