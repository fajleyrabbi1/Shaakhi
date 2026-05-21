import type { Post } from '@/lib/firebase/types';
import { CATEGORIES, type Severity } from '@/data/categories';

// ─── Severity weights ───────────────────────────────────────────────────────

const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 1.0,
  high: 0.7,
  medium: 0.4,
  positive: 0.2,
  neutral: 0.1,
};

// ─── Weight distribution ────────────────────────────────────────────────────

const W_SEVERITY = 0.3;
const W_FRESHNESS = 0.25;
const W_ENGAGEMENT = 0.2;
const W_JUSTICE = 0.15;
const W_INTEREST = 0.1;

// ─── Component scorers ─────────────────────────────────────────────────────

/**
 * Case severity weight based on category.
 * Returns a value in [0, 1].
 */
function severityScore(post: Post): number {
  const category = CATEGORIES[post.category];
  if (!category) return SEVERITY_WEIGHT.neutral;
  return SEVERITY_WEIGHT[category.severity] ?? SEVERITY_WEIGHT.neutral;
}

/**
 * Time freshness — exponential decay from 1.0 (just posted)
 * to ≈0.0 (30+ days old).
 *
 * Formula: e^(-λ·days)  where λ = ln(100)/30 ≈ 0.1535
 *   → at day 0  = 1.0
 *   → at day 7  ≈ 0.34
 *   → at day 14 ≈ 0.12
 *   → at day 30 ≈ 0.01
 */
function freshnessScore(post: Post): number {
  const now = Date.now();
  const created =
    post.createdAt instanceof Date
      ? post.createdAt.getTime()
      : new Date(post.createdAt).getTime();

  const daysSinceCreation = Math.max(
    0,
    (now - created) / (1000 * 60 * 60 * 24),
  );

  const lambda = Math.log(100) / 30; // ≈ 0.1535
  return Math.exp(-lambda * daysSinceCreation);
}

/**
 * User engagement — normalized sum of reactions, comments, and shares.
 * Capped at 1.0.
 */
function engagementScore(post: Post): number {
  const reactions = post.reactions
    ? post.reactions.anger +
      post.reactions.sad +
      post.reactions.solidarity +
      post.reactions.witness
    : 0;
  const total = reactions + (post.commentCount ?? 0) + (post.shareCount ?? 0);
  return Math.min(total / 100, 1.0);
}

/**
 * Days without justice — linearly scaled, capped at 1 year (365 days).
 * Gives a boost when > 30 days (long-forgotten cases surface higher).
 */
function justiceScore(post: Post): number {
  const days = post.daysWithoutJustice ?? 0;
  if (days <= 0) return 0;

  // Base: linear from 0 → 1 over 365 days
  const base = Math.min(days / 365, 1.0);

  // Boost: cases older than 30 days get a 20% bump (capped)
  const boost = days > 30 ? 0.2 : 0;

  return Math.min(base + boost, 1.0);
}

/**
 * User interest profile match.
 * Placeholder: returns 0.5 (neutral). Replace once user profile
 * interest matching is implemented.
 */
function interestScore(): number {
  return 0.5;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Calculate the composite ranking score for a post.
 *
 * Score = (Severity × 30%) + (Freshness × 25%)
 *       + (Engagement × 20%) + (Justice × 15%)
 *       + (Interest × 10%)
 *
 * Returns a number in the approximate range [0, 1].
 */
export function calculatePostScore(post: Post): number {
  const s = severityScore(post);
  const f = freshnessScore(post);
  const e = engagementScore(post);
  const j = justiceScore(post);
  const i = interestScore();

  // Pinned posts always sort to the top
  const pinBoost = post.isPinned ? 10 : 0;

  return (
    pinBoost +
    s * W_SEVERITY +
    f * W_FRESHNESS +
    e * W_ENGAGEMENT +
    j * W_JUSTICE +
    i * W_INTEREST
  );
}

/**
 * Sort an array of posts by descending composite score.
 * Returns a new sorted array (does not mutate the original).
 */
export function sortPostsByScore(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const scoreA = a.score ?? calculatePostScore(a);
    const scoreB = b.score ?? calculatePostScore(b);
    return scoreB - scoreA;
  });
}
