import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { generateAIResponse } from '../../services/aiService';
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Bookmark,
  RefreshCw,
  Brain,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Code,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicParam = searchParams.get('topic');

  const {
    tutorSessions,
    activeTutorSessionId,
    setActiveTutorSessionId,
    addMessageToActiveSession,
    createNewTutorSession,
    saveMessageToNotes,
    addStudySession,
    knowledgeNodes,
    studentProfile,
    addToast
  } = useEduNexusStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active session
  const activeSession =
    tutorSessions.find((s) => s.id === activeTutorSessionId) || tutorSessions[0];

  const currentTopic = topicParam || activeSession?.topic || 'Database Normalization';

  // Find corresponding knowledge node for right-side context panel
  const currentKnowledgeNode =
    knowledgeNodes.find((n) =>
      n.label.toLowerCase().includes(currentTopic.toLowerCase()) ||
      n.id === 'node-dbms-norm'
    ) || knowledgeNodes[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages, isTyping]);

  // Handle sending a message
  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputPrompt).trim();
    if (!messageText || isTyping) return;

    setInputPrompt('');

    // Add user message to store
    addMessageToActiveSession({
      sender: 'user',
      content: messageText
    });

    setIsTyping(true);

    try {
      // Build context from recent messages for conversational AI
      const recentMessages = (activeSession?.messages || [])
        .slice(-6)
        .map((m) => ({ sender: m.sender, content: m.content }));

      const response = await generateAIResponse(
        messageText,
        currentTopic,
        activeSession?.courseName || 'DBMS',
        {
          studentName: studentProfile.name,
          overallMastery: studentProfile.overallMastery,
          weakNodes: knowledgeNodes,
          recentMessages
        }
      );

      setIsTyping(false);
      addMessageToActiveSession({
        sender: 'assistant',
        content: response.content,
        concept: response.concept,
        breakdown: response.breakdown,
        codeSnippet: response.codeSnippet
      });
    } catch (e) {
      console.error(e);
      setIsTyping(false);
      addToast({
        type: 'error',
        title: 'AI Tutor Unavailable',
        message: 'Could not reach the AI. Your learning data is safe. Please retry.'
      });
    }
  };

  const handlePromptChip = (chipText: string) => {
    handleSendMessage(chipText);
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    addToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: 'AI response text copied.'
    });
  };

  const handleSpeechInput = () => {
    if (!isListening) {
      setIsListening(true);
      addToast({
        type: 'info',
        title: 'Voice Input Active',
        message: 'Listening... (Simulating speech recognition: "Explain 3NF with an example")'
      });
      setTimeout(() => {
        setInputPrompt('Explain 3NF with a simple real-world example');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
      {/* LEFT PANE: Syllabus Sessions & Topics */}
      <div className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1524] select-none">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Syllabus Topics
            </span>
          </div>
          <button
            onClick={() => {
              const newTopic = prompt('Enter new syllabus topic:', 'SQL Window Functions');
              if (newTopic) {
                createNewTutorSession(newTopic);
              }
            }}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 transition-colors"
            title="Start New Topic"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {tutorSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setActiveTutorSessionId(session.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all border ${
                session.id === activeSession.id
                  ? 'bg-amber-600/10 border-amber-500/30 text-white'
                  : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-850 border-transparent text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-500 uppercase">
                  {session.courseName}
                </span>
                <span className="text-[10px] text-slate-400">{session.lastActive}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {session.topic}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {session.messages[session.messages.length - 1]?.content.slice(0, 45)}...
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0B0F19]">
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Syllabus Companion Active</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Context synced with your university syllabus</p>
        </div>
      </div>

      {/* CENTER PANE: Academic Discussion & Concept Walkthrough */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-[#0B0F19]">
        {/* Chat Top Banner */}
        <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1524] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentTopic}
                </h2>
                <span className="text-[10px] bg-amber-600/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                  CS204 • Database Management Systems
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Academic tutor with step-by-step proofs, common exam pitfalls, and syllabus diagnostics.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/quizzes/quiz-normalization')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            <span>Practice Quiz for {currentTopic}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeSession.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>{msg.sender === 'user' ? 'Student' : 'Academic Tutor'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none space-y-3.5'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap leading-relaxed font-normal">
                  {msg.content}
                </div>

                {/* Structured Breakdown Cards if present */}
                {msg.breakdown && (
                  <div className="mt-3 space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 block mb-1">
                        Applied Example
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-200">
                        {msg.breakdown.example}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Common Exam Pitfall</span>
                      </div>
                      <p className="text-xs">
                        {msg.breakdown.commonMistake}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Concept Check</span>
                      </div>
                      <p className="text-xs">
                        {msg.breakdown.quickCheck}
                      </p>
                    </div>
                  </div>
                )}

                {/* Code Block if present */}
                {msg.codeSnippet && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100">
                    <div className="px-3.5 py-2 bg-slate-900/90 text-[11px] font-mono text-slate-400 flex items-center justify-between border-b border-slate-800">
                      <span>{msg.codeSnippet.language}</span>
                      <button
                        onClick={() => handleCopyText(msg.codeSnippet!.code)}
                        className="hover:text-white text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="p-3.5 text-xs font-mono overflow-x-auto text-emerald-400 bg-slate-950">
                      <code>{msg.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Assistant Message Actions Toolbar */}
                {msg.sender === 'assistant' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyText(msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Copy text"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => saveMessageToNotes(msg.id, msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 transition-colors"
                        title="Save to Course Notes"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSendMessage('Can you explain this again with another analogy?')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Alternative explanation"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick drill-down chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handlePromptChip('Explain simpler')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
                      >
                        Explain simpler
                      </button>
                      <button
                        onClick={() => handlePromptChip('Give me an analogy')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-orange-500 dark:text-orange-400 hover:bg-orange-600 hover:text-white transition-colors"
                      >
                        Give analogy
                      </button>
                      <button
                        onClick={() => handlePromptChip('Quiz me on this')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-emerald-500 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        Quiz me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 max-w-xs text-xs text-slate-500">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-medium">Formulating concept breakdown...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-6 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1524] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
            Suggested:
          </span>
          {[
            'Explain 3NF with real-world table',
            'Why does transitive dependency cause anomalies?',
            'What is BCNF vs 3NF?',
            'Create 5-minute revision flashcards',
            'Give practice questions for exam'
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handlePromptChip(promptText)}
              className="px-3 py-1 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-500 shrink-0 transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1524]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 rounded-2xl p-2 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500/20 transition-all"
          >
            <button
              type="button"
              onClick={handleSpeechInput}
              className={`p-2 rounded-xl text-slate-400 hover:text-amber-500 transition-colors ${
                isListening ? 'text-rose-500 animate-pulse bg-rose-500/10' : ''
              }`}
              title="Voice Input"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                const sample = prompt('Attach notes or code snippet text:');
                if (sample) setInputPrompt(prev => prev + ' ' + sample);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-amber-500 transition-colors"
              title="Attach context or code"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder={`Ask any question regarding ${currentTopic}...`}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none px-2"
            />

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-40 transition-all shadow-sm font-medium"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PANE: Contextual Curriculum Diagnostics */}
      <div className="hidden xl:flex w-80 flex-col border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1524] overflow-y-auto p-5 space-y-5 select-none">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Curriculum Diagnostics
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
            Live Syllabus Sync
          </span>
        </div>

        {/* Current Topic Details */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Syllabus Node:
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              DBMS → {currentTopic}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium">Topic Level</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Core Semester 4</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium">Concept Mastery</span>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">{currentKnowledgeNode.mastery}%</p>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Required Prerequisites:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {currentKnowledgeNode.prerequisites.map((req, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                ✓ {req}
              </span>
            ))}
          </div>
        </div>

        {/* Related Concepts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Related Curriculum Topics:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {currentKnowledgeNode.relatedConcepts.map((rel, i) => (
              <span
                key={i}
                onClick={() => handleSendMessage(`Explain how ${rel} relates to ${currentTopic}`)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-white cursor-pointer transition-colors"
              >
                {rel}
              </span>
            ))}
          </div>
        </div>

        {/* Weak Areas Detected */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Diagnosed Revision Focus:</span>
          </div>
          <p className="text-xs text-amber-200 leading-relaxed font-medium">
            Functional Dependencies & 2NF vs 3NF Transitive Dependencies
          </p>
        </div>

        {/* Recommended Action */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-amber-500/20 shadow-xs space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Recommended Action:
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Schedule a focused 20-minute practice sprint before your midterm quiz.
          </p>
          <button
            onClick={() => {
              addStudySession({
                title: 'Targeted Revision: Normalization (2NF/3NF)',
                subject: 'DBMS',
                timeSlot: '20:30 - 20:50',
                durationMinutes: 20,
                date: '2026-09-19',
                type: 'revision',
                priority: 'high',
                completed: false,
                aiSuggested: true
              });
              navigate('/study-plan');
            }}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>+ Add 20 Min Practice Sprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
