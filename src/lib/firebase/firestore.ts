import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  increment,
  arrayUnion,
  arrayRemove,
  writeBatch,
  Timestamp,
  serverTimestamp,
  type DocumentSnapshot,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';
import type { 
  Post, 
  User, 
  Comment, 
  Petition, 
  Notification, 
  PostStatus, 
  ReactionKey
} from './types';
import { emptyReactions, defaultTimeline } from './types';

// ─── Helpers: Timestamp Converters ─────────────────────────────────────────

export function toFirestoreTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

export function fromFirestoreTimestamp(timestamp: unknown): Date {
  if (!timestamp) return new Date();
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  const ts = timestamp as { seconds?: number; nanoseconds?: number };
  if (ts.seconds !== undefined) {
    return new Timestamp(ts.seconds, ts.nanoseconds || 0).toDate();
  }
  return new Date(timestamp as string | number);
}

// Convert Firestore doc snapshot to Post interface safely
function convertDocToPost(snap: QueryDocumentSnapshot | DocumentSnapshot): Post {
  const data = snap.data();
  if (!data) throw new Error('Document does not exist');
  return {
    ...data,
    id: snap.id,
    dateOfIncident: fromFirestoreTimestamp(data.dateOfIncident),
    createdAt: fromFirestoreTimestamp(data.createdAt),
    updatedAt: fromFirestoreTimestamp(data.updatedAt),
    timeline: (data.timeline || []).map((step: { step: string; date: unknown; note: string; isCompleted: boolean }) => ({
      ...step,
      date: step.date ? fromFirestoreTimestamp(step.date) : null
    }))
  } as unknown as Post;
}

// ─── Posts CRUD ─────────────────────────────────────────────────────────────

export async function createPost(
  postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'score' | 'daysWithoutJustice' | 'commentCount' | 'shareCount' | 'signatureCount' | 'reactions' | 'timeline' | 'isPinned' | 'isFlagged'>
): Promise<string> {
  const postsRef = collection(db, 'posts');
  
  const docRef = await addDoc(postsRef, {
    ...postData,
    dateOfIncident: Timestamp.fromDate(new Date(postData.dateOfIncident)),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    score: 0,
    daysWithoutJustice: 0,
    commentCount: 0,
    shareCount: 0,
    signatureCount: 0,
    reactions: emptyReactions(),
    timeline: defaultTimeline(),
    isPinned: false,
    isFlagged: false
  });

  return docRef.id;
}

export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, 'posts', id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return convertDocToPost(snap);
}

export async function updatePost(id: string, data: Partial<Post>): Promise<void> {
  const docRef = doc(db, 'posts', id);
  const updateData: Record<string, unknown> = { ...data, updatedAt: serverTimestamp() };
  
  if (data.dateOfIncident) {
    updateData.dateOfIncident = Timestamp.fromDate(new Date(data.dateOfIncident));
  }
  
  if (data.timeline) {
    updateData.timeline = data.timeline.map((step) => ({
      ...step,
      date: step.date ? Timestamp.fromDate(new Date(step.date)) : null
    }));
  }

  await updateDoc(docRef, updateData);
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', id));
}

export interface GetPostsOptions {
  categories?: string[];
  district?: string;
  status?: PostStatus;
  sortBy?: 'score' | 'newest' | 'oldest' | 'most_engagement' | 'days_without_justice';
  limitCount?: number;
  startAfterDoc?: DocumentSnapshot | null;
}

export async function getPosts(options: GetPostsOptions = {}): Promise<{ posts: Post[]; lastDoc: DocumentSnapshot | null }> {
  const { categories, district, status, sortBy = 'score', limitCount = 10, startAfterDoc } = options;
  const postsRef = collection(db, 'posts');
  
  let q = query(postsRef);

  if (categories && categories.length > 0) {
    q = query(q, where('category', 'in', categories));
  }

  if (district) {
    q = query(q, where('district', '==', district));
  }

  if (status) {
    q = query(q, where('status', '==', status));
  }

  // Handle sorting and dynamic query constraints
  if (sortBy === 'newest') {
    q = query(q, orderBy('createdAt', 'desc'));
  } else if (sortBy === 'oldest') {
    q = query(q, orderBy('createdAt', 'asc'));
  } else if (sortBy === 'most_engagement') {
    q = query(q, orderBy('reactions.anger', 'desc')); // fallback proxy for sorting
  } else if (sortBy === 'days_without_justice') {
    q = query(q, orderBy('daysWithoutJustice', 'desc'));
  } else {
    q = query(q, orderBy('score', 'desc'));
  }

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  q = query(q, limit(limitCount));

  const snap = await getDocs(q);
  const posts = snap.docs.map(convertDocToPost);
  const lastDoc = snap.docs[snap.docs.length - 1] || null;

  return { posts, lastDoc };
}

export async function getPostsByUser(userId: string, limitCount = 10): Promise<Post[]> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('authorId', '==', userId), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(convertDocToPost);
}

export async function toggleReaction(postId: string, userId: string, reactionKey: ReactionKey): Promise<void> {
  const userReactionRef = doc(db, 'posts', postId, 'reactions', userId);
  const postRef = doc(db, 'posts', postId);
  
  const userReactionSnap = await getDoc(userReactionRef);
  
  if (userReactionSnap.exists()) {
    const existing = userReactionSnap.data() as { activeReaction?: string };
    
    if (existing.activeReaction === reactionKey) {
      // User clicked the active reaction again -> remove it
      await deleteDoc(userReactionRef);
      await updateDoc(postRef, {
        [`reactions.${reactionKey}`]: increment(-1)
      });
    } else {
      // User changed their reaction from one type to another
      const prevReaction = existing.activeReaction;
      await updateDoc(userReactionRef, { activeReaction: reactionKey });
      
      const updates: Record<string, unknown> = {
        [`reactions.${reactionKey}`]: increment(1)
      };
      if (prevReaction) {
        updates[`reactions.${prevReaction}`] = increment(-1);
      }
      await updateDoc(postRef, updates);
    }
  } else {
    // New reaction
    await setDoc(userReactionRef, { activeReaction: reactionKey });
    await updateDoc(postRef, {
      [`reactions.${reactionKey}`]: increment(1)
    });
  }
}

export async function updatePostScore(postId: string, score: number): Promise<void> {
  await updateDoc(doc(db, 'posts', postId), { score });
}

// ─── Comments CRUD ──────────────────────────────────────────────────────────

export async function createComment(
  commentData: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'isFlagged'>
): Promise<string> {
  const commentsRef = collection(db, 'comments');
  const docRef = await addDoc(commentsRef, {
    ...commentData,
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
    isFlagged: false
  });

  // Increment comment count on the post
  const postRef = doc(db, 'posts', commentData.postId);
  await updateDoc(postRef, {
    commentCount: increment(1)
  });

  return docRef.id;
}

export async function getComments(postId: string, parentCommentId: string | null = null): Promise<Comment[]> {
  const commentsRef = collection(db, 'comments');
  const q = query(
    commentsRef,
    where('postId', '==', postId),
    where('parentCommentId', '==', parentCommentId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      createdAt: fromFirestoreTimestamp(data.createdAt)
    } as Comment;
  });
}

export async function toggleCommentLike(commentId: string, userId: string): Promise<void> {
  const commentRef = doc(db, 'comments', commentId);
  const commentSnap = await getDoc(commentRef);
  if (!commentSnap.exists()) return;

  const data = commentSnap.data() as Comment;
  const likedBy = data.likedBy || [];
  
  if (likedBy.includes(userId)) {
    await updateDoc(commentRef, {
      likedBy: arrayRemove(userId),
      likes: increment(-1)
    });
  } else {
    await updateDoc(commentRef, {
      likedBy: arrayUnion(userId),
      likes: increment(1)
    });
  }
}

export async function deleteComment(commentId: string, postId: string): Promise<void> {
  await deleteDoc(doc(db, 'comments', commentId));
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    commentCount: increment(-1)
  });
}

// ─── Users CRUD ─────────────────────────────────────────────────────────────

export async function getUser(uid: string): Promise<User | null> {
  const docRef = doc(db, 'users', uid);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  
  const data = snap.data();
  return {
    ...data,
    joinedAt: fromFirestoreTimestamp(data.joinedAt)
  } as User;
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', uid), data);
}

export async function followCase(uid: string, postId: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    followedCases: arrayUnion(postId)
  });
}

export async function unfollowCase(uid: string, postId: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    followedCases: arrayRemove(postId)
  });
}

// ─── Petitions CRUD ─────────────────────────────────────────────────────────

export async function createPetition(
  petitionData: Omit<Petition, 'id' | 'createdAt' | 'count' | 'signatories' | 'lastMilestoneNotified'>
): Promise<string> {
  const petitionsRef = collection(db, 'petitions');
  const docRef = await addDoc(petitionsRef, {
    ...petitionData,
    createdAt: serverTimestamp(),
    count: 0,
    signatories: [],
    lastMilestoneNotified: 0
  });

  return docRef.id;
}

export async function getPetition(id: string): Promise<Petition | null> {
  const docRef = doc(db, 'petitions', id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
    createdAt: fromFirestoreTimestamp(data.createdAt)
  } as Petition;
}

export async function getPetitionByPost(postId: string): Promise<Petition | null> {
  const petitionsRef = collection(db, 'petitions');
  const q = query(petitionsRef, where('postId', '==', postId), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  
  const docSnap = snap.docs[0];
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    createdAt: fromFirestoreTimestamp(data.createdAt)
  } as Petition;
}

export async function signPetition(petitionId: string, userId: string): Promise<void> {
  const petitionRef = doc(db, 'petitions', petitionId);
  
  await updateDoc(petitionRef, {
    signatories: arrayUnion(userId),
    count: increment(1)
  });
}

// ─── Notifications CRUD ─────────────────────────────────────────────────────

export async function createNotification(
  notifData: Omit<Notification, 'id' | 'createdAt' | 'isRead'>
): Promise<string> {
  const notifsRef = collection(db, 'notifications');
  const docRef = await addDoc(notifsRef, {
    ...notifData,
    createdAt: serverTimestamp(),
    isRead: false
  });
  return docRef.id;
}

export async function getNotifications(userId: string, limitCount = 20): Promise<Notification[]> {
  const notifsRef = collection(db, 'notifications');
  const q = query(notifsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      createdAt: fromFirestoreTimestamp(data.createdAt)
    } as Notification;
  });
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await updateDoc(doc(db, 'notifications', notificationId), {
    isRead: true
  });
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  const notifsRef = collection(db, 'notifications');
  const q = query(notifsRef, where('userId', '==', userId), where('isRead', '==', false));
  const snap = await getDocs(q);
  
  if (snap.empty) return;
  
  const batch = writeBatch(db);
  snap.docs.forEach((docSnap) => {
    batch.update(docSnap.ref, { isRead: true });
  });
  
  await batch.commit();
}
