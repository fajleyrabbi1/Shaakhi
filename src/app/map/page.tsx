"use client";

import React, { useState } from "react";
import { MapPin, Search, ChevronRight, X, Layers } from "lucide-react";

// Mock District data with case count
const MOCK_DISTRICT_CASES: Record<string, { cases: number; critical: number; unresolved: number }> = {
  dhaka: { cases: 423, critical: 124, unresolved: 290 },
  chattogram: { cases: 189, critical: 45, unresolved: 110 },
  sylhet: { cases: 87, critical: 21, unresolved: 45 },
  rajshahi: { cases: 94, critical: 25, unresolved: 60 },
  khulna: { cases: 78, critical: 18, unresolved: 52 },
  barishal: { cases: 56, critical: 12, unresolved: 38 },
  rangpur: { cases: 65, critical: 15, unresolved: 40 },
  mymensingh: { cases: 45, critical: 9, unresolved: 28 },
  comilla: { cases: 38, critical: 8, unresolved: 22 },
  gazipur: { cases: 62, critical: 19, unresolved: 41 },
};

const DIVISIONS = [
  { id: "dhaka", name: "ঢাকা", cases: 547 },
  { id: "chattogram", name: "চট্টগ্রাম", cases: 289 },
  { id: "sylhet", name: "সিলেট", cases: 112 },
  { id: "rajshahi", name: "রাজশাহী", cases: 145 },
  { id: "khulna", name: "খুলনা", cases: 128 },
  { id: "barishal", name: "বরিশাল", cases: 89 },
  { id: "rangpur", name: "রংপুর", cases: 98 },
  { id: "mymensingh", name: "ময়মনসিংহ", cases: 67 },
];

export default function MapPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>("dhaka");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOverlay, setActiveOverlay] = useState<"all" | "critical" | "corruption">("all");

  const districtData = selectedDistrict ? MOCK_DISTRICT_CASES[selectedDistrict] : null;
  const districtName = selectedDistrict
    ? selectedDistrict === "dhaka"
      ? "ঢাকা"
      : selectedDistrict === "chattogram"
      ? "চট্টগ্রাম"
      : selectedDistrict === "sylhet"
      ? "সিলেট"
      : selectedDistrict === "rajshahi"
      ? "রাজশাহী"
      : selectedDistrict === "khulna"
      ? "খুলনা"
      : selectedDistrict === "barishal"
      ? "বরিশাল"
      : selectedDistrict === "rangpur"
      ? "রংপুর"
      : selectedDistrict === "mymensingh"
      ? "ময়মনসিংহ"
      : selectedDistrict === "comilla"
      ? "কুমিল্লা"
      : "গাজীপুর"
    : "";

  return (
    <div className="relative flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden animate-fade-in" id="map-page-container">
      {/* Search & Info Panel (Left Overlay/Sidebar) */}
      <div className="w-full lg:w-96 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col shrink-0 z-20 shadow-xl">
        {/* Search */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-800">
          <h1 className="text-xl font-bold text-surface-900 dark:text-surface-100 font-bangla mb-3">মানচিত্র ভিউ</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="জেলা খুঁজুন (যেমন: ঢাকা, সিলেট)..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="map-search-input"
            />
          </div>
        </div>

        {/* Division List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h2 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2 font-bangla">বিভাগ ভিত্তিক ঘটনা</h2>
          <div className="space-y-1">
            {DIVISIONS.filter(d => d.name.includes(searchQuery) || d.id.includes(searchQuery.toLowerCase())).map((div) => (
              <button
                key={div.id}
                onClick={() => setSelectedDistrict(div.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  selectedDistrict === div.id
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                    : "hover:bg-surface-50 dark:hover:bg-surface-800/50 border border-transparent"
                }`}
                id={`map-div-btn-${div.id}`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span className="font-semibold font-bangla text-sm">{div.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-full text-surface-600 dark:text-surface-400">
                    {div.cases}
                  </span>
                  <ChevronRight className="w-4 h-4 text-surface-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected District Details */}
        {selectedDistrict && districtData && (
          <div className="p-4 bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 animate-slide-up" id="map-district-details">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-brand-500" /> {districtName} জেলা
                </h3>
                <p className="text-xs text-surface-400">সর্বমোট আপডেটকৃত ডেটা</p>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="btn-icon !p-1"
                aria-label="Deselect district"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white dark:bg-surface-850 p-2.5 rounded-xl text-center border border-surface-100 dark:border-surface-800">
                <span className="block text-lg font-bold text-surface-900 dark:text-surface-100">{districtData.cases}</span>
                <span className="text-[10px] text-surface-500">মোট ঘটনা</span>
              </div>
              <div className="bg-critical-50 dark:bg-critical-900/10 p-2.5 rounded-xl text-center border border-critical-100 dark:border-critical-900/20">
                <span className="block text-lg font-bold text-critical-600 dark:text-critical-400">{districtData.critical}</span>
                <span className="text-[10px] text-critical-500">গুরুতর</span>
              </div>
              <div className="bg-warning-50 dark:bg-warning-900/10 p-2.5 rounded-xl text-center border border-warning-100 dark:border-warning-900/20">
                <span className="block text-lg font-bold text-warning-600 dark:text-warning-400">{districtData.unresolved}</span>
                <span className="text-[10px] text-warning-500">বিচারহীন</span>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = `/cases?district=${selectedDistrict}`)}
              className="w-full btn-primary !text-xs"
              id="map-view-cases-btn"
            >
              এই জেলার সকল কেস দেখুন →
            </button>
          </div>
        )}
      </div>

      {/* Map Interactive Canvas area (Mock styled interactive container) */}
      <div className="flex-1 relative bg-gradient-to-br from-green-500/10 via-red-500/5 to-surface-100 dark:to-surface-950 flex items-center justify-center p-6 min-h-[300px]">
        {/* Decorative Grid Lines to look like geospatial environment */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Overlay Options at top */}
        <div className="absolute top-4 left-4 right-4 flex justify-between gap-4 z-10">
          <div className="flex bg-white dark:bg-surface-900/80 backdrop-blur-md border border-surface-200 dark:border-surface-800 rounded-xl p-1 shadow-md">
            <button
              onClick={() => setActiveOverlay("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-bangla transition-all ${
                activeOverlay === "all" ? "bg-brand-500 text-white" : "hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
              id="map-overlay-all"
            >
              সকল ঘটনা
            </button>
            <button
              onClick={() => setActiveOverlay("critical")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-bangla transition-all ${
                activeOverlay === "critical" ? "bg-critical-500 text-white" : "hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
              id="map-overlay-critical"
            >
              🚨 গুরুতর
            </button>
            <button
              onClick={() => setActiveOverlay("corruption")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-bangla transition-all ${
                activeOverlay === "corruption" ? "bg-orange-500 text-white" : "hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
              id="map-overlay-corruption"
            >
              💼 দুর্নীতি
            </button>
          </div>
        </div>

        {/* Bangladesh Stylized Visualization & Nodes */}
        <div className="relative w-full max-w-lg aspect-[3/4] flex items-center justify-center border border-surface-200/50 dark:border-surface-800/50 rounded-3xl bg-white/30 dark:bg-surface-900/20 backdrop-blur-sm shadow-inner p-4">
          <div className="absolute text-center opacity-40 select-none">
            <p className="font-bangla font-black text-4xl text-brand-600/10 dark:text-brand-400/5">বাংলাদেশ</p>
            <p className="text-xs text-surface-400">ইন্টারেক্টিভ কেস মানচিত্র</p>
          </div>

          {/* Stylized Dots for Divisions */}
          <div className="absolute w-full h-full">
            {/* Rangpur Node */}
            <button
              onClick={() => setSelectedDistrict("rangpur")}
              className={`absolute top-[15%] left-[30%] group flex flex-col items-center`}
              id="map-node-rangpur"
            >
              <span className="w-5 h-5 rounded-full bg-critical-500/30 border-2 border-critical-500 flex items-center justify-center animate-ping absolute" />
              <span className="w-5 h-5 rounded-full bg-critical-500 border-2 border-white dark:border-surface-900 relative z-10 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla relative z-10">
                রংপুর ({MOCK_DISTRICT_CASES.rangpur.cases})
              </span>
            </button>

            {/* Mymensingh Node */}
            <button
              onClick={() => setSelectedDistrict("mymensingh")}
              className="absolute top-[30%] left-[50%] group flex flex-col items-center"
              id="map-node-mymensingh"
            >
              <span className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-surface-900 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla">
                ময়মনসিংহ ({MOCK_DISTRICT_CASES.mymensingh.cases})
              </span>
            </button>

            {/* Sylhet Node */}
            <button
              onClick={() => setSelectedDistrict("sylhet")}
              className="absolute top-[35%] left-[75%] group flex flex-col items-center"
              id="map-node-sylhet"
            >
              <span className="w-5 h-5 rounded-full bg-critical-500/30 border-2 border-critical-500 flex items-center justify-center animate-ping absolute" />
              <span className="w-5 h-5 rounded-full bg-critical-500 border-2 border-white dark:border-surface-900 relative z-10 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla relative z-10">
                সিলেট ({MOCK_DISTRICT_CASES.sylhet.cases})
              </span>
            </button>

            {/* Rajshahi Node */}
            <button
              onClick={() => setSelectedDistrict("rajshahi")}
              className="absolute top-[40%] left-[20%] group flex flex-col items-center"
              id="map-node-rajshahi"
            >
              <span className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-surface-900 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla">
                রাজশাহী ({MOCK_DISTRICT_CASES.rajshahi.cases})
              </span>
            </button>

            {/* Dhaka Node */}
            <button
              onClick={() => setSelectedDistrict("dhaka")}
              className="absolute top-[50%] left-[48%] group flex flex-col items-center"
              id="map-node-dhaka"
            >
              <span className="w-6 h-6 rounded-full bg-critical-500/40 border-2 border-critical-500 flex items-center justify-center animate-ping absolute" />
              <span className="w-6 h-6 rounded-full bg-critical-500 border-2 border-white dark:border-surface-900 relative z-10 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla relative z-10">
                ঢাকা ({MOCK_DISTRICT_CASES.dhaka.cases})
              </span>
            </button>

            {/* Khulna Node */}
            <button
              onClick={() => setSelectedDistrict("khulna")}
              className="absolute top-[65%] left-[25%] group flex flex-col items-center"
              id="map-node-khulna"
            >
              <span className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-surface-900 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla">
                খুলনা ({MOCK_DISTRICT_CASES.khulna.cases})
              </span>
            </button>

            {/* Barishal Node */}
            <button
              onClick={() => setSelectedDistrict("barishal")}
              className="absolute top-[70%] left-[45%] group flex flex-col items-center"
              id="map-node-barishal"
            >
              <span className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-surface-900 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla">
                বরিশাল ({MOCK_DISTRICT_CASES.barishal.cases})
              </span>
            </button>

            {/* Chattogram Node */}
            <button
              onClick={() => setSelectedDistrict("chattogram")}
              className="absolute top-[75%] left-[70%] group flex flex-col items-center"
              id="map-node-chattogram"
            >
              <span className="w-5 h-5 rounded-full bg-critical-500/30 border-2 border-critical-500 flex items-center justify-center animate-ping absolute" />
              <span className="w-5 h-5 rounded-full bg-critical-500 border-2 border-white dark:border-surface-900 relative z-10 shadow-lg group-hover:scale-125 transition-transform" />
              <span className="bg-white dark:bg-surface-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-surface-150 dark:border-surface-800 mt-1 font-bangla relative z-10">
                চট্টগ্রাম ({MOCK_DISTRICT_CASES.chattogram.cases})
              </span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-surface-900/95 backdrop-blur border border-surface-200 dark:border-surface-800 rounded-xl p-3 shadow-md max-w-[180px]">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-surface-450 dark:text-surface-500 mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-500" /> লেজেন্ড
          </h4>
          <div className="space-y-1.5 text-[10px] text-surface-600 dark:text-surface-400 font-medium font-bangla">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-critical-500" />
              <span>গুরুতর অপরাধ (&gt; ১০০টি)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span>মাঝারি ক্রাইম / দুর্নীতি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
              <span>সাধারণ / তদন্তাধীন</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
