"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Share2,
  Clock,
  AlertTriangle,
  Eye,
} from "lucide-react";

// ============ DEMO DATA ============
const DEMO_POSTS = [
  {
    id: "post-1",
    title: "ঢাকায় গৃহকর্মে নিয়োজিত ৯ বছরের শিশুকে নির্যাতনের অভিযোগ",
    body: "ঢাকার গুলশান এলাকায় গৃহকর্মে নিয়োজিত ৯ বছরের এক শিশুকে গৃহকর্তা দম্পতি দীর্ঘদিন ধরে শারীরিক ও মানসিকভাবে নির্যাতন করে আসছিল বলে অভিযোগ উঠেছে। প্রতিবেশীদের খবরে পুলিশ শিশুটিকে উদ্ধার করেছে।",
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
    createdAt: "৩ দিন আগে",
    isPinned: false,
    tags: ["শিশু_রক্ষা", "গুলশান"],
  },
  {
    id: "post-2",
    title: "রাজশাহীতে সড়ক নির্মাণে নিম্নমানের কাজ: ঠিকাদার ও প্রকৌশলীর বিরুদ্ধে অভিযোগ",
    body: "রাজশাহী শহরে সম্প্রতি নির্মিত ৫ কিলোমিটার সড়ক মাত্র দুই মাসের মধ্যে ভেঙে পড়েছে। ২০ কোটি টাকা ব্যয়ে নির্মিত এই সড়কে নিম্নমানের উপকরণ ব্যবহারের অভিযোগ উঠেছে।",
    category: "corruption",
    categoryLabel: "দুর্নীতি",
    severity: "high",
    district: "রাজশাহী",
    status: "no_action",
    statusLabel: "কোন ব্যবস্থা হয়নি",
    statusEmoji: "🔴",
    daysWithoutJustice: 89,
    reactions: { anger: 567, sad: 123, solidarity: 345, witness: 23 },
    commentCount: 134,
    shareCount: 256,
    isAnonymous: true,
    authorName: "",
    createdAt: "৫ দিন আগে",
    isPinned: false,
    tags: ["দুর্নীতি_রুখো", "রাজশাহী"],
  },
  {
    id: "post-3",
    title: "চট্টগ্রামে জমি বিরোধে কৃষককে হত্যা",
    body: "চট্টগ্রামের আনোয়ারা উপজেলায় জমি সংক্রান্ত বিরোধকে কেন্দ্র করে এক কৃষককে কুপিয়ে হত্যা করা হয়েছে। নিহত আবদুল করিম (৫৫) তার নিজের জমিতে চাষ করতে গেলে প্রতিপক্ষ দল হামলা চালায়।",
    category: "murder",
    categoryLabel: "হত্যাকাণ্ড",
    severity: "critical",
    district: "চট্টগ্রাম",
    status: "investigating",
    statusLabel: "তদন্তাধীন",
    statusEmoji: "🟡",
    daysWithoutJustice: 34,
    reactions: { anger: 890, sad: 456, solidarity: 678, witness: 89 },
    commentCount: 213,
    shareCount: 445,
    isAnonymous: false,
    authorName: "মোস্তফা কামাল",
    createdAt: "১ সপ্তাহ আগে",
    isPinned: false,
    tags: ["ন্যায়বিচার_চাই", "চট্টগ্রাম"],
  },
  {
    id: "post-4",
    title: "সিলেটে সাংবাদিককে গুলি করে হত্যা: প্রতিবাদে সাংবাদিক সমাজ",
    body: "সিলেটে স্থানীয় সংবাদপত্রের একজন অনুসন্ধানী সাংবাদিক রফিকুল ইসলামকে (৪২) অজ্ঞাত বন্দুকধারীরা গুলি করে হত্যা করেছে। তিনি সম্প্রতি অবৈধ খনি নিয়ে ধারাবাহিক প্রতিবেদন প্রকাশ করছিলেন।",
    category: "murder",
    categoryLabel: "হত্যাকাণ্ড",
    severity: "critical",
    district: "সিলেট",
    status: "no_action",
    statusLabel: "কোন ব্যবস্থা হয়নি",
    statusEmoji: "🔴",
    daysWithoutJustice: 120,
    reactions: { anger: 1245, sad: 789, solidarity: 934, witness: 45 },
    commentCount: 356,
    shareCount: 678,
    isAnonymous: false,
    authorName: "নুসরাত জাহান",
    createdAt: "২ সপ্তাহ আগে",
    isPinned: false,
    tags: ["সংবাদমাধ্যম_স্বাধীনতা", "সিলেট"],
  },
  {
    id: "post-5",
    title: "রংপুরে ৩ বছর পর ধর্ষণ মামলায় সর্বোচ্চ সাজা: ন্যায়বিচারের জয়",
    body: "রংপুরে ২০২৩ সালে সংঘটিত একটি ধর্ষণ মামলায় অবশেষে আদালত যাবজ্জীবন কারাদণ্ড প্রদান করেছেন। ভুক্তভোগীর পরিবারের অক্লান্ত লড়াই এবং সামাজিক আন্দোলনের ফলে মামলাটি দ্রুত বিচারে গৃহীত হয়।",
    category: "success",
    categoryLabel: "সফলতার গল্প",
    severity: "positive",
    district: "রংপুর",
    status: "resolved",
    statusLabel: "সমাধানকৃত",
    statusEmoji: "🟢",
    daysWithoutJustice: 0,
    reactions: { anger: 12, sad: 34, solidarity: 1567, witness: 234 },
    commentCount: 189,
    shareCount: 345,
    isAnonymous: false,
    authorName: "আহমেদ করিম",
    createdAt: "১ দিন আগে",
    isPinned: false,
    tags: ["ন্যায়বিচার", "সফলতা"],
  },
  {
    id: "post-6",
    title: "খুলনায় যৌতুকের দায়ে নববধূকে হত্যার অভিযোগ",
    body: "খুলনা জেলায় বিয়ের মাত্র তিন মাসের মাথায় এক নববধূকে হত্যার অভিযোগ উঠেছে শ্বশুরবাড়ির বিরুদ্ধে। নিহত ফারজানা আক্তার (২২)-এর পরিবার জানিয়েছে, যৌতুকের দাবিতে তাকে ক্রমাগত নির্যাতন করা হতো।",
    category: "domestic_violence",
    categoryLabel: "পারিবারিক সহিংসতা",
    severity: "high",
    district: "খুলনা",
    status: "in_court",
    statusLabel: "বিচারাধীন",
    statusEmoji: "🟠",
    daysWithoutJustice: 67,
    reactions: { anger: 456, sad: 678, solidarity: 345, witness: 56 },
    commentCount: 98,
    shareCount: 167,
    isAnonymous: false,
    authorName: "ফাতেমা বেগম",
    createdAt: "৪ দিন আগে",
    isPinned: false,
    tags: ["যৌতুক_প্রতিরোধ", "খুলনা"],
  },
  {
    id: "post-7",
    title: "কুমিল্লায় সরকারি হাসপাতালে ওষুধ কেলেঙ্কারি: কোটি টাকার দুর্নীতির অভিযোগ",
    body: "কুমিল্লা জেনারেল হাসপাতালে সরকারি তহবিল থেকে কোটি টাকার ওষুধ ক্রয়ে ব্যাপক অনিয়মের অভিযোগ উঠেছে। বাজার মূল্যের তিনগুণ দামে ওষুধ কেনা হয়েছে এবং সরবরাহকৃত ওষুধের বড় অংশই মেয়াদোত্তীর্ণ।",
    category: "corruption",
    categoryLabel: "দুর্নীতি",
    severity: "high",
    district: "কুমিল্লা",
    status: "investigating",
    statusLabel: "তদন্তাধীন",
    statusEmoji: "🟡",
    daysWithoutJustice: 56,
    reactions: { anger: 345, sad: 123, solidarity: 234, witness: 67 },
    commentCount: 87,
    shareCount: 145,
    isAnonymous: true,
    authorName: "",
    createdAt: "৬ দিন আগে",
    isPinned: false,
    tags: ["স্বাস্থ্য_অধিকার", "কুমিল্লা"],
  },
  {
    id: "post-8",
    title: "বরিশালে ত্রাণ বিতরণে অনিয়ম: চেয়ারম্যানের বিরুদ্ধে গ্রামবাসীর অভিযোগ",
    body: "বরিশাল জেলার একটি ইউনিয়ন পরিষদের চেয়ারম্যানের বিরুদ্ধে বন্যা ত্রাণ আত্মসাতের অভিযোগ আনা হয়েছে। গ্রামবাসীরা জানিয়েছেন, সরকারি ত্রাণ সামগ্রী ক্ষতিগ্রস্তদের মধ্যে বিতরণ না করে চেয়ারম্যান নিজের দলীয় সমর্থকদের মধ্যে বিতরণ করেছেন।",
    category: "corruption",
    categoryLabel: "দুর্নীতি",
    severity: "high",
    district: "বরিশাল",
    status: "investigating",
    statusLabel: "তদন্তাধীন",
    statusEmoji: "🟡",
    daysWithoutJustice: 23,
    reactions: { anger: 234, sad: 89, solidarity: 167, witness: 34 },
    commentCount: 56,
    shareCount: 89,
    isAnonymous: false,
    authorName: "রাজিব হাসান",
    createdAt: "২ দিন আগে",
    isPinned: false,
    tags: ["ত্রাণ_চুরি", "বরিশাল"],
  },
];

const BREAKING_CASE = {
  id: "post-4",
  title: "সিলেটে সাংবাদিককে গুলি করে হত্যা: প্রতিবাদে সাংবাদিক সমাজ",
  excerpt: "অনুসন্ধানী সাংবাদিক রফিকুল ইসলামকে অজ্ঞাত বন্দুকধারীরা গুলি করে হত্যা করেছে",
};

const CATEGORIES_FILTER = [
  { id: "child_abuse", label: "শিশু নির্যাতন", color: "bg-critical-500" },
  { id: "sexual_violence", label: "যৌন সহিংসতা", color: "bg-critical-500" },
  { id: "murder", label: "হত্যাকাণ্ড", color: "bg-critical-500" },
  { id: "corruption", label: "দুর্নীতি", color: "bg-high-500" },
  { id: "domestic_violence", label: "পারিবারিক সহিংসতা", color: "bg-high-500" },
  { id: "injustice", label: "বিচারহীনতা", color: "bg-medium-500" },
  { id: "institution_abuse", label: "শিক্ষা প্রতিষ্ঠানে নির্যাতন", color: "bg-medium-500" },
  { id: "success", label: "সফলতার গল্প", color: "bg-positive-500" },
  { id: "petition", label: "দাবি ও আন্দোলন", color: "bg-neutral_accent-500" },
  { id: "general", label: "সাধারণ পোস্ট", color: "bg-surface-400" },
];

const TRENDING_TAGS = [
  "#শিশু_রক্ষা",
  "#দুর্নীতি_রুখো",
  "#ন্যায়বিচার_চাই",
  "#সংবাদমাধ্যম_স্বাধীনতা",
  "#যৌতুক_প্রতিরোধ",
  "#বিচারহীনতা",
];

// ============ COMPONENTS ============

function BreakingBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="breaking-banner rounded-xl p-4 mb-6 text-white relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">
            🚨 জরুরি
          </span>
          <div className="min-w-0">
            <h2 className="font-bold text-sm sm:text-base truncate">{BREAKING_CASE.title}</h2>
            <p className="text-xs text-white/80 truncate hidden sm:block">{BREAKING_CASE.excerpt}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/post/${BREAKING_CASE.id}`}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            বিস্তারিত →
          </Link>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1" aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ post }: { post: (typeof DEMO_POSTS)[0] }) {
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  const severityClass = {
    critical: "severity-critical",
    high: "severity-high",
    medium: "severity-medium",
    positive: "severity-positive",
    neutral: "severity-neutral",
  }[post.severity] || "severity-neutral";

  const badgeClass = {
    critical: "badge-critical",
    high: "badge-high",
    medium: "badge-medium",
    positive: "badge-positive",
    neutral: "badge-neutral",
  }[post.severity] || "badge-default";

  const justiceClass =
    post.daysWithoutJustice > 30
      ? "justice-counter-critical"
      : post.daysWithoutJustice > 7
      ? "justice-counter-warning"
      : "justice-counter-normal";

  const toggleReaction = (type: string) => {
    setUserReactions((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const reactions = [
    { key: "anger", emoji: "😡", label: "ক্ষোভ", count: post.reactions.anger },
    { key: "sad", emoji: "💔", label: "দুঃখ", count: post.reactions.sad },
    { key: "solidarity", emoji: "✊", label: "সংহতি", count: post.reactions.solidarity },
    { key: "witness", emoji: "👁️", label: "সাক্ষী", count: post.reactions.witness },
  ];

  return (
    <article className={`card-hover ${severityClass} animate-slide-up`} id={`feed-card-${post.id}`}>
      <div className="p-4 sm:p-5">
        {/* Header: Category + District + Status */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={badgeClass}>{post.categoryLabel}</span>
          <span className="badge-default">
            <MapPin className="w-3 h-3" /> {post.district}
          </span>
          <span className="badge-default">
            {post.statusEmoji} {post.statusLabel}
          </span>
          {post.daysWithoutJustice > 0 && post.status !== "resolved" && (
            <span className={justiceClass}>
              <AlertTriangle className="w-3 h-3" />
              {post.daysWithoutJustice} দিন বিচারহীন
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/post/${post.id}`} className="group">
          <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Body Preview */}
        <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-4 font-bangla leading-relaxed">
          {post.body}
        </p>

        {/* Reactions */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {reactions.map((r) => (
            <button
              key={r.key}
              onClick={() => toggleReaction(r.key)}
              className={userReactions[r.key] ? "reaction-btn-active" : "reaction-btn-inactive"}
              id={`${post.id}-reaction-${r.key}`}
              aria-label={r.label}
            >
              <span>{r.emoji}</span>
              <span className="text-xs">{r.count + (userReactions[r.key] ? 1 : 0)}</span>
            </button>
          ))}
        </div>

        {/* Footer: Author + Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700/50">
          <div className="flex items-center gap-2 text-xs text-surface-500">
            {post.isAnonymous ? (
              <>
                <div className="w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                  <Eye className="w-3 h-3" />
                </div>
                <span className="font-medium">বেনামী সাক্ষী</span>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">
                  {post.authorName.charAt(0)}
                </div>
                <span className="font-medium">{post.authorName}</span>
              </>
            )}
            <span>·</span>
            <Clock className="w-3 h-3" />
            <span>{post.createdAt}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-surface-400">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> {post.commentCount}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> {post.shareCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeedSkeleton() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex gap-2">
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-6 w-3/4" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-8 w-16 rounded-full" />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-4 w-20" />
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============

export default function HomePage() {
  const [showBanner, setShowBanner] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading] = useState(false);

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const filteredPosts =
    selectedCategories.length === 0
      ? DEMO_POSTS
      : DEMO_POSTS.filter((p) => selectedCategories.includes(p.category));

  return (
    <div className="page-container page-section">
      <div className="flex gap-6">
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-5 sticky top-20 self-start" id="sidebar-left">
          {/* Category Filter */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">
              বিভাগ ফিল্টার
            </h3>
            <div className="space-y-1.5">
              {CATEGORIES_FILTER.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-xs text-surface-700 dark:text-surface-300 font-bangla">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-brand-500 hover:text-brand-600 mt-3 font-medium"
              >
                ফিল্টার রিসেট করুন
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">
              সারসংক্ষেপ
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-surface-500">মোট ঘটনা</span>
                <span className="font-bold text-surface-900 dark:text-surface-100">১,২৪৭</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-surface-500">বিচারহীন</span>
                <span className="font-bold text-critical-500">৮৩৪</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-surface-500">সমাধানকৃত</span>
                <span className="font-bold text-positive-500">৪১৩</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN FEED ===== */}
        <main className="flex-1 min-w-0 space-y-4" id="main-feed">
          {/* Breaking Banner */}
          {showBanner && <BreakingBanner onClose={() => setShowBanner(false)} />}

          {/* Feed Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 font-bangla">
              সাম্প্রতিক ঘটনা
            </h2>
            <span className="text-xs text-surface-400">
              {filteredPosts.length} টি পোস্ট
            </span>
          </div>

          {/* Feed Cards */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <FeedSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, i) => (
                <div key={post.id} style={{ animationDelay: `${i * 80}ms` }}>
                  <FeedCard post={post} />
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center py-6">
            <button className="btn-secondary" id="feed-load-more">
              আরও দেখুন
            </button>
          </div>
        </main>

        {/* ===== RIGHT SIDEBAR ===== */}
        <aside className="hidden xl:block w-72 shrink-0 space-y-5 sticky top-20 self-start" id="sidebar-right">
          {/* Today's Memory */}
          <div className="glass-card p-4 border-l-4 border-l-medium-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🕯️</span>
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 font-bangla">
                আজকের স্মৃতি
              </h3>
            </div>
            <p className="text-xs text-surface-500 mb-2 font-bangla">১ বছর আগে আজকের দিনে:</p>
            <Link
              href="/post/memory-1"
              className="text-sm text-surface-700 dark:text-surface-300 font-bangla hover:text-brand-500 transition-colors leading-relaxed"
            >
              &quot;নারায়ণগঞ্জে গার্মেন্টস শ্রমিক নিখোঁজ, লাশ উদ্ধার&quot;
            </Link>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="justice-counter-critical text-[10px]">
                <AlertTriangle className="w-2.5 h-2.5" />
                ৩৬৫ দিন বিচারহীন
              </span>
            </div>
            <p className="text-xs text-surface-400 mt-2 italic font-bangla">মনে আছে? এই ঘটনার বিচার এখনো হয়নি।</p>
          </div>

          {/* Live Counters */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">
              📊 লাইভ পরিসংখ্যান
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-surface-50 dark:bg-surface-900/50 rounded-xl">
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">১,২৪৭</p>
                <p className="text-[10px] text-surface-500">মোট ঘটনা</p>
              </div>
              <div className="text-center p-3 bg-critical-50 dark:bg-critical-900/20 rounded-xl">
                <p className="text-2xl font-bold text-critical-600 dark:text-critical-400">৮৩৪</p>
                <p className="text-[10px] text-surface-500">বিচারহীন</p>
              </div>
              <div className="text-center p-3 bg-positive-50 dark:bg-positive-900/20 rounded-xl">
                <p className="text-2xl font-bold text-positive-600 dark:text-positive-400">৪১৩</p>
                <p className="text-[10px] text-surface-500">সমাধানকৃত</p>
              </div>
              <div className="text-center p-3 bg-neutral_accent-50 dark:bg-neutral_accent-900/20 rounded-xl">
                <p className="text-2xl font-bold text-neutral_accent-600 dark:text-neutral_accent-400">৫৬</p>
                <p className="text-[10px] text-surface-500">চলমান আবেদন</p>
              </div>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">
              🔥 ট্রেন্ডিং
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 cursor-pointer transition-colors font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
