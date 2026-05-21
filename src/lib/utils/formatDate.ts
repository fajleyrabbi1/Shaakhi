// ─── Bangla digit mapping ───────────────────────────────────────────────────

const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Convert an integer or float to Bangla numeral string.
 * @example toBanglaNumber(2026) → '২০২৬'
 */
export function toBanglaNumber(num: number): string {
  return String(num)
    .split('')
    .map((ch) => {
      const digit = parseInt(ch, 10);
      return isNaN(digit) ? ch : BANGLA_DIGITS[digit];
    })
    .join('');
}

// ─── Bangla month names ─────────────────────────────────────────────────────

const BN_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// ─── Relative time ──────────────────────────────────────────────────────────

/**
 * Human-friendly relative timestamp.
 * @example formatRelativeTime(threeMinutesAgo, 'bn') → '৩ মিনিট আগে'
 * @example formatRelativeTime(threeDaysAgo, 'en') → '3 days ago'
 */
export function formatRelativeTime(
  date: Date | string | number,
  lang: 'bn' | 'en' = 'bn',
): string {
  const d = date instanceof Date ? date : new Date(date);
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (lang === 'bn') {
    if (diffSec < 10) return 'এইমাত্র';
    if (diffSec < 60) return `${toBanglaNumber(diffSec)} সেকেন্ড আগে`;
    if (diffMin === 1) return '১ মিনিট আগে';
    if (diffMin < 60) return `${toBanglaNumber(diffMin)} মিনিট আগে`;
    if (diffHour === 1) return '১ ঘণ্টা আগে';
    if (diffHour < 24) return `${toBanglaNumber(diffHour)} ঘণ্টা আগে`;
    if (diffDay === 1) return '১ দিন আগে';
    if (diffDay < 30) return `${toBanglaNumber(diffDay)} দিন আগে`;
    if (diffMonth === 1) return '১ মাস আগে';
    if (diffMonth < 12) return `${toBanglaNumber(diffMonth)} মাস আগে`;
    if (diffYear === 1) return '১ বছর আগে';
    return `${toBanglaNumber(diffYear)} বছর আগে`;
  }

  // English
  if (diffSec < 10) return 'Just now';
  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin === 1) return '1 minute ago';
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour === 1) return '1 hour ago';
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay === 1) return '1 day ago';
  if (diffDay < 30) return `${diffDay} days ago`;
  if (diffMonth === 1) return '1 month ago';
  if (diffMonth < 12) return `${diffMonth} months ago`;
  if (diffYear === 1) return '1 year ago';
  return `${diffYear} years ago`;
}

// ─── Absolute date ──────────────────────────────────────────────────────────

/**
 * Format a date as a localized absolute string.
 * @example formatDate(date, 'bn') → '২১ মে, ২০২৬'
 * @example formatDate(date, 'en') → 'May 21, 2026'
 */
export function formatDate(
  date: Date | string | number,
  lang: 'bn' | 'en' = 'bn',
): string {
  const d = date instanceof Date ? date : new Date(date);
  const day = d.getDate();
  const month = d.getMonth(); // 0-indexed
  const year = d.getFullYear();

  if (lang === 'bn') {
    return `${toBanglaNumber(day)} ${BN_MONTHS[month]}, ${toBanglaNumber(year)}`;
  }

  return `${EN_MONTHS[month]} ${day}, ${year}`;
}

// ─── Day count ──────────────────────────────────────────────────────────────

/**
 * Format a number of days with localised label.
 * @example formatDaysCount(45, 'bn') → '৪৫ দিন'
 * @example formatDaysCount(45, 'en') → '45 days'
 */
export function formatDaysCount(
  days: number,
  lang: 'bn' | 'en' = 'bn',
): string {
  if (lang === 'bn') {
    return `${toBanglaNumber(days)} দিন`;
  }
  return `${days} day${days !== 1 ? 's' : ''}`;
}
