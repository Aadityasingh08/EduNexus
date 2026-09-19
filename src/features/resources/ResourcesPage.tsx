import React, { useState } from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  FolderArchive,
  Search,
  UploadCloud,
  Bookmark,
  FileText,
  Video,
  FileCode,
  Download,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { resources, toggleSaveResource, toggleUploadModal, addToast } = useEduNexusStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [onlySaved, setOnlySaved] = useState(false);

  const subjects = ['All', 'DBMS', 'Python', 'Data Structures', 'Computer Networks'];
  const types = ['All', 'PDF', 'Article', 'Video', 'Notes', 'Assignment'];

  const filtered = resources.filter((res) => {
    const matchesSubject = selectedSubject === 'All' || res.subject === selectedSubject;
    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesSaved = !onlySaved || res.isSaved;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesType && matchesSaved && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'Video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'Assignment':
        return <FileCode className="w-5 h-5 text-emerald-500" />;
      case 'Article':
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
      default:
        return <FileText className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleOpenResource = (title: string) => {
    addToast({
      type: 'info',
      title: 'Opening Resource Viewer',
      message: `Loading "${title}" in EduNexus reader...`
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 px-3 py-1 rounded-full font-mono">
              Curriculum Repository
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Resource Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access, bookmark, and upload lecture slides, PDF cheat sheets, and course documentation.
          </p>
        </div>

        <button
          onClick={() => toggleUploadModal(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-transform active:scale-95"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Academic Material</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, topics, or skills (e.g. Normalization, Lambdas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
              onlySaved
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#161F30]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Saved Only</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          {/* Subjects */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-bold text-slate-500 uppercase text-[10px] mr-1">Subject:</span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 dark:bg-[#161F30] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Types */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-bold text-slate-500 uppercase text-[10px] mr-1">Type:</span>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-50 dark:bg-[#161F30] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    {getTypeIcon(res.type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                      {res.subject} • {res.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {res.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaveResource(res.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    res.isSaved
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {res.summary}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                <span>{res.durationOrPages}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {res.difficulty}
                </span>
                {res.fileSize && <span>{res.fileSize}</span>}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleOpenResource(res.title)}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Open Material</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
