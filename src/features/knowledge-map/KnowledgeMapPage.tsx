import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { KnowledgeNode } from '../../types';
import {
  Brain,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckSquare,
  BookOpen,
  X
} from 'lucide-react';

export const KnowledgeMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  const {
    knowledgeNodes,
    knowledgeEdges,
    selectedNodeId,
    selectNode,
    addStudySession
  } = useEduNexusStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial selection if highlighted
  useEffect(() => {
    if (highlightId) {
      selectNode(highlightId);
    }
  }, [highlightId, selectNode]);

  const selectedNode =
    knowledgeNodes.find((n) => n.id === selectedNodeId) ||
    knowledgeNodes.find((n) => n.id === 'node-dbms-norm') ||
    knowledgeNodes[0];

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Node color helper
  const getNodeColor = (status: KnowledgeNode['status']) => {
    switch (status) {
      case 'mastered':
        return {
          fill: '#22A06B',
          bg: 'bg-[#22A06B]',
          soft: '#EAF8F1',
          text: 'text-[#22A06B]',
          label: 'Mastered'
        };
      case 'learning':
        return {
          fill: '#1677FF',
          bg: 'bg-[#1677FF]',
          soft: '#EAF4FF',
          text: 'text-[#1677FF]',
          label: 'Learning'
        };
      case 'needs-practice':
        return {
          fill: '#F59E0B',
          bg: 'bg-[#F59E0B]',
          soft: '#FFF5DF',
          text: 'text-[#F59E0B]',
          label: 'Needs Practice'
        };
      case 'weak':
        return {
          fill: '#EF4444',
          bg: 'bg-[#EF4444]',
          soft: '#FFF0F0',
          text: 'text-[#EF4444]',
          label: 'Weak'
        };
    }
  };

  const categories = ['All', 'DBMS', 'Python', 'DSA'];

  const filteredNodes = knowledgeNodes.filter((n) => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch =
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
      {/* Main Interactive Graph Canvas */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 pointer-events-auto bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Find curriculum topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-transparent text-xs outline-none w-36 sm:w-48 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#1677FF] text-white'
                      : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Graph Status Legend */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl text-xs font-medium pointer-events-auto">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-700 dark:text-slate-300">Mastered (80%+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-700 dark:text-slate-300">Learning (60-79%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-700 dark:text-slate-300">Practice (40-59%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-700 dark:text-slate-300">Weak (&lt;40%)</span>
            </div>
          </div>

          {/* Zoom / Pan Controls */}
          <div className="flex items-center gap-1 pointer-events-auto bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SVG Graph Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex-1 w-full h-full cursor-grab active:cursor-grabbing select-none relative overflow-hidden bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] dark:bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px]"
        >
          <svg
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '50% 50%',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1677FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7657FF" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {knowledgeEdges.map((edge) => {
              const srcNode = knowledgeNodes.find((n) => n.id === edge.source);
              const tgtNode = knowledgeNodes.find((n) => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              return (
                <g key={edge.id}>
                  <line
                    x1={srcNode.x || 300}
                    y1={srcNode.y || 300}
                    x2={tgtNode.x || 400}
                    y2={tgtNode.y || 400}
                    stroke="url(#edgeGrad)"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  {edge.label && (
                    <text
                      x={((srcNode.x || 300) + (tgtNode.x || 400)) / 2}
                      y={((srcNode.y || 300) + (tgtNode.y || 400)) / 2 - 5}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      className="select-none font-mono"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Interactive Concept Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedNode?.id;
              const style = getNodeColor(node.status);
              const radius = node.radius || 30;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x || 300}, ${node.y || 300})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectNode(node.id);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse if selected */}
                  {isSelected && (
                    <circle
                      r={radius + 10}
                      fill="none"
                      stroke={style.fill}
                      strokeWidth="2"
                      strokeDasharray="5 3"
                      className="animate-spin"
                      style={{ transformOrigin: '0 0', animationDuration: '6s' }}
                    />
                  )}

                  {/* Halo Glow */}
                  <circle
                    r={radius + 4}
                    fill={style.fill}
                    fillOpacity="0.15"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Main Node Circle */}
                  <circle
                    r={radius}
                    fill={style.fill}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Mastery Percentage Badge inside node */}
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="select-none pointer-events-none"
                  >
                    {node.mastery}%
                  </text>

                  {/* Label Text below node */}
                  <text
                    textAnchor="middle"
                    dy={radius + 16}
                    fill="currentColor"
                    fontSize="11"
                    fontWeight="bold"
                    className="select-none text-[#0F172A] dark:text-[#F8FAFC]"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Mini-map Snapshot (Bottom Left) */}
          <div className="absolute bottom-5 left-5 hidden sm:block p-3 rounded-2xl bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-[#1E293B] shadow-xl w-44">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 block">
              Knowledge Map Radar
            </span>
            <div className="w-full aspect-4/3 bg-[#F8FAFC] dark:bg-[#0E1626] rounded-lg relative overflow-hidden border">
              {knowledgeNodes.map((n) => (
                <div
                  key={n.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${((n.x || 300) / 900) * 100}%`,
                    top: `${((n.y || 300) / 600) * 100}%`,
                    backgroundColor: getNodeColor(n.status).fill
                  }}
                />
              ))}
              {/* Viewport frame */}
              <div className="absolute inset-2 border border-[#1677FF]/60 rounded pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE DRAWER: Concept Inspector */}
      <div className="w-full md:w-96 flex flex-col border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1524] overflow-y-auto p-6 space-y-5 select-none shadow-2xl z-20">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Node Inspector
            </span>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
              getNodeColor(selectedNode.status).soft
            } ${getNodeColor(selectedNode.status).text}`}
          >
            {getNodeColor(selectedNode.status).label}
          </span>
        </div>

        {/* Concept Title & Mastery Bar */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
            {selectedNode.category} Module
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 mb-2">
            {selectedNode.label}
          </h2>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Curriculum Mastery</span>
              <span className={getNodeColor(selectedNode.status).text}>
                {selectedNode.mastery}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${selectedNode.mastery}%`,
                  backgroundColor: getNodeColor(selectedNode.status).fill
                }}
              />
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Required Prerequisites:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.prerequisites.map((p, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Related Concepts */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Directly Related Concepts:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.relatedConcepts.map((r, i) => (
              <span
                key={i}
                onClick={() => {
                  const match = knowledgeNodes.find((n) =>
                    n.label.toLowerCase().includes(r.toLowerCase())
                  );
                  if (match) selectNode(match.id);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-600 hover:text-white cursor-pointer transition-colors"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Common Misconceptions */}
        {selectedNode.commonMisconception && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Student Misconception</span>
            </div>
            <p className="text-xs text-amber-200 leading-relaxed">
              "{selectedNode.commonMisconception}"
            </p>
          </div>
        )}

        {/* Recommended Action & CTAs */}
        <div className="pt-2 space-y-3">
          <button
            onClick={() =>
              navigate(`/tutor?topic=${encodeURIComponent(selectedNode.label)}`)
            }
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Topic with Academic Tutor</span>
          </button>

          <button
            onClick={() => navigate('/quizzes/quiz-normalization')}
            className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white text-emerald-400 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Practice 5-Question Quiz</span>
          </button>

          <button
            onClick={() => {
              addStudySession({
                title: `Revision Sprint: ${selectedNode.label}`,
                subject: selectedNode.category,
                timeSlot: '19:30 - 20:00',
                durationMinutes: 30,
                date: '2026-09-19',
                type: 'revision',
                priority: 'high',
                completed: false,
                aiSuggested: true
              });
              navigate('/study-plan');
            }}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white dark:hover:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>+ Add to Today's Study Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
