import { create } from 'zustand';

// ─── Types ──────────────────────────────────────────────────────────────────

export type SortBy =
  | 'score'
  | 'newest'
  | 'oldest'
  | 'most_engagement'
  | 'days_without_justice';

interface DateRange {
  from: Date;
  to: Date;
}

// ─── State shape ────────────────────────────────────────────────────────────

interface FeedState {
  /** Active category filters (empty = show all) */
  selectedCategories: string[];
  /** Active district filter (null = all districts) */
  selectedDistrict: string | null;
  /** Date range filter for date of incident */
  dateRange: DateRange | null;
  /** Current sort strategy */
  sortBy: SortBy;
  /** Free-text search query */
  searchQuery: string;
}

interface FeedActions {
  /** Replace the entire selected-categories array */
  setCategories: (categories: string[]) => void;
  /** Toggle a single category in/out of the selection */
  toggleCategory: (categoryId: string) => void;
  /** Set the district filter */
  setDistrict: (district: string | null) => void;
  /** Set the date range filter */
  setDateRange: (range: DateRange | null) => void;
  /** Change the sort strategy */
  setSortBy: (sortBy: SortBy) => void;
  /** Update the search query */
  setSearchQuery: (query: string) => void;
  /** Reset every filter to its default */
  resetFilters: () => void;
}

// ─── Defaults ───────────────────────────────────────────────────────────────

const defaultState: FeedState = {
  selectedCategories: [],
  selectedDistrict: null,
  dateRange: null,
  sortBy: 'score',
  searchQuery: '',
};

// ─── Store ──────────────────────────────────────────────────────────────────

export const useFeedStore = create<FeedState & FeedActions>((set) => ({
  ...defaultState,

  setCategories: (categories) => set({ selectedCategories: categories }),

  toggleCategory: (categoryId) =>
    set((state) => {
      const exists = state.selectedCategories.includes(categoryId);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== categoryId)
          : [...state.selectedCategories, categoryId],
      };
    }),

  setDistrict: (district) => set({ selectedDistrict: district }),

  setDateRange: (range) => set({ dateRange: range }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  resetFilters: () => set(defaultState),
}));
