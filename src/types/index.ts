// PARA Categories
export type ParaCategory = 'projects' | 'areas' | 'resources' | 'archives';

// Status for Projects
export type ProjectStatus = 'active' | 'on-hold' | 'completed';

// Priority levels
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Base interface for all PARA items
export interface ParaItem {
  id: string;
  title: string;
  description: string;
  category: ParaCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Project - Short-term efforts with specific goals and deadlines
export interface Project extends ParaItem {
  category: 'projects';
  status: ProjectStatus;
  deadline?: string;
  priority: Priority;
  progress: number; // 0-100
  milestones: Milestone[];
}

// Milestone for projects
export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

// Area - Long-term responsibilities to maintain
export interface Area extends ParaItem {
  category: 'areas';
  standard: string; // The standard or goal to maintain
  reviewFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastReviewed?: string;
}

// Resource - Topics or interests for future reference
export interface Resource extends ParaItem {
  category: 'resources';
  type: 'article' | 'book' | 'video' | 'course' | 'tool' | 'other';
  url?: string;
  notes: string;
}

// Archive - Inactive items from other categories
export interface Archive extends ParaItem {
  category: 'archives';
  originalCategory: Exclude<ParaCategory, 'archives'>;
  archivedAt: string;
  archivedReason?: string;
}

// Union type for all PARA items
export type AnyParaItem = Project | Area | Resource | Archive;

// Filter and search options
export interface FilterOptions {
  category?: ParaCategory;
  tags?: string[];
  priority?: Priority;
  status?: ProjectStatus;
  searchQuery?: string;
}

// Sort options
export type SortBy = 'createdAt' | 'updatedAt' | 'title' | 'priority' | 'deadline';
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

// View modes
export type ViewMode = 'grid' | 'list' | 'kanban';

// Export/Import data structure
export interface ExportData {
  version: string;
  exportedAt: string;
  items: AnyParaItem[];
}

// Made with Bob
