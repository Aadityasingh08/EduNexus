<div align="center">
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" alt="EduNexus Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;"/>

  <h1>🎓 EduNexus</h1>
  <p><strong>Next-Generation Academic Operating System</strong></p>

  <p>
    <a href="https://edunexus-blush.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-edunexus--blush.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Live Demo" />
    </a>
    <a href="https://edunexus-blush.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Status-Online%20%E2%9C%94-success?style=for-the-badge" alt="Deployment Status" />
    </a>
  </p>

  <p>
    An intelligent, context-aware learning platform designed to streamline student workflows. Featuring AI-powered study assistance, dynamic knowledge graphs, and adaptive scheduling.
  </p>
  
  <p>
    <a href="https://edunexus-blush.vercel.app" target="_blank">
      <strong>🚀 Launch Live Application (Vercel) →</strong>
    </a>
  </p>

  <p>
    <a href="#-live-demo">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#environment-variables">Env Variables</a> •
    <a href="#author">Author</a>
  </p>
</div>

---

## 🌟 Features

- 🧠 **AI-Powered Study Companion**: Integrated with Google's Gemini API, your personal tutor is ready to explain complex concepts, solve problems step-by-step, and adapt to your learning style.
- 🕸️ **Dynamic Knowledge Map**: Visualize your understanding of course subjects with an interactive node-edge graph that tracks your mastery and connects related topics.
- 📅 **Adaptive Study Sprints**: Intelligently generated study tasks based on upcoming exams and weak areas identified through diagnostic quizzes.
- 🎨 **Beautiful & Modern UI**: A meticulously crafted interface featuring a warm amber/brown academic theme, dark mode support, and smooth micro-animations.
- 🚀 **Performance Optimized**: Fully client-side rendered SPA with Vite + React for lightning-fast navigation.
- 📊 **Insightful Dashboards**: Track progress, manage courses, and get AI-driven recommendations all in one place.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with custom design system)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI Integration**: `@google/genai` (Gemini API)
- **Backend/Deployment**: Express.js (for Render compatibility), Vercel

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aadityasingh08/EduNexus.git
   cd EduNexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🌐 Live Demo & Deployment

The application is deployed and actively running on Vercel:

<div align="center" style="margin: 20px 0;">
  <a href="https://edunexus-blush.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🔗%20Open%20Live%20Application-edunexus--blush.vercel.app-F59E0B?style=for-the-badge&logoColor=white" alt="Open Live App" />
  </a>
</div>

| Environment | Platform | URL | Status |
| :--- | :--- | :--- | :--- |
| **Production Live Web App** | **Vercel** | [https://edunexus-blush.vercel.app](https://edunexus-blush.vercel.app) | ![Vercel](https://img.shields.io/badge/Vercel-Online-success?logo=vercel) |
| **Source Code Repository** | **GitHub** | [Aadityasingh08/EduNexus](https://github.com/Aadityasingh08/EduNexus) | ![GitHub](https://img.shields.io/badge/Git-Active-blue?logo=github) |

### Deployment Details:
- **Frontend (Vercel)**: Continuous deployment from the `master` branch. Fully configured with `vercel.json` rewrite rules to support React Router SPA client routing and instant page reloads.
- **Backend (Render Optional)**: Node/Express runner included via `server.js` (`npm start`) for containerized host environments.

---

<div align="center">
  <h2>👨‍💻 Made by Aditya Singh</h2>
  
  <p>Passionate about building intuitive software and pushing the boundaries of AI integration in educational technology.</p>
  
  <div>
    <a href="https://github.com/Aadityasingh08"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
    <a href="https://linkedin.com/in/aditya-singh"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
    <a href="mailto:your_email@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
  </div>
</div>
