"use client";

import React, { useState } from "react";
import { MessageSquare, RefreshCw, AlertTriangle, Shield, Check, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const MOCK_NOTIFICATIONS = [
  { id: "1", type: "comment", title: "আপনার পোস্টে নতুন মন্তব্য", body: "আহমেদ করিম আপনার 'ঢাকার ৯ বছরের শিশু নির্যাতন' পোস্টে মন্তব্য করেছেন।", date: "আজ", isRead: false, link: "/post/post-1" },
  { id: "2", type: "case_update", title: "মামলার অগ্রগতি আপডেট", body: "আপনার অনুসরণ করা 'রাজশাহীতে সড়ক নির্মাণে দুর্নীতি' কেসটি তদন্তাধীনে প্রবেশ করেছে।", date: "আজ", isRead: false, link: "/post/post-2" },
  { id: "3", type: "justice_reminder", title: "বিচারহীনতা রিমাইন্ডার", body: "আপনার পোস্ট 'সিলেটে সাংবাদিক হত্যা' মামলাটির ১২০ দিন অতিক্রম হয়েছে, কোনো অগ্রগতি হয়নি।", date: "গতকাল", isRead: true, link: "/post/post-4" },
  { id: "4", type: "petition_milestone", title: "আন্দোলনের মাইলফলক অর্জিত", body: "আপনার স্বাক্ষরিত 'হাসপাতালে ওষুধ কেলেঙ্কারির বিচার দাবি' আবেদনটি ৫০০ স্বাক্ষর অতিক্রম করেছে।", date: "গতকাল", isRead: true, link: "/petition/petition-1" },
  { id: "5", type: "district_alert", title: "আপনার জেলায় নতুন ঘটনা", body: "আপনার সেট করা অ্যালার্ট এলাকা ঢাকাতে একটি নতুন ঘটনা নথিভুক্ত করা হয়েছে।", date: "এই সপ্তাহে", isRead: true, link: "/post/post-10" },
  { id: "6", type: "system", title: "প্রোফাইল ভেরিফিকেশন সফল", body: "অভিনন্দন! আপনার সাংবাদিক প্রোফাইল সফলভাবে যাচাই করা হয়েছে।", date: "এই সপ্তাহে", isRead: true, link: "/profile/user-1" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast.success("সব বিজ্ঞপ্তি পঠিত হিসেবে চিহ্নিত করা হয়েছে");
  };

  const markSingleRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="w-4 h-4 text-brand-500" />;
      case "case_update":
        return <RefreshCw className="w-4 h-4 text-positive-500 animate-spin" style={{ animationDuration: "3s" }} />;
      case "justice_reminder":
        return <AlertTriangle className="w-4 h-4 text-critical-500" />;
      case "petition_milestone":
        return <Calendar className="w-4 h-4 text-neutral_accent-500" />;
      default:
        return <Shield className="w-4 h-4 text-surface-500" />;
    }
  };

  const groups = ["আজ", "গতকাল", "এই সপ্তাহে"];

  return (
    <div className="page-container page-section max-w-2xl mx-auto space-y-6 animate-fade-in" id="notifications-page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 font-bangla">বিজ্ঞপ্তি সমূহ</h1>
          <p className="text-sm text-surface-500">আপনার জন্য সর্বশেষ আপডেট</p>
        </div>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-lg border border-brand-200 dark:border-brand-900/30 font-bangla"
            id="notifications-mark-read"
          >
            <Check className="w-4 h-4" /> সব পঠিত করুন
          </button>
        )}
      </div>

      {/* Notifications List Grouped */}
      <div className="space-y-6">
        {groups.map((group) => {
          const items = notifications.filter((n) => n.date === group);
          if (items.length === 0) return null;

          return (
            <div key={group} className="space-y-2">
              <h2 className="text-xs font-bold text-surface-400 uppercase tracking-wider font-bangla ml-1">{group}</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markSingleRead(item.id)}
                    className={`card p-4 transition-all duration-200 cursor-pointer ${
                      !item.isRead
                        ? "bg-brand-50/20 dark:bg-brand-950/10 border-l-4 border-l-brand-500 shadow-sm"
                        : "hover:bg-surface-50 dark:hover:bg-surface-800/10"
                    }`}
                    id={`noti-item-${item.id}`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center shrink-0">
                        {getIcon(item.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className={`text-sm font-bold font-bangla ${!item.isRead ? "text-surface-900 dark:text-surface-100" : "text-surface-700 dark:text-surface-400"}`}>
                            {item.title}
                          </h3>
                          {!item.isRead && (
                            <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-surface-500 dark:text-surface-400 font-bangla leading-relaxed">
                          {item.body}
                        </p>
                        <div className="pt-2 flex items-center justify-between">
                          <Link
                            href={item.link}
                            className="text-[10px] text-brand-500 hover:text-brand-600 font-bold flex items-center gap-0.5 font-bangla"
                          >
                            বিস্তারিত দেখুন <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
