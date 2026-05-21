import type { CategoryId } from '@/lib/firebase/types';

export type Severity = 'critical' | 'high' | 'medium' | 'positive' | 'neutral';

export interface Category {
  id: CategoryId;
  label_en: string;
  label_bn: string;
  severity: Severity;
  colorClass: string;
  icon: string;
}

/**
 * All Sakkhi categories ordered by severity (critical → neutral).
 */
export const categories: Category[] = [
  {
    id: 'child_abuse',
    label_en: 'Child Abuse',
    label_bn: 'শিশু নির্যাতন',
    severity: 'critical',
    colorClass: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800',
    icon: 'ShieldAlert',
  },
  {
    id: 'sexual_violence',
    label_en: 'Sexual Violence',
    label_bn: 'যৌন সহিংসতা',
    severity: 'critical',
    colorClass: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800',
    icon: 'AlertOctagon',
  },
  {
    id: 'murder',
    label_en: 'Murder',
    label_bn: 'হত্যাকাণ্ড',
    severity: 'critical',
    colorClass: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800',
    icon: 'Skull',
  },
  {
    id: 'corruption',
    label_en: 'Corruption',
    label_bn: 'দুর্নীতি',
    severity: 'high',
    colorClass: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800',
    icon: 'Landmark',
  },
  {
    id: 'domestic_violence',
    label_en: 'Domestic Violence',
    label_bn: 'পারিবারিক সহিংসতা',
    severity: 'high',
    colorClass: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800',
    icon: 'Home',
  },
  {
    id: 'injustice',
    label_en: 'Injustice',
    label_bn: 'বিচারহীনতা',
    severity: 'medium',
    colorClass: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
    icon: 'Scale',
  },
  {
    id: 'institution_abuse',
    label_en: 'Institutional Abuse',
    label_bn: 'শিক্ষা প্রতিষ্ঠানে নির্যাতন',
    severity: 'medium',
    colorClass: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
    icon: 'School',
  },
  {
    id: 'success',
    label_en: 'Success Story',
    label_bn: 'সফলতার গল্প',
    severity: 'positive',
    colorClass: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800',
    icon: 'Trophy',
  },
  {
    id: 'petition',
    label_en: 'Petition & Movement',
    label_bn: 'দাবি ও আন্দোলন',
    severity: 'neutral',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800',
    icon: 'Megaphone',
  },
  {
    id: 'general',
    label_en: 'General Post',
    label_bn: 'সাধারণ পোস্ট',
    severity: 'neutral',
    colorClass: 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700',
    icon: 'FileText',
  },
];

/**
 * Lookup record: CATEGORIES['child_abuse'] → Category
 */
export const CATEGORIES: Record<CategoryId, Category> = categories.reduce(
  (acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  },
  {} as Record<CategoryId, Category>,
);

/**
 * Severity weight mapping used by the scoring algorithm.
 */
export const SEVERITY_WEIGHTS: Record<Severity, number> = {
  critical: 1.0,
  high: 0.7,
  medium: 0.4,
  positive: 0.2,
  neutral: 0.1,
};

/**
 * Get category by its ID, returns undefined if not found.
 */
export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES[id];
}

/**
 * Get all categories matching a severity level.
 */
export function getCategoriesBySeverity(severity: Severity): Category[] {
  return categories.filter((c) => c.severity === severity);
}
