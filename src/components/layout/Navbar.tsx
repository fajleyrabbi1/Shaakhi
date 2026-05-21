"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Plus,
  Shield,
  LogIn,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sakkhi-theme");
    setIsDark(stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches));
    const storedLang = localStorage.getItem("sakkhi-lang");
    if (storedLang === "en" || storedLang === "bn") setLang(storedLang);
  }, []);

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("sakkhi-theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  const toggleLang = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    localStorage.setItem("sakkhi-lang", newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { href: "/home", label: lang === "bn" ? "হোম" : "Home" },
    { href: "/cases", label: lang === "bn" ? "কেস ট্র্যাকার" : "Cases" },
    { href: "/map", label: lang === "bn" ? "মানচিত্র" : "Map" },
    { href: "/stats", label: lang === "bn" ? "পরিসংখ্যান" : "Statistics" },
  ];

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50 h-16">
      <div className="page-container h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 shrink-0 group" id="nav-logo">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow group-hover:shadow-lg transition-shadow duration-300">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-surface-900 dark:text-surface-100 leading-tight font-bangla">
              সাক্ষী
            </h1>
            <p className="text-[10px] text-surface-500 dark:text-surface-400 -mt-0.5 leading-tight">
              {lang === "bn" ? "সামাজিক ন্যায়বিচার" : "Social Justice"}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" id="nav-main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-${link.href.slice(1)}`}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href || pathname?.startsWith(link.href + "/")
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                  : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder={lang === "bn" ? "ঘটনা খুঁজুন..." : "Search cases..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
              id="nav-search"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="btn-icon md:hidden"
            id="nav-search-toggle"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Create Post */}
          <Link
            href="/create"
            className="btn-primary !px-3 !py-2 !text-xs sm:!px-4 sm:!text-sm"
            id="nav-create-post"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === "bn" ? "পোস্ট করুন" : "Create Post"}
            </span>
          </Link>

          {/* Notifications */}
          <Link href="/notifications" className="btn-icon relative" id="nav-notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-500 text-[10px] text-white font-bold flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="btn-icon"
            id="nav-lang-toggle"
            aria-label="Toggle language"
            title={lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
          >
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-bold absolute -bottom-0.5 right-0.5">
              {lang === "bn" ? "EN" : "বা"}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="btn-icon"
            id="nav-theme-toggle"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Login */}
          <Link
            href="/auth/login"
            className="btn-ghost !px-3 !py-2 !text-sm hidden sm:inline-flex"
            id="nav-login"
          >
            <LogIn className="w-4 h-4" />
            {lang === "bn" ? "প্রবেশ" : "Login"}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon lg:hidden"
            id="nav-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 py-2 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 animate-slide-down">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder={lang === "bn" ? "ঘটনা খুঁজুন..." : "Search cases..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
              id="nav-mobile-search"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 animate-slide-down">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                    : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 sm:hidden"
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              {lang === "bn" ? "প্রবেশ করুন" : "Login"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
