import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Calendar,
  CheckSquare,
  BarChart3,
  Compass,
  UploadCloud,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck,
  Star,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
      {/* Landing Navbar */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                EduNexus
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20 font-mono">
                Academic OS
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Curriculum Loop</a>
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ecosystem</a>
            <a href="#intelligence-loop" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Adaptive Diagnostics</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Student Results</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Sign In
            </Link>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Unified Academic Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          The Academic Operating System for Serious Learners.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          EduNexus unifies university courses, syllabus knowledge mapping, diagnostic quizzes, and personalized study sprints into one coherent, distraction-free environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/20 transition-transform active:scale-95 flex items-center justify-center gap-2.5"
          >
            <span>Enter Student Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-[#161F30] transition-colors shadow-xs"
          >
            Sign In with University ID
          </button>
        </div>

        {/* Realistic Dashboard Preview Frame */}
        <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#111827] overflow-hidden max-w-5xl mx-auto text-left">
          {/* Mock Browser Header */}
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1524] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-white dark:bg-[#111827] px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800">
              edunexus.edu/workspace/curriculum
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Curriculum Synced</span>
          </div>

          {/* Realistic Dashboard Snippet */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-[#0B0F19]">
            {/* Column 1: Today's Focus */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 px-2.5 py-1 rounded-full font-mono">
                Today's Sprint
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3 mb-1">
                Relational Normalization
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Complete DBMS Module & 2NF/3NF Assessment</p>
              <div className="w-full bg-slate-100 dark:bg-[#161F30] h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 h-full w-[72%] rounded-full" />
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Progress</span>
                <span className="text-emerald-600 dark:text-emerald-400">72% Completed</span>
              </div>
            </div>

            {/* Column 2: Diagnostic Recommendation */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Curriculum Diagnostic</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                "Transitive dependency resolution in 3NF shows a slight cognitive gap. We have queued a targeted 15-minute diagnostic quiz before tomorrow's midterm."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Exam in 6 Days</span>
                <span>Calibrated</span>
              </div>
            </div>

            {/* Column 3: Knowledge Map Snapshot */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
                Syllabus Mastery
              </span>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">SQL Relational Algebra</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">86% Mastered</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">2NF / 3NF Normalization</span>
                  <span className="text-amber-500 font-bold">52% In Progress</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">BCNF Decomposition</span>
                  <span className="text-rose-500 font-bold">35% Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Intelligence Loop Section */}
      <section id="intelligence-loop" className="py-20 px-6 bg-white dark:bg-[#111827] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            Structured Academic Progress
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
            The EduNexus Curriculum Mastery Cycle
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16">
            "Students don't just need more unorganized video links. They need a systematic structure that understands where their knowledge breaks down and guides them through every concept."
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { step: '1. SYLLABUS', title: 'Upload & Parse', desc: 'Ingest university course outlines & notes' },
              { step: '2. MAP', title: 'Extract Nodes', desc: 'Structure concepts and prerequisite graphs' },
              { step: '3. DIAGNOSE', title: 'Find Gaps', desc: 'Isolate specific conceptual misconceptions' },
              { step: '4. SCHEDULE', title: 'Study Sprints', desc: 'Adaptive calendar balancing workload & exams' },
              { step: '5. MASTER', title: 'Course Studio', desc: 'Step-by-step textbook proofs & simulations' },
              { step: '6. VERIFY', title: 'Progress Audit', desc: 'Knowledge graph node advancement' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-left hover:border-blue-500/40 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            Engineered For University & Technical Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Every Essential Academic Tool in One Workspace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Syllabus-Aligned Companion
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Grounds explanations in your specific university course materials. Breaks down hard theorems, proofs, and code examples without vague generic fluff.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Interactive Knowledge Graph
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Visualize how foundational concepts connect to advanced topics. Watch nodes transform from Needs Practice to Mastered as you complete assessments.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Adaptive Schedule & Sprints
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Dynamically organizes your upcoming exams, lab assignments, and active revision blocks so you never cram at the last minute.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            Student Outcomes
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-12">
            Engineered for Exam Readiness & Retention
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                quote:
                  'I was struggling with 2NF vs 3NF on mock tests. EduNexus diagnosed my transitive dependency confusion, scheduled a targeted 20-min session, and I aced my DBMS midterm.',
                author: 'Aditya K.',
                role: 'CS Junior • University Institute'
              },
              {
                quote:
                  'Uploading lecture slides and having EduNexus automatically highlight syllabus weak topics and generate instant diagnostic quizzes cut my exam preparation time in half.',
                author: 'Priya Patel',
                role: 'Computer Engineering Year 3'
              },
              {
                quote:
                  'The Career Readiness map directly connects what I study in algorithms and database systems to real-world software engineering competencies.',
                author: 'Devon Vance',
                role: 'Software Engineering Major'
              }
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800"
              >
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t.author}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Ready to Elevate Your Academic Performance?
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
          Experience the unified, distraction-free environment built for technical mastery.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-9 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/20 transition-transform active:scale-95"
        >
          Launch EduNexus Workspace →
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">EduNexus</span>
            <span>— The Academic Operating System for Learning</span>
          </div>
          <p>© 2026 EduNexus Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
