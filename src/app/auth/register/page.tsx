"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, MapPin, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !district) {
      toast.error("অনুগ্রহ করে সকল তথ্য পূরণ করুন");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!", { description: "আপনার জেলা ভিত্তিক অ্যালার্ট সেট করা হয়েছে।" });
      window.location.href = "/auth/login";
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-950 dark:to-surface-900 animate-fade-in" id="register-page-container">
      <div className="w-full max-w-md card overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-critical-500 via-brand-500 to-positive-500" />

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-surface-900 dark:text-surface-100 font-bangla tracking-wide">সদস্য নিবন্ধন</h1>
            <p className="text-xs text-surface-500 font-bangla">সাক্ষী জাস্টিস নেটওয়ার্কে যুক্ত হোন</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5 font-bangla">পূর্ণ নাম</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-450 dark:text-surface-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: শফিক আহমেদ"
                  className="input pl-10"
                  id="register-name"
                  required
                />
              </div>
            </div>

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
                  id="register-email"
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
                  id="register-password"
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

            {/* District dropdown for alerts */}
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5 font-bangla">আপনার জেলা (অ্যালার্টের জন্য)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-450 dark:text-surface-500" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="input pl-10"
                  id="register-district"
                  required
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  <option value="dhaka">ঢাকা</option>
                  <option value="chattogram">চট্টগ্রাম</option>
                  <option value="sylhet">সিলেট</option>
                  <option value="rajshahi">রাজশাহী</option>
                  <option value="khulna">খুলনা</option>
                  <option value="barishal">বরিশাল</option>
                  <option value="rangpur">রংপুর</option>
                  <option value="mymensingh">ময়মনসিংহ</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-bold text-sm font-bangla"
              id="register-submit"
            >
              {isLoading ? "নিবন্ধন সম্পন্ন হচ্ছে..." : <><UserPlus className="w-4 h-4" /> অ্যাকাউন্ট তৈরি করুন</>}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-xs text-surface-500 font-bangla">
            ইতিমধ্যেই অ্যাকাউন্ট আছে? <Link href="/auth/login" className="text-brand-500 hover:underline font-bold">প্রবেশ করুন</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
