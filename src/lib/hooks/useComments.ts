'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  increment, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Comment } from '@/lib/firebase/types';
import { fromFirestoreTimestamp } from '@/lib/firebase/firestore';

/**
 * 'useComments' hook connects comments sub-collection to a real-time Firestore stream,
 * allowing instant rendering of comments and nested reply chains.
 */
export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('createdAt', 'asc') // chronological order is usually better for reading conversations
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          createdAt: fromFirestoreTimestamp(data.createdAt)
        } as Comment;
      });
      
      setComments(items);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to comments:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  const addComment = useCallback(async (
    body: string, 
    author: { uid: string; displayName: string; photoURL: string }, 
    parentCommentId: string | null = null
  ) => {
    if (!body.trim() || !postId) return;

    try {
      const commentsRef = collection(db, 'comments');
      await addDoc(commentsRef, {
        postId,
        authorId: author.uid,
        authorName: author.displayName,
        authorPhotoURL: author.photoURL,
        body,
        parentCommentId,
        createdAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        isFlagged: false
      });

      // Update parent post comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: increment(1)
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }, [postId]);

  const toggleLike = useCallback(async (commentId: string, userId: string) => {
    if (!commentId || !userId) return;

    try {
      const commentRef = doc(db, 'comments', commentId);
      const targetComment = comments.find(c => c.id === commentId);
      if (!targetComment) return;

      const isLiked = targetComment.likedBy?.includes(userId);

      if (isLiked) {
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
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  }, [comments]);

  return {
    comments,
    loading,
    addComment,
    toggleLike
  };
}
