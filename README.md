# EduNexus — Your AI Operating System for Learning

> **"One intelligent ecosystem for smarter learning."**
> Unifying courses, syllabus, quizzes, diagnostic misconception analysis, knowledge mapping, personalized study scheduling, career guidance, and AI tutoring.

---

## ⚡ Direct 1-Click Quick Start

### Method 1: Double-Click Batch File (Windows)
Simply double-click:
- **`start-edunexus.bat`** (or **`START.bat`**)

This will automatically:
1. Verify node dependencies
2. Start the local server on `http://localhost:5173/`
3. Launch your default web browser directly to EduNexus!

---

### Method 2: Command Line (Terminal / PowerShell)
```bash
npm start
```
*(Runs Vite with `--open` and launches your browser automatically)*

Or:
```bash
npm run dev
```

---

## 🧭 Platform Features Matrix

| Feature | URL Route | Description |
| :--- | :--- | :--- |
| **Personalized Dashboard** | `/dashboard` | Today's focus, DBMS 6-day countdown, course progress, quick actions, and AI insight |
| **AI Tutor** | `/tutor` | 3-pane experience with Socratic breakdown, analogies, code snippets, and contextual metadata |
| **Interactive Knowledge Map** | `/knowledge-map` | Pan/zoom SVG graph with node mastery statuses (🟢 Mastered, 🔵 Learning, 🟠 Needs Practice, 🔴 Weak) |
| **Diagnostic Quizzes** | `/quizzes` & `/quizzes/:id` | AI Quiz Generator, active runner, and misconception analysis (2NF vs 3NF) |
| **Smart Study Planner** | `/study-plan` | Adaptive timeline with automated workload rescheduling suggestions |
| **Material Ingestion & Analysis** | Modal (`Upload Notes`) | 5-step animated concept and formula extraction |
| **Camera Document Scanner** | Modal (`Scan Material`) | Viewfinder OCR text extraction and AI concept explanation |
| **Deep Focus Mode** | Modal (`Focus Mode`) | Distraction-free Pomodoro timer with ambient sounds and session checklist |
| **Analytics & Trends** | `/progress` | Recharts retention graphs, study time breakdown, and cognitive behavioral insights |
| **Career Pathways** | `/career` | Industry benchmarks, readiness scores, and project roadmaps |
| **Resource Library** | `/resources` | Centralized PDF, video, and notes repository |
| **Student Community** | `/community` | Peer discussions, upvotes, and Q&A |
| **Student Profile & Settings** | `/profile`, `/settings` | Goals, preferences, and dark/light mode toggle |
| **Public Landing Page** | `/landing` | Showcase page with feature tours and testimonials |

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Plus Jakarta Sans Typography + Custom Design Tokens
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **State & Sync**: Persistent Zustand store linked with LocalStorage
- **Animations & Effects**: Canvas Confetti & Modern Glassmorphism
