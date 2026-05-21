// ─── Union Types ─────────────────────────────────────────────────────────────

export type CategoryId =
  | 'child_abuse'
  | 'sexual_violence'
  | 'murder'
  | 'corruption'
  | 'domestic_violence'
  | 'injustice'
  | 'institution_abuse'
  | 'success'
  | 'petition'
  | 'general';

export type PostStatus =
  | 'no_action'
  | 'investigating'
  | 'in_court'
  | 'resolved'
  | 'abandoned';

export type UserRole =
  | 'anonymous'
  | 'user'
  | 'verified'
  | 'moderator'
  | 'admin';

export type TimelineStepId =
  | 'incident'
  | 'fir_filed'
  | 'arrest'
  | 'trial_started'
  | 'verdict'
  | 'enforcement';

export type NotificationType =
  | 'comment'
  | 'case_update'
  | 'justice_reminder'
  | 'petition_milestone'
  | 'district_alert'
  | 'system';

export type ReactionKey = 'anger' | 'sad' | 'solidarity' | 'witness';

// ─── Firestore Document Interfaces ──────────────────────────────────────────

/**
 * A single step in the justice timeline tracker attached to a Post.
 */
export interface TimelineStep {
  step: TimelineStepId;
  date: Date | null;
  note: string;
  isCompleted: boolean;
}

/**
 * Reactions breakdown embedded in a Post document.
 */
export interface Reactions {
  anger: number;
  sad: number;
  solidarity: number;
  witness: number;
}

/**
 * Primary content document — a case report, success story, or general post.
 */
export interface Post {
  id: string;
  title: string;
  /** Rich-text HTML body */
  body: string;
  category: CategoryId;
  district: string;
  dateOfIncident: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  isAnonymous: boolean;
  authorName: string;
  authorPhotoURL: string;
  /** URLs of uploaded images / videos */
  mediaUrls: string[];
  /** External source / evidence links */
  sourceLinks: string[];
  caseNumber: string;
  status: PostStatus;
  timeline: TimelineStep[];
  reactions: Reactions;
  commentCount: number;
  shareCount: number;
  signatureCount: number;
  /** Auto-computed: days between dateOfIncident and now without 'resolved' status */
  daysWithoutJustice: number;
  /** Composite ranking score (see scoring.ts) */
  score: number;
  isPinned: boolean;
  isFlagged: boolean;
  tags: string[];
}

/**
 * User profile document stored in the `users` collection.
 */
export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  bio: string;
  email: string;
  role: UserRole;
  badges: string[];
  district: string;
  joinedAt: Date;
  followedCases: string[];
  postCount: number;
  isVerified: boolean;
  districtAlerts: boolean;
}

/**
 * Comment document (supports nested replies via parentCommentId).
 */
export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  body: string;
  /** null for top-level comments; set to parent comment ID for replies */
  parentCommentId: string | null;
  createdAt: Date;
  likes: number;
  likedBy: string[];
  isFlagged: boolean;
}

/**
 * Petition document linked to a Post.
 */
export interface Petition {
  id: string;
  postId: string;
  title: string;
  description: string;
  goal: number;
  signatories: string[];
  count: number;
  lastMilestoneNotified: number;
  createdAt: Date;
}

/**
 * In-app notification delivered to a user.
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  postId?: string;
  isRead: boolean;
  createdAt: Date;
}

// ─── Helper: Firestore converter utilities ──────────────────────────────────

/**
 * Creates a blank Reactions object (all zeroes).
 */
export function emptyReactions(): Reactions {
  return { anger: 0, sad: 0, solidarity: 0, witness: 0 };
}

/**
 * Creates the default 6-step timeline with nothing completed.
 */
export function defaultTimeline(): TimelineStep[] {
  const steps: TimelineStepId[] = [
    'incident',
    'fir_filed',
    'arrest',
    'trial_started',
    'verdict',
    'enforcement',
  ];
  return steps.map((step) => ({
    step,
    date: null,
    note: '',
    isCompleted: false,
  }));
}
