import type { PostStatus, TimelineStepId, ReactionKey } from '@/lib/firebase/types';

// ─── Timeline Steps ────────────────────────────────────────────────────────

export interface TimelineStepConfig {
  id: TimelineStepId;
  label_bn: string;
  label_en: string;
}

/**
 * The 6 chronological steps of a case's justice journey.
 */
export const TIMELINE_STEPS: TimelineStepConfig[] = [
  { id: 'incident', label_bn: 'ঘটনা', label_en: 'Incident' },
  { id: 'fir_filed', label_bn: 'মামলা দায়ের', label_en: 'FIR Filed' },
  { id: 'arrest', label_bn: 'গ্রেফতার', label_en: 'Arrest' },
  { id: 'trial_started', label_bn: 'বিচার শুরু', label_en: 'Trial Started' },
  { id: 'verdict', label_bn: 'রায়', label_en: 'Verdict' },
  { id: 'enforcement', label_bn: 'কার্যকর', label_en: 'Enforcement' },
];

// ─── Status Config ──────────────────────────────────────────────────────────

export interface StatusConfig {
  emoji: string;
  label_bn: string;
  label_en: string;
  colorClass: string;
}

/**
 * Visual configuration for each PostStatus value.
 */
export const STATUS_CONFIG: Record<PostStatus, StatusConfig> = {
  no_action: {
    emoji: '🔴',
    label_bn: 'কোন ব্যবস্থা হয়নি',
    label_en: 'No action',
    colorClass:
      'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800',
  },
  investigating: {
    emoji: '🟡',
    label_bn: 'তদন্তাধীন',
    label_en: 'Under investigation',
    colorClass:
      'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
  },
  in_court: {
    emoji: '🟠',
    label_bn: 'বিচারাধীন',
    label_en: 'In court',
    colorClass:
      'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800',
  },
  resolved: {
    emoji: '🟢',
    label_bn: 'সমাধানকৃত',
    label_en: 'Resolved',
    colorClass:
      'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800',
  },
  abandoned: {
    emoji: '⚫',
    label_bn: 'পরিত্যক্ত',
    label_en: 'Abandoned',
    colorClass:
      'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700',
  },
};

// ─── Reaction Config ────────────────────────────────────────────────────────

export interface ReactionConfig {
  emoji: string;
  label_bn: string;
  label_en: string;
  colorClass: string;
}

/**
 * Visual configuration for each reaction type.
 */
export const REACTION_CONFIG: Record<ReactionKey, ReactionConfig> = {
  anger: {
    emoji: '😡',
    label_bn: 'ক্ষোভ',
    label_en: 'Anger',
    colorClass: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950',
  },
  sad: {
    emoji: '😢',
    label_bn: 'দুঃখ',
    label_en: 'Sadness',
    colorClass: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950',
  },
  solidarity: {
    emoji: '✊',
    label_bn: 'সংহতি',
    label_en: 'Solidarity',
    colorClass: 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950',
  },
  witness: {
    emoji: '👁️',
    label_bn: 'সাক্ষী',
    label_en: 'Witness',
    colorClass: 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950',
  },
};

// ─── User Badges ────────────────────────────────────────────────────────────

export interface BadgeConfig {
  id: string;
  emoji: string;
  label_bn: string;
  label_en: string;
  description_bn: string;
  description_en: string;
  colorClass: string;
}

/**
 * Configuration for all earnable user badges.
 */
export const USER_BADGES: BadgeConfig[] = [
  {
    id: 'first_post',
    emoji: '✍️',
    label_bn: 'প্রথম পোস্ট',
    label_en: 'First Post',
    description_bn: 'প্রথম পোস্ট তৈরি করেছেন',
    description_en: 'Created their first post',
    colorClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    id: 'verified_reporter',
    emoji: '✅',
    label_bn: 'যাচাইকৃত সংবাদদাতা',
    label_en: 'Verified Reporter',
    description_bn: 'পরিচয় যাচাই সম্পন্ন',
    description_en: 'Identity verified by moderators',
    colorClass: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  {
    id: 'justice_seeker',
    emoji: '⚖️',
    label_bn: 'বিচার প্রত্যাশী',
    label_en: 'Justice Seeker',
    description_bn: '১০টি মামলা অনুসরণ করেছেন',
    description_en: 'Following 10 or more cases',
    colorClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  {
    id: 'community_voice',
    emoji: '📢',
    label_bn: 'জনকণ্ঠ',
    label_en: 'Community Voice',
    description_bn: '৫০টি মন্তব্য করেছেন',
    description_en: 'Made 50 or more comments',
    colorClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  },
  {
    id: 'petition_starter',
    emoji: '📝',
    label_bn: 'দাবি উত্থাপনকারী',
    label_en: 'Petition Starter',
    description_bn: 'একটি দাবি তৈরি করেছেন',
    description_en: 'Started a petition',
    colorClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  },
  {
    id: 'milestone_100',
    emoji: '💯',
    label_bn: '১০০ পোস্ট',
    label_en: '100 Posts',
    description_bn: '১০০টি পোস্ট তৈরি করেছেন',
    description_en: 'Created 100 posts',
    colorClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  },
  {
    id: 'trusted_witness',
    emoji: '🛡️',
    label_bn: 'বিশ্বস্ত সাক্ষী',
    label_en: 'Trusted Witness',
    description_bn: '২০ বার সাক্ষী হিসেবে চিহ্নিত হয়েছেন',
    description_en: 'Marked as witness 20 or more times',
    colorClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  },
];

/**
 * Lookup a badge config by its ID.
 */
export function getBadgeById(id: string): BadgeConfig | undefined {
  return USER_BADGES.find((b) => b.id === id);
}

// ─── Misc constants ─────────────────────────────────────────────────────────

/** Maximum number of media uploads per post */
export const MAX_MEDIA_UPLOADS = 10;

/** Maximum body length (characters) */
export const MAX_BODY_LENGTH = 50_000;

/** Petition milestone thresholds for notifications */
export const PETITION_MILESTONES = [10, 50, 100, 500, 1000, 5000, 10000];

/** Default pagination page size */
export const PAGE_SIZE = 20;
