"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Clock, AlertTriangle, MessageCircle, Share2,
  CheckCircle2, Circle, Copy, Send, ThumbsUp, Flag, ChevronDown, ChevronUp, User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

// ============ DEMO DATA ============
const DEMO_POST = {
  id: "post-1",
  title: "ঢাকায় গৃহকর্মে নিয়োজিত ৯ বছরের শিশুকে নির্যাতনের অভিযোগ",
  body: `<p>ঢাকার গুলশান এলাকায় গৃহকর্মে নিয়োজিত ৯ বছরের এক শিশুকে গৃহকর্তা দম্পতি দীর্ঘদিন ধরে শারীরিক ও মানসিকভাবে নির্যাতন করে আসছিল বলে অভিযোগ উঠেছে। প্রতিবেশীদের খবরে police শিশুটিকে উদ্ধার করেছে।</p>
<p>শিশুটির শরীরে পুরনো ও নতুন আঘাতের চিহ্ন পাওয়া গেছে। গৃহকর্তা দম্পতিকে গ্রেফতার করা হয়েছে।</p>
<p>স্থানীয় মানবাধিকার সংগঠন জানিয়েছে, এই ধরনের ঘটনা রোধে কঠোর আইন প্রয়োগ এবং সামাজিক সচেতনতা বৃদ্ধি জরুরি। তারা দ্রুত বিচারের দাবি জানিয়েছে।</p>
<h3>দাবিসমূহ:</h3>
<ul>
<li>গৃহকর্তা দম্পতির সর্বোচ্চ শাস্তি</li>
<li>শিশুটির পুনর্বাসন ও মানসিক চিকিৎসা</li>
<li>গৃহকর্মে শিশু নিয়োগ বন্ধে কঠোর আইন</li>
</ul>`,
  category: "child_abuse",
  categoryLabel: "শিশু নির্যাতন",
  severity: "critical",
  district: "ঢাকা",
  status: "investigating",
  statusLabel: "তদন্তাধীন",
  statusEmoji: "🟡",
  daysWithoutJustice: 45,
  reactions: { anger: 234, sad: 189, solidarity: 156, witness: 42 },
  commentCount: 67,
  shareCount: 128,
  isAnonymous: false,
  authorName: "রহিমা আক্তার",
  authorBadge: "✅ যাচাইকৃত সাংবাদিক",
  createdAt: "১৮ মে, ২০২৬",
  createdAtRelative: "৩ দিন আগে",
  dateOfIncident: "১ এপ্রিল, ২০২৬",
  caseNumber: "GD-2026-04512",
  sourceLinks: ["https://example.com/news-1"],
  tags: ["শিশু_রক্ষা", "গুলশান", "গৃহকর্মী_নির্যাতন"],
  timeline: [
    { step: "ঘটনা", date: "১ এপ্রিল, ২০২৬", note: "গুলশানে শিশু উদ্ধার", isCompleted: true, daysElapsed: 0 },
    { step: "মামলা দায়ের", date: "৪ এপ্রিল, ২০২৬", note: "গুলশান থানায় মামলা", isCompleted: true, daysElapsed: 3 },
    { step: "গ্রেফতার", date: "৫ এপ্রিল, ২০২৬", note: "গৃহকর্তা দম্পতি গ্রেফতার", isCompleted: true, daysElapsed: 1 },
    { step: "বিচার শুরু", date: null, note: "", isCompleted: false, daysElapsed: null },
    { step: "রায়", date: null, note: "", isCompleted: false, daysElapsed: null },
    { step: "কার্যকর", date: null, note: "", isCompleted: false, daysElapsed: null },
  ],
};

const DEMO_COMMENTS = [
  {
    id: "c1", authorName: "আহমেদ করিম", body: "এই ধরনের নির্যাতন সহ্য করা যায় না। দ্রুত বিচার চাই।", time: "২ ঘণ্টা আগে", likes: 23,
    replies: [
      { id: "c1r1", authorName: "ফাতেমা বেগম", body: "একমত। আমাদের সবাইকে একসাথে আওয়াজ তুলতে হবে।", time: "১ ঘণ্টা আগে", likes: 8 },
    ],
  },
  { id: "c2", authorName: "রাজিব হাসান", body: "শিশুশ্রম ও শিশু নির্যাতন বন্ধে কঠোর আইন দরকার। সরকারকে এগিয়ে আসতে হবে।", time: "৫ ঘণ্টা আগে", likes: 45, replies: [] },
  { id: "c3", authorName: "নুসরাত জাহান", body: "আমি এই মামলায় আইনি সহায়তা দিতে প্রস্তুত। যোগাযোগ করুন।", time: "৮ ঘণ্টা আগে", likes: 67, replies: [
    { id: "c3r1", authorName: "মোস্তফা কামাল", body: "আপনাকে ধন্যবাদ। এভাবেই এগিয়ে আসতে হবে সবাইকে।", time: "৭ ঘণ্টা আগে", likes: 12 },
  ]},
  { id: "c4", authorName: "বেনামী ব্যবহারকারী", body: "আমি ওই এলাকায় থাকি। আরও অনেক শিশু এভাবে নির্যাতিত হচ্ছে কিন্তু কেউ কিছু বলে না।", time: "১ দিন আগে", likes: 89, replies: [] },
];

// ============ CASE TIMELINE ============
function CaseTimeline({ timeline }: { timeline: typeof DEMO_POST.timeline }) {
  const lastCompletedIdx = timeline.reduce((acc, step, i) => (step.isCompleted ? i : acc), -1);
  return (
    <div className="relative" id="case-timeline">
      {timeline.map((step, i) => {
        const isActive = i === lastCompletedIdx + 1 && !step.isCompleted;
        return (
          <div key={i} className="flex gap-4 pb-6 last:pb-0">
            {/* Line + Dot */}
            <div className="flex flex-col items-center">
              <div className={
                step.isCompleted ? "timeline-dot-completed" :
                isActive ? "timeline-dot-active" :
                "timeline-dot-pending"
              }>
                {step.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
              </div>
              {i < timeline.length - 1 && (
                <div className={`w-0.5 flex-1 mt-1 ${step.isCompleted ? "bg-positive-300 dark:bg-positive-700" : "bg-surface-200 dark:bg-surface-700 border-dashed"}`} />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-bold ${step.isCompleted ? "text-surface-900 dark:text-surface-100" : isActive ? "text-brand-500" : "text-surface-400"}`}>
                  {step.step}
                </span>
                {step.date && <span className="text-xs text-surface-400">{step.date}</span>}
                {step.daysElapsed !== null && step.daysElapsed > 0 && (
                  <span className="text-[10px] bg-surface-100 dark:bg-surface-700 px-1.5 py-0.5 rounded text-surface-500">
                    +{step.daysElapsed} দিন
                  </span>
                )}
              </div>
              {step.note && <p className="text-xs text-surface-500 mt-0.5">{step.note}</p>}
              {isActive && <p className="text-xs text-brand-500 mt-1 animate-pulse font-medium">⏳ অপেক্ষমাণ...</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ REACTION BAR ============
function ReactionBar({ reactions }: { reactions: typeof DEMO_POST.reactions }) {
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  const items = [
    { key: "anger", emoji: "😡", label: "ক্ষোভ", count: reactions.anger },
    { key: "sad", emoji: "💔", label: "দুঃখ", count: reactions.sad },
    { key: "solidarity", emoji: "✊", label: "সংহতি", count: reactions.solidarity },
    { key: "witness", emoji: "👁️", label: "সাক্ষী", count: reactions.witness },
  ];
  const toggle = (key: string) => setUserReactions((p) => ({ ...p, [key]: !p[key] }));
  return (
    <div className="flex flex-wrap gap-2" id="reaction-bar">
      {items.map((r) => (
        <button key={r.key} onClick={() => toggle(r.key)} className={`${userReactions[r.key] ? "reaction-btn-active" : "reaction-btn-inactive"} text-base`} id={`reaction-${r.key}`} aria-label={r.label}>
          <span className="text-lg">{r.emoji}</span>
          <span>{r.label}</span>
          <span className="font-bold">{r.count + (userReactions[r.key] ? 1 : 0)}</span>
        </button>
      ))}
    </div>
  );
}

// ============ SHARE BUTTONS ============
function ShareButtons() {
  const copyLink = () => { navigator.clipboard.writeText(window.location.href); toast.success("লিংক কপি হয়েছে!"); };
  return (
    <div className="flex flex-wrap gap-2" id="share-buttons">
      <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")} className="btn-secondary !text-xs">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
        Facebook
      </button>
      <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(DEMO_POST.title + " " + window.location.href)}`, "_blank")} className="btn-secondary !text-xs"><MessageCircle className="w-4 h-4" /> WhatsApp</button>
      <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(DEMO_POST.title)}`, "_blank")} className="btn-secondary !text-xs"><Share2 className="w-4 h-4" /> Twitter</button>
      <button onClick={copyLink} className="btn-secondary !text-xs"><Copy className="w-4 h-4" /> লিংক কপি</button>
    </div>
  );
}

// ============ COMMENT ITEM ============
interface MockComment {
  id: string;
  authorName: string;
  body: string;
  time: string;
  likes: number;
  replies?: MockComment[];
}

function CommentItem({ comment, isReply = false }: { comment: MockComment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  return (
    <div className={`${isReply ? "ml-10 mt-3" : "mt-4"}`} id={`comment-${comment.id}`}>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {comment.authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">{comment.authorName}</span>
              <span className="text-xs text-surface-400">{comment.time}</span>
            </div>
            <p className="text-sm text-surface-700 dark:text-surface-300 font-bangla leading-relaxed">{comment.body}</p>
          </div>
          <div className="flex items-center gap-3 mt-1.5 ml-2">
            <button onClick={() => setLiked(!liked)} className={`text-xs flex items-center gap-1 ${liked ? "text-brand-500" : "text-surface-400 hover:text-surface-600"}`}>
              <ThumbsUp className="w-3 h-3" /> {comment.likes + (liked ? 1 : 0)}
            </button>
            <button className="text-xs text-surface-400 hover:text-surface-600">উত্তর দিন</button>
            <button className="text-xs text-surface-400 hover:text-critical-500"><Flag className="w-3 h-3" /></button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <>
              <button onClick={() => setShowReplies(!showReplies)} className="text-xs text-brand-500 mt-2 ml-2 flex items-center gap-1">
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {comment.replies.length} টি উত্তর
              </button>
              {showReplies && comment.replies.map((reply: MockComment) => <CommentItem key={reply.id} comment={reply} isReply />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ MAIN POST DETAIL PAGE ============
export default function PostDetailPage() {
  const [commentText, setCommentText] = useState("");
  const post = DEMO_POST;
  const badgeClass = post.severity === "critical" ? "badge-critical" : post.severity === "high" ? "badge-high" : "badge-positive";
  const severityBorder = post.severity === "critical" ? "border-l-critical-500" : post.severity === "high" ? "border-l-high-500" : "border-l-positive-500";

  return (
    <div className="page-container page-section animate-fade-in">
      <Link href="/home" className="btn-ghost !px-3 !py-1.5 mb-4 inline-flex" id="post-back">
        <ArrowLeft className="w-4 h-4" /> ফিডে ফিরে যান
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <article className={`lg:col-span-2 card border-l-4 ${severityBorder}`} id="post-detail">
          <div className="p-5 sm:p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={badgeClass}>{post.categoryLabel}</span>
              <span className="badge-default"><MapPin className="w-3 h-3" /> {post.district}</span>
              <span className="badge-default">{post.statusEmoji} {post.statusLabel}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100 font-bangla mb-4 leading-tight">{post.title}</h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-100 dark:border-surface-700/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">{post.authorName.charAt(0)}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-surface-900 dark:text-surface-100">{post.authorName}</span>
                  <span className="text-xs text-positive-600 bg-positive-50 dark:bg-positive-900/30 px-2 py-0.5 rounded-full">{post.authorBadge}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-400">
                  <Clock className="w-3 h-3" /> {post.createdAtRelative} · ঘটনার তারিখ: {post.dateOfIncident}
                </div>
              </div>
            </div>

            {/* Days Without Justice */}
            {post.status !== "resolved" && (
              <div className="justice-counter-critical mb-6 inline-flex text-sm">
                <AlertTriangle className="w-4 h-4" /> {post.daysWithoutJustice} দিন বিচারহীন
              </div>
            )}

            {/* Body */}
            <div className="prose dark:prose-invert max-w-none mb-8 text-surface-700 dark:text-surface-300 font-bangla leading-relaxed" dangerouslySetInnerHTML={{ __html: post.body }} />

            {/* Case Info */}
            {post.caseNumber && (
              <div className="bg-surface-50 dark:bg-surface-900/50 rounded-xl p-4 mb-6">
                <p className="text-xs text-surface-500">মামলা নম্বর: <span className="font-mono font-bold text-surface-700 dark:text-surface-300">{post.caseNumber}</span></p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <hr className="border-surface-100 dark:border-surface-700/50 mb-6" />

            {/* Reactions */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3">প্রতিক্রিয়া</h3>
              <ReactionBar reactions={post.reactions} />
            </div>

            {/* Share */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3">শেয়ার করুন</h3>
              <ShareButtons />
            </div>

            <hr className="border-surface-100 dark:border-surface-700/50 mb-6" />

            {/* Comments */}
            <section id="comments-section">
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> মন্তব্য ({post.commentCount})
              </h3>

              {/* Comment Input */}
              <div className="flex gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-400 shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 flex gap-2">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="আপনার মন্তব্য লিখুন..."
                    className="input !py-2 resize-none"
                    rows={2}
                    id="comment-input"
                  />
                  <button className="btn-primary self-end !px-3" disabled={!commentText.trim()} onClick={() => { toast.success("মন্তব্য প্রকাশিত হয়েছে!"); setCommentText(""); }} id="comment-submit">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-1">
                {DEMO_COMMENTS.map((c) => <CommentItem key={c.id} comment={c} />)}
              </div>
            </section>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          {/* Case Timeline */}
          <div className="glass-card p-5" id="sidebar-timeline">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla">📋 মামলার অগ্রগতি</h3>
            <CaseTimeline timeline={post.timeline} />
          </div>

          {/* Petition Widget */}
          <div className="glass-card p-5 bg-gradient-to-br from-brand-50 to-brand-100/30 dark:from-brand-900/20 dark:to-brand-800/10" id="sidebar-petition">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-2 font-bangla">✍️ আবেদন চলমান</h3>
            <p className="text-xs text-surface-500 mb-3 font-bangla">এই মামলার বিচার দাবিতে স্বাক্ষর দিন</p>
            <div className="relative h-2.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden mb-2">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" style={{ width: "64.7%" }} />
            </div>
            <div className="flex justify-between text-xs text-surface-500 mb-3">
              <span>৬৪৭ / ১,০০০ স্বাক্ষর</span>
              <span>৬৫%</span>
            </div>
            <Link href="/petition/petition-1" className="btn-primary w-full !text-sm">✍️ স্বাক্ষর দিন</Link>
          </div>

          {/* Related Posts */}
          <div className="glass-card p-5" id="sidebar-related">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">সম্পর্কিত ঘটনা</h3>
            <div className="space-y-3">
              {[
                { title: "সিরাজগঞ্জে মাদ্রাসা শিক্ষক কর্তৃক শিশু নির্যাতন", cat: "শিশু নির্যাতন" },
                { title: "নারায়ণগঞ্জে শিশুশ্রম: কারখানায় শিশু গুরুতর আহত", cat: "শিশু নির্যাতন" },
              ].map((p, i) => (
                <Link key={i} href={`/post/related-${i}`} className="block p-3 rounded-lg bg-surface-50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                  <span className="badge-critical text-[10px] mb-1">{p.cat}</span>
                  <p className="text-xs font-medium text-surface-700 dark:text-surface-300 line-clamp-2 font-bangla">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
