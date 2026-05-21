'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Notification } from '@/lib/firebase/types';
import { fromFirestoreTimestamp } from '@/lib/firebase/firestore';

/**
 * 'useNotifications' hook provides a live subscription to user notifications in Firestore,
 * enabling instantaneous system notices and badge updates.
 */
export function useNotifications(userId: string | null | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          createdAt: fromFirestoreTimestamp(data.createdAt)
        } as Notification;
      });

      setNotifications(items);
      setUnreadCount(items.filter((item) => !item.isRead).length);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to notifications:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!notificationId) return;
    try {
      const docRef = doc(db, 'notifications', notificationId);
      await updateDoc(docRef, { isRead: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId || notifications.length === 0) return;
    
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    if (unreadNotifications.length === 0) return;

    try {
      const batch = writeBatch(db);
      unreadNotifications.forEach((notif) => {
        const docRef = doc(db, 'notifications', notif.id);
        batch.update(docRef, { isRead: true });
      });
      await batch.commit();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [userId, notifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead
  };
}
