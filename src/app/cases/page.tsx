"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Grid3X3, List, MapPin } from "lucide-react";

const CASES = [
  { id: "1", title: "ঢাকায় ৯ বছরের শিশুকে নির্যাতন", category: "শিশু নির্যাতন", severity: "critical", district: "ঢাকা", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 45, lastUpdate: "৩ দিন আগে" },
  { id: "2", title: "রাজশাহীতে সড়ক নির্মাণে দুর্নীতি", category: "দুর্নীতি", severity: "high", district: "রাজশাহী", status: "no_action", statusEmoji: "🔴", statusLabel: "ব্যবস্থা হয়নি", daysOpen: 89, lastUpdate: "৫ দিন আগে" },
  { id: "3", title: "চট্টগ্রামে কৃষককে হত্যা", category: "হত্যাকাণ্ড", severity: "critical", district: "চট্টগ্রাম", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 34, lastUpdate: "১ সপ্তাহ আগে" },
  { id: "4", title: "সিলেটে সাংবাদিক হত্যা", category: "হত্যাকাণ্ড", severity: "critical", district: "সিলেট", status: "no_action", statusEmoji: "🔴", statusLabel: "ব্যবস্থা হয়নি", daysOpen: 120, lastUpdate: "২ সপ্তাহ আগে" },
  { id: "5", title: "রংপুরে ধর্ষণ মামলায় সর্বোচ্চ সাজা", category: "সফলতার গল্প", severity: "positive", district: "রংপুর", status: "resolved", statusEmoji: "🟢", statusLabel: "সমাধানকৃত", daysOpen: 0, lastUpdate: "১ দিন আগে" },
  { id: "6", title: "খুলনায় যৌতুকের দায়ে নববধূ হত্যা", category: "পারিবারিক সহিংসতা", severity: "high", district: "খুলনা", status: "in_court", statusEmoji: "🟠", statusLabel: "বিচারাধীন", daysOpen: 67, lastUpdate: "৪ দিন আগে" },
  { id: "7", title: "কুমিল্লায় হাসপাতালে ওষুধ কেলেঙ্কারি", category: "দুর্নীতি", severity: "high", district: "কুমিল্লা", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 56, lastUpdate: "৬ দিন আগে" },
  { id: "8", title: "বরিশালে ত্রাণ আত্মসাৎ", category: "দুর্নীতি", severity: "high", district: "বরিশাল", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 23, lastUpdate: "২ দিন আগে" },
  { id: "9", title: "গাজীপুরে শিশু পাচারচক্র উচ্ছেদ", category: "সফলতার গল্প", severity: "positive", district: "গাজীপুর", status: "resolved", statusEmoji: "🟢", statusLabel: "সমাধানকৃত", daysOpen: 0, lastUpdate: "১ সপ্তাহ আগে" },
  { id: "10", title: "নারায়ণগঞ্জে শিশুশ্রম: কারখানায় শিশু আহত", category: "শিশু নির্যাতন", severity: "critical", district: "নারায়ণগঞ্জ", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 78, lastUpdate: "৩ দিন আগে" },
  { id: "11", title: "বগুড়ায় সড়ক নির্মাণে অনিয়ম", category: "দুর্নীতি", severity: "high", district: "বগুড়া", status: "no_action", statusEmoji: "🔴", statusLabel: "ব্যবস্থা হয়নি", daysOpen: 145, lastUpdate: "১ মাস আগে" },
  { id: "12", title: "সিরাজগঞ্জে মাদ্রাসায় শিশু নির্যাতন", category: "শিশু নির্যাতন", severity: "critical", district: "সিরাজগঞ্জ", status: "no_action", statusEmoji: "🔴", statusLabel: "ব্যবস্থা হয়নি", daysOpen: 200, lastUpdate: "২ মাস আগে" },
  { id: "13", title: "ময়মনসিংহে দুর্নীতিবাজ কর্মকর্তার বিরুদ্ধে প্রতিরোধ সফল", category: "সফলতার গল্প", severity: "positive", district: "ময়মনসিংহ", status: "resolved", statusEmoji: "🟢", statusLabel: "সমাধানকৃত", daysOpen: 0, lastUpdate: "২ সপ্তাহ আগে" },
  { id: "14", title: "যশোরে শিশু পাচার চক্র উচ্ছেদে সাফল্য", category: "সফলতার গল্প", severity: "positive", district: "যশোর", status: "resolved", statusEmoji: "🟢", statusLabel: "সমাধানকৃত", daysOpen: 0, lastUpdate: "১ মাস আগে" },
  { id: "15", title: "পাবনায় স্কুল শিক্ষকের বিরুদ্ধে যৌন হয়রানির অভিযোগ", category: "শিক্ষা প্রতিষ্ঠানে নির্যাতন", severity: "medium", district: "পাবনা", status: "investigating", statusEmoji: "🟡", statusLabel: "তদন্তাধীন", daysOpen: 30, lastUpdate: "৫ দিন আগে" },
];

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filtered = CASES.filter((c) => {
    if (searchQuery && !c.title.includes(searchQuery) && !c.district.includes(searchQuery)) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  });

  const badgeFor = (s: string) => s === "critical" ? "badge-critical" : s === "high" ? "badge-high" : s === "medium" ? "badge-medium" : s === "positive" ? "badge-positive" : "badge-default";

  return (
    <div className="page-container page-section animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-bangla">কেস ট্র্যাকার</h1>
          <p className="text-sm text-surface-500">মোট {CASES.length} টি নথিভুক্ত ঘটনা</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("table")} className={`btn-icon ${viewMode === "table" ? "bg-brand-50 dark:bg-brand-900/30 text-brand-500" : ""}`} id="cases-view-table" aria-label="Table view"><List className="w-5 h-5" /></button>
          <button onClick={() => setViewMode("grid")} className={`btn-icon ${viewMode === "grid" ? "bg-brand-50 dark:bg-brand-900/30 text-brand-500" : ""}`} id="cases-view-grid" aria-label="Grid view"><Grid3X3 className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3" id="cases-filters">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ঘটনা বা জেলা খুঁজুন..." className="input pl-10" id="cases-search" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input !w-auto min-w-[160px]" id="cases-status-filter">
          <option value="">সকল অবস্থা</option>
          <option value="no_action">🔴 ব্যবস্থা হয়নি</option>
          <option value="investigating">🟡 তদন্তাধীন</option>
          <option value="in_court">🟠 বিচারাধীন</option>
          <option value="resolved">🟢 সমাধানকৃত</option>
          <option value="abandoned">⚫ পরিত্যক্ত</option>
        </select>
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" id="cases-table">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                  <th className="text-left px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla">শিরোনাম</th>
                  <th className="text-left px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla hidden sm:table-cell">বিভাগ</th>
                  <th className="text-left px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla hidden md:table-cell">জেলা</th>
                  <th className="text-left px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla">অবস্থা</th>
                  <th className="text-right px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla hidden lg:table-cell">দিন</th>
                  <th className="text-right px-4 py-3 font-semibold text-surface-600 dark:text-surface-400 font-bangla hidden lg:table-cell">আপডেট</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-surface-100 dark:border-surface-700/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors cursor-pointer" onClick={() => window.location.href = `/post/post-${c.id}`}>
                    <td className="px-4 py-3">
                      <Link href={`/post/post-${c.id}`} className="font-medium text-surface-900 dark:text-surface-100 hover:text-brand-500 font-bangla line-clamp-1">{c.title}</Link>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className={badgeFor(c.severity)}>{c.category}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="text-surface-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{c.district}</span></td>
                    <td className="px-4 py-3"><span className="text-xs whitespace-nowrap">{c.statusEmoji} {c.statusLabel}</span></td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">{c.daysOpen > 0 ? <span className={c.daysOpen > 30 ? "text-critical-500 font-bold" : "text-surface-500"}>{c.daysOpen}</span> : <span className="text-positive-500">✓</span>}</td>
                    <td className="px-4 py-3 text-right text-xs text-surface-400 hidden lg:table-cell">{c.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (<div className="p-12 text-center text-surface-400 font-bangla">কোনো ঘটনা পাওয়া যায়নি</div>)}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Link key={c.id} href={`/post/post-${c.id}`} className={`card-interactive p-4 ${c.severity === "critical" ? "severity-critical" : c.severity === "high" ? "severity-high" : c.severity === "positive" ? "severity-positive" : "severity-neutral"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={badgeFor(c.severity)}>{c.category}</span>
                <span className="text-xs text-surface-400">{c.statusEmoji}</span>
              </div>
              <h3 className="font-bold text-surface-900 dark:text-surface-100 font-bangla text-sm line-clamp-2 mb-2">{c.title}</h3>
              <div className="flex items-center justify-between text-xs text-surface-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.district}</span>
                {c.daysOpen > 0 && <span className={c.daysOpen > 30 ? "text-critical-500 font-bold" : ""}>{c.daysOpen} দিন</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
