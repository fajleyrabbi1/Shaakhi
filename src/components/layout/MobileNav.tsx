"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileSearch,
  PlusCircle,
  Map,
  User,
} from "lucide-react";

const navItems = [
  { href: "/home", icon: Home, label_bn: "হোম", label_en: "Home" },
  { href: "/cases", icon: FileSearch, label_bn: "কেস", label_en: "Cases" },
  { href: "/create", icon: PlusCircle, label_bn: "পোস্ট", label_en: "Post", isCenter: true },
  { href: "/map", icon: Map, label_bn: "ম্যাপ", label_en: "Map" },
  { href: "/profile/me", icon: User, label_bn: "প্রোফাইল", label_en: "Profile" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-surface-200 dark:border-surface-700 safe-area-bottom"
      id="mobile-nav"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`mobile-nav-${item.href.slice(1)}`}
                className="relative -mt-5"
                aria-label={item.label_en}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow hover:shadow-lg transition-all duration-300 active:scale-95">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              id={`mobile-nav-${item.href.slice(1)}`}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300"
              }`}
              aria-label={item.label_en}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform duration-200`} />
              <span className="text-[10px] font-medium">{item.label_bn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
