'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  doc, 
  onSnapshot, 
  updateDoc, 
  arrayUnion, 
  increment 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Petition } from '@/lib/firebase/types';
import { fromFirestoreTimestamp } from '@/lib/firebase/firestore';

/**
 * 'usePetition' hook enables real-time signature progression tracking and
 * signing actions on cases that contain an active public petition campaign.
 */
export function usePetition(petitionId: string | null | undefined) {
  const [petition, setPetition] = useState<Petition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!petitionId) {
      setPetition(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const docRef = doc(db, 'petitions', petitionId);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPetition({
          ...data,
          id: docSnap.id,
          createdAt: fromFirestoreTimestamp(data.createdAt)
        } as Petition);
      } else {
        setPetition(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error listening to petition:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [petitionId]);

  const sign = useCallback(async (userId: string) => {
    if (!petitionId || !userId) return false;

    try {
      const docRef = doc(db, 'petitions', petitionId);
      await updateDoc(docRef, {
        signatories: arrayUnion(userId),
        count: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error signing petition:', error);
      return false;
    }
  }, [petitionId]);

  const hasSigned = useCallback((userId: string | null | undefined) => {
    if (!userId || !petition || !petition.signatories) return false;
    return petition.signatories.includes(userId);
  }, [petition]);

  return {
    petition,
    loading,
    sign,
    hasSigned
  };
}
