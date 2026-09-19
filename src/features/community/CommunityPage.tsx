import React, { useState } from 'react';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import {
  Users,
  Search,
  MessageSquare,
  ThumbsUp,
  Plus,
  Send,
  X,
  BookOpen
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { communityPosts, upvotePost, addReplyToPost, createPost } = useEduNexusStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(communityPosts[0]?.id || null);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTagsString, setNewTagsString] = useState('DBMS, Normalization');

  const allTags = ['All', 'DBMS', 'Normalization', 'ExamPrep', 'DSA', 'Algorithms', 'InterviewPrep'];

  const filteredPosts = communityPosts.filter((p) => {
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const tags = newTagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    createPost(newTitle.trim(), newContent.trim(), tags.length ? tags : ['General']);
    setNewTitle('');
    setNewContent('');
    setIsNewPostModalOpen(false);
  };

  const handleSendReply = (postId: string) => {
    const text = replyInput[postId]?.trim();
    if (!text) return;
    addReplyToPost(postId, text);
    setReplyInput((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full font-mono">
              Academic Peer Network
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Discourse & Peer Study Forum
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discuss challenging concepts, share intuitive mnemonics, and solve homework & exam doubts together.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                selectedTag === tag
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isExpanded = expandedThreadId === post.id;
          return (
            <div
              key={post.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              {/* Author & Post Details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-600/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {post.author.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">{post.timestamp}</span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => upvotePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                      post.userHasUpvoted
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#161F30]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.upvotes} Upvotes</span>
                  </button>

                  <button
                    onClick={() => setExpandedThreadId(isExpanded ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#161F30]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.repliesCount} Replies</span>
                  </button>
                </div>
              </div>

              {/* Replies Section */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Peer Explanations & Answers:
                  </span>

                  <div className="space-y-3">
                    {post.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                            />
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {reply.author.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Reply Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Share your perspective or mnemonic rule..."
                      value={replyInput[post.id] || ''}
                      onChange={(e) =>
                        setReplyInput((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendReply(post.id);
                      }}
                      className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleSendReply(post.id)}
                      className="px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Question / Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ask the Student Community
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do I remember 2NF vs 3NF easily?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Explanation / Context</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe where you are stuck or what concept seems counter-intuitive..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="DBMS, Normalization, Exam"
                  value={newTagsString}
                  onChange={(e) => setNewTagsString(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
