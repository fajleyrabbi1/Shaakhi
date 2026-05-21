'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPosts, type GetPostsOptions } from '@/lib/firebase/firestore';
import type { Post } from '@/lib/firebase/types';
import type { DocumentSnapshot } from 'firebase/firestore';

interface UsePostsParams {
  categories?: string[];
  district?: string;
  sortBy?: 'score' | 'newest' | 'oldest' | 'most_engagement' | 'days_without_justice';
  limit?: number;
}

/**
 * 'usePosts' hook manages querying and paginating posts in real-time or via cursor-based loading.
 */
export function usePosts(params: UsePostsParams = {}) {
  const { categories, district, sortBy = 'score', limit: limitCount = 10 } = params;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Stringify complex objects for stable effect dependency arrays
  const categoriesStr = categories ? JSON.stringify(categories) : '';

  const fetchPosts = useCallback(async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);

      const parsedCategories = categoriesStr ? (JSON.parse(categoriesStr) as string[]) : undefined;

      const queryOptions: GetPostsOptions = {
        district,
        sortBy,
        limitCount,
        startAfterDoc: isLoadMore ? lastDoc : null
      };

      if (parsedCategories && parsedCategories.length > 0) {
        queryOptions.categories = parsedCategories;
      }

      const result = await getPosts(queryOptions);

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...result.posts]);
      } else {
        setPosts(result.posts);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.posts.length === limitCount);
    } catch (err: unknown) {
      console.error('Error fetching posts in hook:', err);
      const errMsg = err instanceof Error ? err.message : 'পোস্টগুলো লোড করতে সমস্যা হয়েছে।';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [categoriesStr, district, sortBy, limitCount, lastDoc]);

  // Effect to load initial batch when filters change
  useEffect(() => {
    fetchPosts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesStr, district, sortBy, limitCount]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && lastDoc) {
      fetchPosts(true);
    }
  }, [loading, hasMore, lastDoc, fetchPosts]);

  const refresh = useCallback(() => {
    return fetchPosts(false);
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
}
