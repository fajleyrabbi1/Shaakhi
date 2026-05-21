"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }
    setIsLoading(true);
    // Simulate Login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("লগইন সফল হয়েছে!", { description: "সাক্ষী প্ল্যাটফর্মে স্বাগতম।" });
      window.location.href = "/home";
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast.info("গুগল লগইন শীঘ্রই আসছে...");
  };

  const handleAnonymousBrowse = () => {
    toast.success("বেনামী পাঠক হিসেবে প্রবেশ করছেন...");
    window.location.href = "/home";
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-950 dark:to-surface-900 animate-fade-in" id="login-page-container">
      <div className="w-full max-w-md card overflow-hidden shadow-2xl relative">
        {/* Top Decorative Border */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-critical-500 via-brand-500 to-positive-500" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-surface-900 dark:text-surface-100 font-bangla tracking-wide">সাক্ষী (Sakkhi)</h1>
            <p className="text-xs text-surface-500 font-bangla">বাংলাদেশ সোশ্যাল জাস্টিস ও অ্যাওয়ারনেস প্ল্যাটফর্ম</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5 font-bangla">ইমেইল ঠিকানা</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-450 dark:text-surface-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input pl-10"
                  id="login-email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5 font-bangla">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-450 dark:text-surface-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input px-10"
                  id="login-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-450 dark:text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Pass & Stay logged in mock grid */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-surface-300 text-brand-500 focus:ring-brand-500" />
                <span className="text-surface-650 dark:text-surface-400 font-bangla">লগইন রাখুন</span>
              </label>
              <a href="#" className="text-brand-500 hover:underline font-bangla">পাসওয়ার্ড ভুলে গেছেন?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-bold text-sm font-bangla"
              id="login-submit"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  প্রবেশ করা হচ্ছে...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> প্রবেশ করুন
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-surface-200 dark:bg-surface-800" />
            <span className="relative z-10 px-3 text-[10px] uppercase font-bold text-surface-400 bg-white dark:bg-surface-900 font-bangla">অথবা</span>
          </div>

          {/* Third Party Login */}
          <div className="space-y-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full btn-secondary py-3 flex items-center justify-center gap-2 font-bold text-sm"
              id="login-google-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.68,11.78 21.56,11.4 21.35,11.1z" fill="#4285F4" />
                  <path d="M12,20.88c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.54,0.98 -2.72,0 -5.02,-1.84 -5.84,-4.3H1.86v2.66C3.34,18.42 7.39,20.88 12,20.88z" fill="#34A853" />
                  <path d="M6.16,12.78c-0.21,-0.64 -0.33,-1.32 -0.33,-2.02s0.12,-1.38 0.33,-2.02V6.08H1.86C1.2,7.4 0.82,8.9 0.82,10.76s0.38,3.36 1.04,4.68l4.3,-3.36z" fill="#FBBC05" />
                  <path d="M12,5.2c1.32,0 2.5,0.46 3.44,1.35l2.58,-2.58C16.46,2.44 14.42,1.64 12,1.64c-4.61,0 -8.66,2.46 -10.14,5.1l4.3,3.36C6.98,6.8 9.28,5.2 12,5.2z" fill="#EA4335" />
                </g>
              </svg>
              Google অ্যাকাউন্ট দিয়ে প্রবেশ
            </button>
            <button
              onClick={handleAnonymousBrowse}
              className="w-full btn-ghost py-3 flex items-center justify-center font-bold text-xs text-surface-500 hover:text-brand-500 font-bangla"
              id="login-anon-btn"
            >
              বেনামী পাঠক হিসেবে ব্রাউজ করুন
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center text-xs text-surface-500 font-bangla">
            নতুন সদস্য? <Link href="/auth/register" className="text-brand-500 hover:underline font-bold">নতুন অ্যাকাউন্ট তৈরি করুন</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
