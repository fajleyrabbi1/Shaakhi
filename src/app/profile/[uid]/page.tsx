"use client";

import React, { useState } from "react";
import { Award, Calendar, MapPin, ShieldCheck, Edit3 } from "lucide-react";
import Link from "next/link";

const MOCK_PROFILE = {
  uid: "user-1",
  displayName: "রহিমা আক্তার",
  bio: "অনুসন্ধানী সাংবাদিক ও মানবাধিকার কর্মী। নারীবাদী এবং শিশু অধিকার রক্ষার আন্দোলনে সোচ্চার।",
  location: "ঢাকা, বাংলাদেশ",
  joinedAt: "মে ২০২৪",
  role: "verified",
  roleLabel: "যাচাইকৃত সাংবাদিক",
  badges: ["সত্যানুসন্ধানী", "সহযোদ্ধা", "শীর্ষ অবদানকারী"],
  postsCount: 12,
  commentsCount: 45,
  petitionsSigned: 8,
  posts: [
    { id: "post-1", title: "ঢাকায় গৃহকর্মে নিয়োজিত ৯ বছরের শিশুকে নির্যাতনের অভিযোগ", category: "শিশু নির্যাতন", date: "৩ দিন আগে", severity: "critical", status: "🟡 তদন্তাধীন" },
    { id: "post-3", title: "চট্টগ্রামে জমি বিরোধে কৃষককে হত্যা", category: "হত্যাকাণ্ড", date: "১ সপ্তাহ আগে", severity: "critical", status: "🟡 তদন্তাধীন" },
    { id: "post-7", title: "কুমিল্লায় সরকারি হাসপাতালে ওষুধ কেলেঙ্কারি: কোটি টাকার দুর্নীতির অভিযোগ", category: "দুর্নীতি", date: "৬ দিন আগে", severity: "high", status: "🟡 তদন্তাধীন" },
  ],
  comments: [
    { id: "c1", postTitle: "সিলেটে সাংবাদিককে গুলি করে হত্যা", body: "এই ধরনের অপরাধের বিচার অতি দ্রুত হওয়া উচিত। সাংবাদিকদের নিরাপত্তা নিশ্চিত করা জরুরি।", date: "২ দিন আগে" },
    { id: "c2", postTitle: "রাজশাহীতে সড়ক নির্মাণে দুর্নীতি", body: "নিম্নমানের কাজের পেছনে কার ভূমিকা তা খতিয়ে দেখতে হবে। ঠিকাদারের লাইসেন্স বাতিল করা উচিত।", date: "৪ দিন আগে" },
  ],
  petitions: [
    { id: "pet-1", title: "কুমিল্লায় সরকারি হাসপাতালে ওষুধ কেলেঙ্কারির বিচার দাবি", goal: 1000, current: 647 },
    { id: "pet-2", title: "মাদ্রাসায় শিশুদের শারীরিক ও মানসিক শাস্তি নিষিদ্ধ করার দাবি", goal: 5000, current: 4320 },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "comments" | "petitions">("posts");
  const profile = MOCK_PROFILE;

  return (
    <div className="page-container page-section space-y-6 animate-fade-in" id="profile-page-container">
      {/* Profile Header */}
      <div className="card p-6 md:p-8 relative overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
            {profile.displayName.charAt(0)}
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-bangla">{profile.displayName}</h1>
              {profile.role === "verified" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-positive-50 dark:bg-positive-950/30 text-positive-600 dark:text-positive-400 px-2.5 py-1 rounded-full border border-positive-200 dark:border-positive-900/30 font-bangla self-center">
                  <ShieldCheck className="w-3.5 h-3.5" /> {profile.roleLabel}
                </span>
              )}
            </div>

            <p className="text-sm text-surface-700 dark:text-surface-300 font-bangla max-w-xl">{profile.bio}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-surface-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-surface-400" /> {profile.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-surface-400" /> যোগদান: {profile.joinedAt}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              {profile.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 px-2.5 py-1 rounded-lg font-bangla">
                  <Award className="w-3.5 h-3.5 text-warning-500" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="btn-secondary !text-xs shrink-0 self-center md:self-start" id="profile-edit-btn">
            <Edit3 className="w-3.5 h-3.5" /> প্রোফাইল এডিট
          </button>
        </div>
      </div>

      {/* Profile Counts Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <span className="block text-2xl font-bold text-surface-900 dark:text-surface-100">{profile.postsCount}</span>
          <span className="text-xs text-surface-500 font-bangla">প্রকাশিত ঘটনা</span>
        </div>
        <div className="card p-4 text-center">
          <span className="block text-2xl font-bold text-surface-900 dark:text-surface-100">{profile.commentsCount}</span>
          <span className="text-xs text-surface-500 font-bangla">মন্তব্য সমূহ</span>
        </div>
        <div className="card p-4 text-center">
          <span className="block text-2xl font-bold text-surface-900 dark:text-surface-100">{profile.petitionsSigned}</span>
          <span className="text-xs text-surface-500 font-bangla">আবেদনে স্বাক্ষর</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-surface-200 dark:border-surface-800 flex" id="profile-tabs">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-5 py-3 text-sm font-semibold font-bangla border-b-2 transition-colors ${
            activeTab === "posts"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="profile-tab-posts"
        >
          পোস্টসমূহ ({profile.posts.length})
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-5 py-3 text-sm font-semibold font-bangla border-b-2 transition-colors ${
            activeTab === "comments"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="profile-tab-comments"
        >
          মন্তব্যসমূহ ({profile.comments.length})
        </button>
        <button
          onClick={() => setActiveTab("petitions")}
          className={`px-5 py-3 text-sm font-semibold font-bangla border-b-2 transition-colors ${
            activeTab === "petitions"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="profile-tab-petitions"
        >
          স্বাক্ষরিত আবেদন ({profile.petitions.length})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {activeTab === "posts" && (
          <div className="space-y-3" id="profile-posts-list">
            {profile.posts.map((p) => {
              const border = p.severity === "critical" ? "border-l-critical-500" : "border-l-high-500";
              return (
                <div key={p.id} className={`card p-4 border-l-4 ${border} hover:bg-surface-50 dark:hover:bg-surface-800/10 transition-colors`}>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-[10px] uppercase font-bold text-surface-500 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-md font-bangla">{p.category}</span>
                    <span className="text-xs font-semibold font-bangla text-surface-600 dark:text-surface-400">{p.status}</span>
                  </div>
                  <Link href={`/post/${p.id}`} className="font-bold text-surface-900 dark:text-surface-100 hover:text-brand-500 font-bangla text-sm block mb-1">
                    {p.title}
                  </Link>
                  <span className="text-[10px] text-surface-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="space-y-3" id="profile-comments-list">
            {profile.comments.map((c) => (
              <div key={c.id} className="card p-4 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-surface-400 font-bangla">
                  <span>পোস্ট: <span className="font-semibold text-surface-600 dark:text-surface-300">{c.postTitle}</span></span>
                  <span>{c.date}</span>
                </div>
                <p className="text-xs text-surface-700 dark:text-surface-300 font-bangla">{c.body}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "petitions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="profile-petitions-list">
            {profile.petitions.map((pet) => {
              const progress = (pet.current / pet.goal) * 100;
              return (
                <div key={pet.id} className="card p-4 space-y-3">
                  <h4 className="font-bold text-surface-900 dark:text-surface-100 text-xs font-bangla line-clamp-2">{pet.title}</h4>
                  <div className="relative h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-brand-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-surface-500">
                    <span>{pet.current} / {pet.goal} স্বাক্ষর</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Link href={`/petition/${pet.id}`} className="btn-secondary w-full !py-1.5 !text-xs">আবেদন বিবরণ দেখুন</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
