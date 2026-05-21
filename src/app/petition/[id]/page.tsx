"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  CheckCircle2,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// Demo petition data
const demoPetition = {
  id: "petition-1",
  postId: "post-3",
  title: "কুমিল্লায় সরকারি হাসপাতালে ওষুধ কেলেঙ্কারির বিচার দাবি",
  description: `কুমিল্লা জেনারেল হাসপাতালে সরকারি তহবিল থেকে কোটি টাকার ওষুধ ক্রয়ে ব্যাপক অনিয়মের অভিযোগ উঠেছে। বাজার মূল্যের তিনগুণ দামে ওষুধ কেনা হয়েছে এবং সরবরাহকৃত ওষুধের বড় অংশই মেয়াদোত্তীর্ণ।

আমরা দাবি করছি:
১. দুর্নীতির সাথে জড়িত সকল কর্মকর্তাদের গ্রেফতার
২. আত্মসাৎকৃত অর্থ পুনরুদ্ধার
৩. হাসপাতালে ওষুধ ক্রয় প্রক্রিয়ায় স্বচ্ছতা নিশ্চিতকরণ
৪. ভুক্তভোগী রোগীদের ক্ষতিপূরণ প্রদান`,
  goal: 1000,
  count: 647,
  createdAt: "2025-03-15",
  milestones: [100, 250, 500, 1000],
  recentSignatories: [
    { name: "আহমেদ করিম", time: "৫ মিনিট আগে" },
    { name: "ফাতেমা বেগম", time: "১২ মিনিট আগে" },
    { name: "রাজিব হাসান", time: "২৫ মিনিট আগে" },
    { name: "নুসরাত জাহান", time: "১ ঘণ্টা আগে" },
    { name: "মোস্তফা কামাল", time: "২ ঘণ্টা আগে" },
  ],
  linkedPost: {
    title: "কুমিল্লায় সরকারি হাসপাতালে ওষুধ কেলেঙ্কারি: কোটি টাকার দুর্নীতির অভিযোগ",
    category: "corruption",
    district: "কুমিল্লা",
  },
};

export default function PetitionPage() {
  const [hasSigned, setHasSigned] = useState(false);
  const [currentCount, setCurrentCount] = useState(demoPetition.count);
  const progress = (currentCount / demoPetition.goal) * 100;

  const handleSign = () => {
    if (!hasSigned) {
      setHasSigned(true);
      setCurrentCount((prev) => prev + 1);
      toast.success("আপনার স্বাক্ষর গ্রহণ করা হয়েছে!", {
        description: "ন্যায়বিচারের দাবিতে আপনার সমর্থনের জন্য ধন্যবাদ।",
      });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("লিংক কপি হয়েছে!");
  };

  const nextMilestone = demoPetition.milestones.find((m) => m > currentCount) || demoPetition.goal;

  return (
    <div className="page-container page-section animate-fade-in">
      {/* Back Button */}
      <Link
        href={`/post/${demoPetition.postId}`}
        className="btn-ghost !px-3 !py-1.5 mb-6 inline-flex"
        id="petition-back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>মূল পোস্টে ফিরে যান</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Petition Card */}
          <article className="card p-6 sm:p-8" id="petition-main">
            {/* Linked Post Reference */}
            <Link
              href={`/post/${demoPetition.postId}`}
              className="flex items-center gap-2 mb-4 text-sm text-surface-500 hover:text-brand-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="line-clamp-1">{demoPetition.linkedPost.title}</span>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="badge-high">দুর্নীতি</span>
              <span className="badge-default">📍 {demoPetition.linkedPost.district}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100 font-bangla mb-6">
              {demoPetition.title}
            </h1>

            {/* Progress Section */}
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-500" />
                  <span className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                    {currentCount.toLocaleString("bn-BD")}
                  </span>
                  <span className="text-surface-500">
                    / {demoPetition.goal.toLocaleString("bn-BD")} স্বাক্ষর
                  </span>
                </div>
                <span className="text-sm font-medium text-brand-500">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden mb-3">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
                {/* Milestone markers */}
                {demoPetition.milestones.map((milestone) => (
                  <div
                    key={milestone}
                    className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                    style={{ left: `${(milestone / demoPetition.goal) * 100}%` }}
                  />
                ))}
              </div>

              <div className="flex justify-between text-xs text-surface-400">
                <span>পরবর্তী লক্ষ্য: {nextMilestone.toLocaleString("bn-BD")}</span>
                <span>আর {(nextMilestone - currentCount).toLocaleString("bn-BD")} জন প্রয়োজন</span>
              </div>

              {/* Sign Button */}
              <button
                onClick={handleSign}
                disabled={hasSigned}
                className={`w-full mt-4 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${
                  hasSigned
                    ? "bg-positive-100 dark:bg-positive-900/30 text-positive-700 dark:text-positive-300 cursor-default"
                    : "bg-brand-500 text-white hover:bg-brand-600 shadow-glow hover:shadow-lg active:scale-[0.98]"
                }`}
                id="petition-sign-btn"
              >
                {hasSigned ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    স্বাক্ষর দেওয়া হয়েছে ✓
                  </span>
                ) : (
                  "✍️ স্বাক্ষর দিন"
                )}
              </button>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-3 font-bangla">
                আবেদনের বিবরণ
              </h2>
              <div className="text-surface-700 dark:text-surface-300 whitespace-pre-line leading-relaxed font-bangla">
                {demoPetition.description}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3">
                এই আবেদন শেয়ার করুন
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")}
                  className="btn-secondary !text-xs"
                  id="petition-share-fb"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg> Facebook
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(demoPetition.title + " " + window.location.href)}`, "_blank")}
                  className="btn-secondary !text-xs"
                  id="petition-share-wa"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(demoPetition.title)}&url=${encodeURIComponent(window.location.href)}`, "_blank")}
                  className="btn-secondary !text-xs"
                  id="petition-share-twitter"
                >
                  <Share2 className="w-4 h-4" /> Twitter/X
                </button>
                <button onClick={copyLink} className="btn-secondary !text-xs" id="petition-share-copy">
                  <Copy className="w-4 h-4" /> লিংক কপি
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Milestones */}
          <div className="glass-card p-5" id="petition-milestones">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-500" />
              মাইলফলক
            </h3>
            <div className="space-y-3">
              {demoPetition.milestones.map((milestone) => {
                const reached = currentCount >= milestone;
                return (
                  <div key={milestone} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        reached
                          ? "bg-positive-100 dark:bg-positive-900/30 text-positive-600 dark:text-positive-400"
                          : "bg-surface-100 dark:bg-surface-700 text-surface-400"
                      }`}
                    >
                      {reached ? "✓" : milestone >= 1000 ? "🎯" : "○"}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-sm font-medium ${
                          reached
                            ? "text-positive-600 dark:text-positive-400 line-through"
                            : "text-surface-700 dark:text-surface-300"
                        }`}
                      >
                        {milestone.toLocaleString("bn-BD")} স্বাক্ষর
                      </span>
                    </div>
                    {reached && (
                      <CheckCircle2 className="w-4 h-4 text-positive-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Signatories */}
          <div className="glass-card p-5" id="petition-signatories">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              সাম্প্রতিক স্বাক্ষরকারী
            </h3>
            <div className="space-y-3">
              {demoPetition.recentSignatories.map((signatory, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {signatory.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-700 dark:text-surface-300 truncate">
                      {signatory.name}
                    </p>
                    <p className="text-xs text-surface-400">{signatory.time}</p>
                  </div>
                  <span className="text-xs text-positive-500">✍️</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="glass-card p-5 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/10">
            <p className="text-sm text-surface-700 dark:text-surface-300 font-bangla leading-relaxed">
              প্রতিটি স্বাক্ষর গুরুত্বপূর্ণ। আপনার স্বাক্ষর সংশ্লিষ্ট কর্তৃপক্ষের কাছে পৌঁছে দেওয়া হবে।
              একসাথে আমরা পরিবর্তন আনতে পারি।
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
