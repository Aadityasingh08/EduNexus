import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  ArrowRight,
  User,
  Lock,
  Mail,
  GraduationCap,
  Building,
  Target
} from 'lucide-react';

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=User3&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=User3&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=User3&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=User3&backgroundColor=ffdfbf'
];

export const LoginPage: React.FC = () => {
  const { registerUser, loginUser } = useEduNexusStore();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  // Sign in state
  const [signInName, setSignInName] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign up state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [year, setYear] = useState('Year 3 • Semester 5');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = signInName.trim() || (signInEmail.includes('@') ? signInEmail.split('@')[0] : 'Student');
    loginUser(signInEmail.trim(), signInPassword, cleanName);
    navigate('/dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
      university: university.trim() || 'University Institute of Technology',
      degree,
      year,
      targetRole,
      primaryGoal,
      avatar: selectedAvatar
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden academic-grid-pattern">
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F19]/60 to-[#0B0F19] pointer-events-none" />

      <div className="w-full max-w-xl bg-[#111827] rounded-3xl border border-slate-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-10 space-y-7 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-700 to-orange-800 flex items-center justify-center mx-auto shadow-md shadow-amber-700/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            EduNexus
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Academic Operating System & Learning Workspace
          </p>
        </div>

        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Student Account
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'signin'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In with Name
          </button>
        </div>

        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Enter Student Profile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Student Email <span className="text-amber-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  University / College
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. IIT Delhi / Stanford"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Degree Program
                </label>
                <div className="relative flex items-center">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Target Career Role
                </label>
                <div className="relative flex items-center">
                  <Target className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all cursor-pointer"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Full Stack Architect">Full Stack Architect</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Year / Semester
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all cursor-pointer"
                >
                  <option value="Year 1 • Semester 1">Year 1 • Semester 1</option>
                  <option value="Year 2 • Semester 3">Year 2 • Semester 3</option>
                  <option value="Year 3 • Semester 5">Year 3 • Semester 5</option>
                  <option value="Year 4 • Semester 7">Year 4 • Semester 7</option>
                  <option value="Masters / Postgrad">Masters / Postgrad</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Primary Academic Goal
              </label>
              <textarea
                rows={2}
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                placeholder="What is your main target this semester?"
                className="w-full p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-2">
                Choose Profile Avatar
              </label>
              <div className="flex items-center gap-3">
                {AVATAR_OPTIONS.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Avatar ${i}`}
                    onClick={() => setSelectedAvatar(imgUrl)}
                    className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      selectedAvatar === imgUrl
                        ? 'border-amber-600 scale-105 ring-2 ring-amber-600/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Initialize My Student Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 animate-fade-in">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Your Full Name <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter your real name"
                  value={signInName}
                  onChange={(e) => setSignInName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Student Email <span className="text-amber-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#0F172A] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{signInName.trim() ? `Sign In as ${signInName.trim()}` : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-3 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            {mode === 'signin' ? "New student on EduNexus? " : "Already registered? "}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-bold text-amber-500 hover:underline ml-1"
            >
              {mode === 'signin' ? 'Create Student Account' : 'Sign In with Name'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
