import React, { useState } from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Compass,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  DollarSign,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const CareerPage: React.FC = () => {
  const { careerPaths, studentProfile, updateProfile } = useEduNexusStore();
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    careerPaths[0].id
  );

  const activeCareer =
    careerPaths.find((c) => c.id === selectedCareerId) || careerPaths[0];

  const handleSetTargetRole = (title: string) => {
    updateProfile({ targetRole: title });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 px-3 py-1 rounded-full font-mono">
              Academic-to-Industry Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect Coursework With Industry Trajectory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            EduNexus cross-references your course mastery with real-world engineering benchmarks to build verified competency roadmaps.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
          <span className="text-slate-500 dark:text-slate-400">Current Target Role:</span>
          <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{studentProfile.targetRole}</p>
        </div>
      </div>

      {/* Career Roles Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {careerPaths.map((career) => {
          const isSelected = career.id === activeCareer.id;
          return (
            <div
              key={career.id}
              onClick={() => setSelectedCareerId(career.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-[#111827] border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-blue-500/40 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {career.industryDemand} Demand
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {career.readinessPercent}% Match
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                  {career.title}
                </h3>
                <div className="w-full bg-slate-100 dark:bg-[#161F30] h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${career.readinessPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <span>{career.avgSalaryRange}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Inspect →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Career Deep Dive */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 rounded-full font-mono">
              Detailed Competency Blueprint
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
              {activeCareer.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Industry Compensation Benchmark: {activeCareer.avgSalaryRange} • Market Demand: {activeCareer.industryDemand}
            </p>
          </div>

          <button
            onClick={() => handleSetTargetRole(activeCareer.title)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 self-start sm:self-center transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Set as Primary Goal</span>
          </button>
        </div>

        {/* Readiness Meter & Skill Gap Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Readiness Score Card */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Role Readiness Benchmark
            </span>
            <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {activeCareer.readinessPercent}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Based on your completed modules, diagnostic quiz accuracy, and concept mastery in academic courses.
            </p>
          </div>

          {/* Strong Skills */}
          <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-[#161F30] border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Current Verified Strengths:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
              {activeCareer.strongSkills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skill Gaps (Needs Improvement) */}
          <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-[#161F30] border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Identified Curriculum Gaps:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
              {activeCareer.needsImprovement.map((gap, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Actionable Roadmap */}
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Curriculum Alignment Roadmap
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCareer.recommendedRoadmap.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {step.replace(/^\d+\.\s*/, '')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Portfolio Projects */}
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-500" />
            Capstone & Portfolio Projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeCareer.portfolioProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {proj.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.skillsCovered.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 text-[10px] font-bold border border-blue-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
