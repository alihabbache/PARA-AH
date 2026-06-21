import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AnyParaItem,
  Project,
  Archive,
  ParaCategory,
  FilterOptions,
  SortOptions,
  ViewMode,
} from '../types';

interface ParaState {
  // Data
  items: AnyParaItem[];
  
  // UI State
  activeCategory: ParaCategory;
  viewMode: ViewMode;
  filterOptions: FilterOptions;
  sortOptions: SortOptions;
  searchQuery: string;
  
  // Actions - CRUD operations
  addItem: (item: AnyParaItem) => void;
  updateItem: (id: string, updates: Partial<AnyParaItem>) => void;
  deleteItem: (id: string) => void;
  archiveItem: (id: string, reason?: string) => void;
  restoreFromArchive: (id: string) => void;
  
  // Actions - UI
  setActiveCategory: (category: ParaCategory) => void;
  setViewMode: (mode: ViewMode) => void;
  setFilterOptions: (options: FilterOptions) => void;
  setSortOptions: (options: SortOptions) => void;
  setSearchQuery: (query: string) => void;
  
  // Actions - Bulk operations
  clearAllFilters: () => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
  
  // Getters
  getFilteredItems: () => AnyParaItem[];
  getItemById: (id: string) => AnyParaItem | undefined;
  getItemsByCategory: (category: ParaCategory) => AnyParaItem[];
}

export const useParaStore = create<ParaState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      activeCategory: 'projects',
      viewMode: 'grid',
      filterOptions: {},
      sortOptions: {
        sortBy: 'updatedAt',
        sortOrder: 'desc',
      },
      searchQuery: '',

      // CRUD Actions
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? ({ ...item, ...updates, updatedAt: new Date().toISOString() } as AnyParaItem)
              : item
          ),
        })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      archiveItem: (id, reason) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item || item.category === 'archives') return state;

          const archivedItem: Archive = {
            ...item,
            category: 'archives',
            originalCategory: item.category as Exclude<ParaCategory, 'archives'>,
            archivedAt: new Date().toISOString(),
            archivedReason: reason,
          };

          return {
            items: state.items.map((i) => (i.id === id ? archivedItem : i)),
          };
        }),

      restoreFromArchive: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item || item.category !== 'archives') return state;

          const archive = item as Archive;
          const restoredItem = {
            ...item,
            category: archive.originalCategory,
          };

          // Remove archive-specific properties
          const { originalCategory, archivedAt, archivedReason, ...rest } = restoredItem as any;

          return {
            items: state.items.map((i) => (i.id === id ? rest : i)),
          };
        }),

      // UI Actions
      setActiveCategory: (category) => set({ activeCategory: category }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setFilterOptions: (options) => set({ filterOptions: options }),
      setSortOptions: (options) => set({ sortOptions: options }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Bulk operations
      clearAllFilters: () =>
        set({
          filterOptions: {},
          searchQuery: '',
        }),

      exportData: () => {
        const state = get();
        const exportData = {
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
          items: state.items,
        };
        return JSON.stringify(exportData, null, 2);
      },

      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          if (data.items && Array.isArray(data.items)) {
            set({ items: data.items });
          }
        } catch (error) {
          console.error('Failed to import data:', error);
        }
      },

      // Getters
      getFilteredItems: () => {
        const state = get();
        let filtered = state.items.filter(
          (item) => item.category === state.activeCategory
        );

        // Apply search query
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.tags.some((tag) => tag.toLowerCase().includes(query))
          );
        }

        // Apply filters
        const { tags, priority, status } = state.filterOptions;

        if (tags && tags.length > 0) {
          filtered = filtered.filter((item) =>
            tags.some((tag) => item.tags.includes(tag))
          );
        }

        if (priority && state.activeCategory === 'projects') {
          filtered = filtered.filter(
            (item) => (item as Project).priority === priority
          );
        }

        if (status && state.activeCategory === 'projects') {
          filtered = filtered.filter(
            (item) => (item as Project).status === status
          );
        }

        // Apply sorting
        const { sortBy, sortOrder } = state.sortOptions;
        filtered.sort((a, b) => {
          let aValue: any = a[sortBy as keyof AnyParaItem];
          let bValue: any = b[sortBy as keyof AnyParaItem];

          // Handle special cases
          if (sortBy === 'priority' && state.activeCategory === 'projects') {
            const priorityOrder = { low: 0, medium: 1, high: 2, urgent: 3 };
            aValue = priorityOrder[(a as Project).priority];
            bValue = priorityOrder[(b as Project).priority];
          }

          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });

        return filtered;
      },

      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      getItemsByCategory: (category) => {
        return get().items.filter((item) => item.category === category);
      },
    }),
    {
      name: 'para-storage',
    }
  )
);

// Made with Bob
