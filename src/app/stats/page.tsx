"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { AlertTriangle, CheckCircle2, TrendingUp, Users, Calendar, MapPin } from "lucide-react";

// Demo stats data
const STATS_CARDS = [
  { id: "1", title: "মোট নথিভুক্ত ঘটনা", value: "১,২৪৭", icon: Users, color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
  { id: "2", title: "অমীমাংসিত ঘটনা (বিচারহীন)", value: "৮৩৪", icon: AlertTriangle, color: "text-critical-500 bg-critical-50 dark:bg-critical-900/20" },
  { id: "3", title: "সমাধানকৃত ঘটনা", value: "৪১৩", icon: CheckCircle2, color: "text-positive-500 bg-positive-50 dark:bg-positive-900/20" },
  { id: "4", title: "চলমান দাবি ও আন্দোলন", value: "৫৬", icon: TrendingUp, color: "text-neutral_accent-500 bg-neutral_accent-50 dark:bg-neutral_accent-900/20" },
];

const SEVERITY_DATA = [
  { name: "গুরুতর (Critical)", value: 432, color: "#ef4444" },
  { name: "উচ্চ (High)", value: 389, color: "#f97316" },
  { name: "মাঝারি (Medium)", value: 213, color: "#eab308" },
  { name: "ইতিবাচক (Positive)", value: 128, color: "#22c55e" },
  { name: "সাধারণ (Neutral)", value: 85, color: "#6b7280" },
];

const MONTHLY_TREND = [
  { name: "জানুয়ারী", cases: 65, resolved: 20 },
  { name: "ফেব্রুয়ারী", cases: 78, resolved: 28 },
  { name: "মার্চ", cases: 89, resolved: 32 },
  { name: "এপ্রিল", cases: 110, resolved: 41 },
  { name: "মে", cases: 125, resolved: 45 },
  { name: "জুন", cases: 140, resolved: 50 },
  { name: "জুলাই", cases: 155, resolved: 52 },
  { name: "আগস্ট", cases: 160, resolved: 55 },
  { name: "সেপ্টেম্বর", cases: 135, resolved: 58 },
  { name: "অক্টোবর", cases: 115, resolved: 60 },
  { name: "নভেম্বর", cases: 98, resolved: 57 },
  { name: "ডিসেম্বর", cases: 85, resolved: 65 },
];

const TOP_DISTRICTS = [
  { name: "ঢাকা", cases: 423 },
  { name: "চট্টগ্রাম", cases: 189 },
  { name: "রাজশাহী", cases: 94 },
  { name: "সিলেট", cases: 87 },
  { name: "খুলনা", cases: 78 },
];

const UNRESOLVED_LEADERBOARD = [
  { title: "নারায়ণগঞ্জে নিট পোশাক কারখানায় আগুন ও হত্যাযজ্ঞ", days: 1450, category: "হত্যাকাণ্ড", district: "নারায়ণগঞ্জ" },
  { title: "ঢাকার কুর্মিটোলায় সড়ক দুর্ঘটনায় স্কুল ছাত্র নিহতের বিচার", days: 1120, category: "বিচারহীনতা", district: "ঢাকা" },
  { title: "সিলেটে স্থানীয় সাংবাদিককে হত্যা ও হুমকি প্রদান", days: 890, category: "হত্যাকাণ্ড", district: "সিলেট" },
  { title: "কুমিল্লায় শিশু শ্রমিকের ওপর পৈশাচিক নির্যাতন", days: 760, category: "শিশু নির্যাতন", district: "কুমিল্লা" },
  { title: "চট্টগ্রামে আদিবাসী কিশোরী ধর্ষণ ও হত্যা মামলা", days: 680, category: "যৌন সহিংসতা", district: "চট্টগ্রাম" },
];

export default function StatsPage() {
  return (
    <div className="page-container page-section space-y-8 animate-fade-in" id="stats-dashboard-container">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-bangla">পরিসংখ্যান ও বিশ্লেষণ</h1>
        <p className="text-sm text-surface-500 font-bangla">সারাদেশের অপরাধ, বিচারহীনতা ও ন্যায়বিচারের তুলনামূলক চিত্র।</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="card p-5 flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl ${card.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{card.value}</p>
                <p className="text-xs text-surface-500 font-bangla">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="card p-5" id="stats-monthly-trend">
          <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-500" /> মাসিক ঘটনার ট্রেন্ড (শেষ ১২ মাস)
          </h3>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fill: "#64748b" }} />
                <YAxis tick={{ fill: "#64748b" }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }} />
                <Legend />
                <Line type="monotone" dataKey="cases" name="নতুন ঘটনা" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="resolved" name="নিষ্পত্তিকৃত" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Districts Bar Chart */}
        <div className="card p-5" id="stats-top-districts">
          <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-500" /> সর্বোচ্চ ঘটনা প্রবণ শীর্ষ ৫ জেলা
          </h3>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_DISTRICTS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                <XAxis dataKey="name" tick={{ fill: "#64748b" }} />
                <YAxis tick={{ fill: "#64748b" }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }} />
                <Bar dataKey="cases" name="ঘটনা সংখ্যা" fill="#f97316" radius={[6, 6, 0, 0]}>
                  {TOP_DISTRICTS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ef4444" : "#f97316"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Pie Chart */}
        <div className="card p-5" id="stats-severity-breakdown">
          <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla">
            ⚠️ তীব্রতা অনুযায়ী মামলার বণ্টন
          </h3>
          <div className="h-80 w-full text-xs flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SEVERITY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {SEVERITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-2 font-bangla">
              {SEVERITY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs border-b border-surface-100 dark:border-surface-800 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-surface-700 dark:text-surface-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-surface-900 dark:text-surface-100">{item.value} টি</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unresolved Cases Leaderboard */}
        <div className="card p-5 overflow-hidden" id="stats-leaderboard">
          <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 font-bangla flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-critical-500" /> দীর্ঘতম অমীমাংসিত মামলার তালিকা
          </h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-850 border-b border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-400 font-semibold font-bangla">
                  <th className="text-left px-3 py-2">মামলার বিবরণ</th>
                  <th className="text-left px-3 py-2">জেলা</th>
                  <th className="text-right px-3 py-2">বিচারহীন দিন</th>
                </tr>
              </thead>
              <tbody>
                {UNRESOLVED_LEADERBOARD.map((item, idx) => (
                  <tr key={idx} className="border-b border-surface-100 dark:border-surface-800 last:border-0 hover:bg-surface-50 dark:hover:bg-surface-800/20 transition-colors">
                    <td className="px-3 py-3">
                      <p className="font-semibold text-surface-900 dark:text-surface-100 font-bangla line-clamp-1">{item.title}</p>
                      <span className="text-[10px] text-surface-400 font-bangla">{item.category}</span>
                    </td>
                    <td className="px-3 py-3 text-surface-500 font-bangla">{item.district}</td>
                    <td className="px-3 py-3 text-right font-bold text-critical-500">{item.days} দিন</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
