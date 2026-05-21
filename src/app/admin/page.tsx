"use client";

import React, { useState } from "react";
import { Shield, Users, AlertTriangle, FileText, Check, X, ShieldCheck, Search } from "lucide-react";
import { toast } from "sonner";

// Mock Admin Data
const MOCK_STATS = [
  { label: "পর্যালোচনার অপেক্ষা", value: "১২", icon: FileText, color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
  { label: "রিপোর্টকৃত পোস্ট", value: "৫", icon: AlertTriangle, color: "text-critical-500 bg-critical-50 dark:bg-critical-900/20" },
  { label: "যাচাইকৃত ব্যবহারকারী", value: "৮৪", icon: ShieldCheck, color: "text-positive-500 bg-positive-50 dark:bg-positive-900/20" },
  { label: "মোট ব্যবহারকারী", value: "৩,৪১২", icon: Users, color: "text-neutral_accent-500 bg-neutral_accent-50 dark:bg-neutral_accent-900/20" },
];

const MOCK_MODERATION_ITEMS = [
  { id: "mod-1", title: "যশোরে সীমান্ত এলাকায় চোরাচালান ও দুর্নীতির অভিযোগ", author: "রফিক ইসলাম", date: "৩ ঘণ্টা আগে", reason: "নতুন পোস্ট যাচাইকরণ", body: "সীমান্তবর্তী ইউনিয়ন চেয়ারম্যানের প্রত্যক্ষ মদদে চোরাচালানের সিন্ডিকেট গড়ে উঠেছে বলে অভিযোগ করেছেন স্থানীয় বাসিন্দারা।" },
  { id: "mod-2", title: "গাজীপুরে পরিবেশ দূষণকারী কারখানার লাইসেন্স বাতিলের দাবি", author: "বেনামী সাক্ষী", date: "৫ ঘণ্টা আগে", reason: "নতুন পোস্ট যাচাইকরণ", body: "কালিয়াকৈর উপজেলার একটি ওয়াশিং প্ল্যান্টের রাসায়নিক বর্জ্য সরাসরি বিলে ফেলার কারণে বিপুল পরিমাণ ফসলি জমি নষ্ট হচ্ছে।" },
];

const MOCK_FLAGGED_ITEMS = [
  { id: "flag-1", title: "বরিশালে চেয়ারম্যানের বিরুদ্ধে চাল চুরির মিথ্যা অপবাদ", author: "মিজানুর রহমান", date: "১ দিন আগে", reports: 3, body: "চেয়ারম্যান কোনো অনিয়ম করেননি। সম্পূর্ণ রাজনৈতিক প্রতিহিংসাবশত এই পোস্ট দেওয়া হয়েছে। এর কোনো নির্ভরযোগ্য উৎস নেই।" },
];

const MOCK_USER_ROLES = [
  { id: "usr-1", name: "রহিমা আক্তার", email: "rahima@press.com", role: "user", requestVerification: true },
  { id: "usr-2", name: "শফিক আহমেদ", email: "shafiq@mail.com", role: "moderator", requestVerification: false },
  { id: "usr-3", name: "কামাল হোসেন", email: "kamal@justice.org", role: "user", requestVerification: true },
];

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<"moderation" | "flagged" | "users">("moderation");
  const [moderationList, setModerationList] = useState(MOCK_MODERATION_ITEMS);
  const [flaggedList, setFlaggedList] = useState(MOCK_FLAGGED_ITEMS);
  const [userList, setUserList] = useState(MOCK_USER_ROLES);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: string) => {
    setModerationList(moderationList.filter((item) => item.id !== id));
    toast.success("পোস্টটি সফলভাবে অনুমোদিত হয়েছে");
  };

  const handleReject = (id: string, type: "mod" | "flag") => {
    if (type === "mod") {
      setModerationList(moderationList.filter((item) => item.id !== id));
      toast.error("পোস্টটি বাতিল করা হয়েছে");
    } else {
      setFlaggedList(flaggedList.filter((item) => item.id !== id));
      toast.error("পোস্টটি প্ল্যাটফর্ম থেকে মুছে ফেলা হয়েছে");
    }
  };

  const handleDismissFlag = (id: string) => {
    setFlaggedList(flaggedList.filter((item) => item.id !== id));
    toast.success("রিপোর্টটি নাকচ করা হয়েছে");
  };

  const handleVerifyUser = (id: string) => {
    setUserList(userList.map((u) => (u.id === id ? { ...u, role: "verified", requestVerification: false } : u)));
    toast.success("ব্যবহারকারীকে সফলভাবে যাচাই করা হয়েছে");
  };

  return (
    <div className="page-container page-section space-y-6 animate-fade-in" id="admin-panel-container">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-surface-200 dark:border-surface-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-critical-500/10 dark:bg-critical-500/20 text-critical-500 flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-bangla">অ্যাডমিন প্যানেল</h1>
          <p className="text-xs text-critical-500 font-bangla flex items-center gap-1">
            ⚠️ সংবেদনশীল এলাকা: এই প্যানেল শুধুমাত্র অনুমোদিত পরিচালকদের জন্য।
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-surface-900 dark:text-surface-100">{stat.value}</p>
                <p className="text-[10px] text-surface-500 font-bangla">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-surface-200 dark:border-surface-800 flex" id="admin-tabs">
        <button
          onClick={() => setActiveTab("moderation")}
          className={`px-5 py-3 text-xs font-bold font-bangla border-b-2 transition-colors ${
            activeTab === "moderation"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="admin-tab-moderation"
        >
          পোস্ট অনুমোদন ({moderationList.length})
        </button>
        <button
          onClick={() => setActiveTab("flagged")}
          className={`px-5 py-3 text-xs font-bold font-bangla border-b-2 transition-colors ${
            activeTab === "flagged"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="admin-tab-flagged"
        >
          রিপোর্টকৃত পোস্ট ({flaggedList.length})
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-5 py-3 text-xs font-bold font-bangla border-b-2 transition-colors ${
            activeTab === "users"
              ? "border-brand-500 text-brand-600 dark:text-brand-400"
              : "border-transparent text-surface-500 hover:text-surface-700"
          }`}
          id="admin-tab-users"
        >
          ব্যবহারকারী ও ভেরিফিকেশন ({userList.filter(u => u.requestVerification).length})
        </button>
      </div>

      {/* Search Input for Lists */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="অনুসন্ধান করুন..."
          className="input pl-10"
          id="admin-list-search"
        />
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {/* Moderation Pending */}
        {activeTab === "moderation" && (
          <div className="space-y-4" id="admin-mod-list">
            {moderationList
              .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="card p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-surface-900 dark:text-surface-100 font-bangla">{item.title}</h3>
                      <p className="text-[10px] text-surface-500 font-bangla">লেখক: {item.author} · {item.date}</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-md font-bangla">
                      {item.reason}
                    </span>
                  </div>
                  <p className="text-xs text-surface-650 dark:text-surface-400 font-bangla leading-relaxed">
                    {item.body}
                  </p>
                  <div className="flex justify-end gap-2 pt-2 border-t border-surface-100 dark:border-surface-850">
                    <button
                      onClick={() => handleReject(item.id, "mod")}
                      className="btn-secondary text-critical-500 hover:bg-critical-50 dark:hover:bg-critical-900/20 border-critical-200 !text-[11px] !py-1.5"
                    >
                      <X className="w-3.5 h-3.5" /> বাতিল করুন
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="btn-primary !text-[11px] !py-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> অনুমোদন করুন
                    </button>
                  </div>
                </div>
              ))}
            {moderationList.length === 0 && (
              <div className="p-12 text-center text-surface-400 font-bangla">অনুমোদনের অপেক্ষায় কোনো পোস্ট নেই</div>
            )}
          </div>
        )}

        {/* Flagged/Reported Posts */}
        {activeTab === "flagged" && (
          <div className="space-y-4" id="admin-flag-list">
            {flaggedList
              .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="card p-5 border-l-4 border-l-critical-500 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-surface-900 dark:text-surface-100 font-bangla">{item.title}</h3>
                      <p className="text-[10px] text-surface-500 font-bangla">প্রকাশক: {item.author} · {item.date}</p>
                    </div>
                    <span className="text-[10px] font-bold text-critical-600 bg-critical-50 dark:bg-critical-900/30 px-2.5 py-1 rounded-md font-bangla flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> {item.reports} বার রিপোর্টেড
                    </span>
                  </div>
                  <p className="text-xs text-surface-650 dark:text-surface-400 font-bangla leading-relaxed">
                    {item.body}
                  </p>
                  <div className="flex justify-end gap-2 pt-2 border-t border-surface-100 dark:border-surface-850">
                    <button
                      onClick={() => handleDismissFlag(item.id)}
                      className="btn-secondary !text-[11px] !py-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> রিপোর্ট নাকচ করুন
                    </button>
                    <button
                      onClick={() => handleReject(item.id, "flag")}
                      className="btn-primary bg-critical-500 hover:bg-critical-600 text-white !text-[11px] !py-1.5 shadow-none"
                    >
                      <X className="w-3.5 h-3.5" /> পোস্ট মুছে ফেলুন
                    </button>
                  </div>
                </div>
              ))}
            {flaggedList.length === 0 && (
              <div className="p-12 text-center text-surface-400 font-bangla">রিপোর্টকৃত কোনো পোস্ট নেই</div>
            )}
          </div>
        )}

        {/* User Role Verification */}
        {activeTab === "users" && (
          <div className="card overflow-hidden" id="admin-user-list">
            <div className="overflow-x-auto text-xs">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-850 border-b border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-400 font-semibold font-bangla">
                    <th className="text-left px-4 py-3">ব্যবহারকারী</th>
                    <th className="text-left px-4 py-3">ইমেইল</th>
                    <th className="text-left px-4 py-3">বর্তমান রোল</th>
                    <th className="text-right px-4 py-3">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {userList
                    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((user) => (
                      <tr key={user.id} className="border-b border-surface-100 dark:border-surface-800 last:border-0 hover:bg-surface-50 dark:hover:bg-surface-800/20">
                        <td className="px-4 py-3 font-semibold text-surface-900 dark:text-surface-100 font-bangla">{user.name}</td>
                        <td className="px-4 py-3 text-surface-500">{user.email}</td>
                        <td className="px-4 py-3 text-surface-600 uppercase font-mono">{user.role}</td>
                        <td className="px-4 py-3 text-right">
                          {user.requestVerification ? (
                            <button
                              onClick={() => handleVerifyUser(user.id)}
                              className="btn-primary !text-[10px] !py-1.5 !px-3 font-bangla"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাই করুন
                            </button>
                          ) : (
                            <span className="text-xs text-surface-400 font-bangla">কোনো দাবি নেই</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
