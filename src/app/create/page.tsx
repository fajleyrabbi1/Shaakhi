"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bold, Italic, List, Link2, Image as ImageIcon, Upload, Eye, EyeOff, Send, X, Plus } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "child_abuse", label: "শিশু নির্যাতন" },
  { id: "sexual_violence", label: "যৌন সহিংসতা" },
  { id: "murder", label: "হত্যাকাণ্ড" },
  { id: "corruption", label: "দুর্নীতি" },
  { id: "domestic_violence", label: "পারিবারিক সহিংসতা" },
  { id: "injustice", label: "বিচারহীনতা" },
  { id: "institution_abuse", label: "শিক্ষা প্রতিষ্ঠানে নির্যাতন" },
  { id: "success", label: "সফলতার গল্প" },
  { id: "petition", label: "দাবি ও আন্দোলন" },
  { id: "general", label: "সাধারণ পোস্ট" },
];

const DIVISIONS: Record<string, { id: string; name: string }[]> = {
  "ঢাকা": [{ id: "dhaka", name: "ঢাকা" }, { id: "gazipur", name: "গাজীপুর" }, { id: "narayanganj", name: "নারায়ণগঞ্জ" }, { id: "tangail", name: "টাঙ্গাইল" }, { id: "faridpur", name: "ফরিদপুর" }, { id: "manikganj", name: "মানিকগঞ্জ" }, { id: "munshiganj", name: "মুন্সীগঞ্জ" }, { id: "kishoreganj", name: "কিশোরগঞ্জ" }, { id: "madaripur", name: "মাদারীপুর" }, { id: "gopalganj", name: "গোপালগঞ্জ" }, { id: "rajbari", name: "রাজবাড়ী" }, { id: "narsingdi", name: "নরসিংদী" }, { id: "shariatpur", name: "শরীয়তপুর" }],
  "চট্টগ্রাম": [{ id: "chattogram", name: "চট্টগ্রাম" }, { id: "comilla", name: "কুমিল্লা" }, { id: "coxs_bazar", name: "কক্সবাজার" }, { id: "brahmanbaria", name: "ব্রাহ্মণবাড়িয়া" }, { id: "chandpur", name: "চাঁদপুর" }, { id: "feni", name: "ফেনী" }, { id: "noakhali", name: "নোয়াখালী" }, { id: "lakshmipur", name: "লক্ষ্মীপুর" }, { id: "khagrachhari", name: "খাগড়াছড়ি" }, { id: "rangamati", name: "রাঙামাটি" }, { id: "bandarban", name: "বান্দরবান" }],
  "রাজশাহী": [{ id: "rajshahi", name: "রাজশাহী" }, { id: "bogura", name: "বগুড়া" }, { id: "pabna", name: "পাবনা" }, { id: "sirajganj", name: "সিরাজগঞ্জ" }, { id: "natore", name: "নাটোর" }, { id: "naogaon", name: "নওগাঁ" }, { id: "chapainawabganj", name: "চাঁপাইনবাবগঞ্জ" }, { id: "joypurhat", name: "জয়পুরহাট" }],
  "খুলনা": [{ id: "khulna", name: "খুলনা" }, { id: "jessore", name: "যশোর" }, { id: "kushtia", name: "কুষ্টিয়া" }, { id: "satkhira", name: "সাতক্ষীরা" }, { id: "bagerhat", name: "বাগেরহাট" }, { id: "narail", name: "নড়াইল" }, { id: "magura", name: "মাগুরা" }, { id: "jhenaidah", name: "ঝিনাইদহ" }, { id: "meherpur", name: "মেহেরপুর" }, { id: "chuadanga", name: "চুয়াডাঙ্গা" }],
  "সিলেট": [{ id: "sylhet", name: "সিলেট" }, { id: "moulvibazar", name: "মৌলভীবাজার" }, { id: "habiganj", name: "হবিগঞ্জ" }, { id: "sunamganj", name: "সুনামগঞ্জ" }],
  "বরিশাল": [{ id: "barishal", name: "বরিশাল" }, { id: "patuakhali", name: "পটুয়াখালী" }, { id: "pirojpur", name: "পিরোজপুর" }, { id: "bhola", name: "ভোলা" }, { id: "barguna", name: "বরগুনা" }, { id: "jhalokati", name: "ঝালকাঠি" }],
  "রংপুর": [{ id: "rangpur", name: "রংপুর" }, { id: "dinajpur", name: "দিনাজপুর" }, { id: "kurigram", name: "কুড়িগ্রাম" }, { id: "gaibandha", name: "গাইবান্ধা" }, { id: "nilphamari", name: "নীলফামারী" }, { id: "lalmonirhat", name: "লালমনিরহাট" }, { id: "thakurgaon", name: "ঠাকুরগাঁও" }, { id: "panchagarh", name: "পঞ্চগড়" }],
  "ময়মনসিংহ": [{ id: "mymensingh", name: "ময়মনসিংহ" }, { id: "jamalpur", name: "জামালপুর" }, { id: "netrokona", name: "নেত্রকোণা" }, { id: "sherpur", name: "শেরপুর" }],
};

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [sourceLinks, setSourceLinks] = useState<string[]>([""]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const addSourceLink = () => setSourceLinks([...sourceLinks, ""]);
  const removeSourceLink = (i: number) => setSourceLinks(sourceLinks.filter((_, idx) => idx !== i));
  const updateSourceLink = (i: number, v: string) => { const n = [...sourceLinks]; n[i] = v; setSourceLinks(n); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !category || !district || !incidentDate) {
      toast.error("অনুগ্রহ করে সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }
    toast.success("পোস্ট সফলভাবে প্রকাশিত হয়েছে!", { description: "আপনার পোস্ট পর্যালোচনার জন্য জমা দেওয়া হয়েছে।" });
  };

  return (
    <div className="page-container page-section animate-fade-in">
      <Link href="/home" className="btn-ghost !px-3 !py-1.5 mb-4 inline-flex" id="create-back"><ArrowLeft className="w-4 h-4" /> ফিরে যান</Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100 font-bangla mb-2">নতুন ঘটনা প্রকাশ করুন</h1>
        <p className="text-sm text-surface-500 mb-8 font-bangla">সঠিক তথ্য দিয়ে ঘটনা নথিভুক্ত করুন। প্রতিটি পোস্ট পর্যালোচনার পর প্রকাশিত হবে।</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Content */}
          <section className="card p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla flex items-center gap-2">📝 বিষয়বস্তু</h2>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">শিরোনাম <span className="text-critical-500">*</span></label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ঘটনার শিরোনাম লিখুন..." className="input" id="create-title" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">বিবরণ <span className="text-critical-500">*</span></label>
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border border-b-0 border-surface-300 dark:border-surface-600 rounded-t-lg bg-surface-50 dark:bg-surface-800">
                <button type="button" className="btn-icon !p-1.5" title="Bold"><Bold className="w-4 h-4" /></button>
                <button type="button" className="btn-icon !p-1.5" title="Italic"><Italic className="w-4 h-4" /></button>
                <button type="button" className="btn-icon !p-1.5" title="List"><List className="w-4 h-4" /></button>
                <button type="button" className="btn-icon !p-1.5" title="Link"><Link2 className="w-4 h-4" /></button>
                <div className="w-px h-5 bg-surface-300 dark:bg-surface-600 mx-1" />
                <button type="button" className="btn-icon !p-1.5" title="Image"><ImageIcon className="w-4 h-4" /></button>
              </div>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="ঘটনার বিস্তারিত বিবরণ লিখুন..." className="input !rounded-t-none min-h-[200px] resize-y" id="create-body" required />
            </div>
          </section>

          {/* Section 2: Details */}
          <section className="card p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla flex items-center gap-2">📋 তথ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">বিভাগ <span className="text-critical-500">*</span></label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input" id="create-category" required>
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  {CATEGORIES.map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">জেলা <span className="text-critical-500">*</span></label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="input" id="create-district" required>
                  <option value="">জেলা নির্বাচন করুন</option>
                  {Object.entries(DIVISIONS).map(([div, dists]) => (
                    <optgroup key={div} label={div}>
                      {dists.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">ঘটনার তারিখ <span className="text-critical-500">*</span></label>
                <input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className="input" id="create-date" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">মামলা নম্বর <span className="text-surface-400">(ঐচ্ছিক)</span></label>
                <input type="text" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} placeholder="GD-XXXX-XXXX" className="input" id="create-case-number" />
              </div>
            </div>
            {/* Source Links */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">সূত্র লিংক <span className="text-surface-400">(ঐচ্ছিক)</span></label>
              {sourceLinks.map((link, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="url" value={link} onChange={(e) => updateSourceLink(i, e.target.value)} placeholder="https://..." className="input" />
                  {sourceLinks.length > 1 && (<button type="button" onClick={() => removeSourceLink(i)} className="btn-icon text-critical-500"><X className="w-4 h-4" /></button>)}
                </div>
              ))}
              <button type="button" onClick={addSourceLink} className="text-xs text-brand-500 hover:text-brand-600 flex items-center gap-1 mt-1"><Plus className="w-3 h-3" /> আরও লিংক যোগ করুন</button>
            </div>
          </section>

          {/* Section 3: Media Upload */}
          <section className="card p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla flex items-center gap-2">📸 মিডিয়া</h2>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); toast.info("ফাইল আপলোড শীঘ্রই সক্রিয় হবে"); }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${dragActive ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20" : "border-surface-300 dark:border-surface-600 hover:border-surface-400"}`}
            >
              <Upload className="w-10 h-10 mx-auto text-surface-400 mb-3" />
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300 font-bangla">ছবি বা ভিডিও টেনে আনুন বা ক্লিক করুন</p>
              <p className="text-xs text-surface-400 mt-1">সর্বোচ্চ ১০MB · JPG, PNG, MP4</p>
              <button type="button" className="btn-secondary mt-4 !text-xs" id="create-upload-btn"><Upload className="w-4 h-4" /> ফাইল নির্বাচন করুন</button>
            </div>
          </section>

          {/* Section 4: Options */}
          <section className="card p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 font-bangla flex items-center gap-2">⚙️ অপশন</h2>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500" id="create-anonymous" />
              <div>
                <span className="text-sm font-medium text-surface-900 dark:text-surface-100 font-bangla">বেনামীভাবে পোস্ট করুন</span>
                <p className="text-xs text-surface-500 mt-0.5 font-bangla">আপনার নাম ও পরিচয় গোপন থাকবে। &quot;বেনামী সাক্ষী&quot; হিসেবে প্রদর্শিত হবে।</p>
              </div>
            </label>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button type="button" onClick={() => setShowPreview(!showPreview)} className="btn-secondary" id="create-preview">
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "প্রিভিউ বন্ধ" : "প্রিভিউ"}
            </button>
            <button type="submit" className="btn-primary !px-8 !py-3 !text-base" id="create-submit">
              <Send className="w-5 h-5" /> পোস্ট জমা দিন
            </button>
          </div>

          {/* Preview */}
          {showPreview && title && (
            <div className="card p-6 border-l-4 border-l-brand-500 animate-slide-up">
              <p className="text-xs text-surface-400 mb-2">📋 প্রিভিউ</p>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 font-bangla mb-2">{title}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 font-bangla whitespace-pre-line">{body}</p>
              <div className="flex gap-2 mt-3">
                {category && <span className="badge-default">{CATEGORIES.find(c => c.id === category)?.label}</span>}
                {isAnonymous && <span className="badge-default">👁️ বেনামী</span>}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
