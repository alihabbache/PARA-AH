import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';
import type { AnyParaItem, Project, Area, Resource, Archive, ParaCategory } from '../types';

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch {
    return dateString;
  }
};

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
};

/**
 * Check if a deadline is overdue
 */
export const isOverdue = (deadline: string): boolean => {
  try {
    return isBefore(parseISO(deadline), new Date());
  } catch {
    return false;
  }
};

/**
 * Check if a deadline is coming soon (within 7 days)
 */
export const isComingSoon = (deadline: string): boolean => {
  try {
    const deadlineDate = parseISO(deadline);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return isAfter(deadlineDate, new Date()) && isBefore(deadlineDate, sevenDaysFromNow);
  } catch {
    return false;
  }
};

/**
 * Get color class for priority
 */
export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: 'text-gray-600 bg-gray-100',
    medium: 'text-blue-600 bg-blue-100',
    high: 'text-orange-600 bg-orange-100',
    urgent: 'text-red-600 bg-red-100',
  };
  return colors[priority] || colors.low;
};

/**
 * Get color class for status
 */
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'text-green-600 bg-green-100',
    'on-hold': 'text-yellow-600 bg-yellow-100',
    completed: 'text-gray-600 bg-gray-100',
  };
  return colors[status] || colors.active;
};

/**
 * Get category display name
 */
export const getCategoryName = (category: ParaCategory): string => {
  const names: Record<ParaCategory, string> = {
    projects: 'Projects',
    areas: 'Areas',
    resources: 'Resources',
    archives: 'Archives',
  };
  return names[category];
};

/**
 * Get category description
 */
export const getCategoryDescription = (category: ParaCategory): string => {
  const descriptions: Record<ParaCategory, string> = {
    projects: 'Short-term efforts with specific goals and deadlines',
    areas: 'Long-term responsibilities you want to maintain',
    resources: 'Topics or interests that may be useful in the future',
    archives: 'Inactive items from other categories',
  };
  return descriptions[category];
};

/**
 * Calculate project progress based on completed milestones
 */
export const calculateProgress = (project: Project): number => {
  if (!project.milestones || project.milestones.length === 0) {
    return project.progress || 0;
  }
  const completed = project.milestones.filter((m) => m.completed).length;
  return Math.round((completed / project.milestones.length) * 100);
};

/**
 * Extract unique tags from items
 */
export const extractUniqueTags = (items: AnyParaItem[]): string[] => {
  const tags = new Set<string>();
  items.forEach((item) => {
    item.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};

/**
 * Download data as JSON file
 */
export const downloadJSON = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Read JSON file
 */
export const readJSONFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

/**
 * Validate PARA item structure
 */
export const isValidParaItem = (item: any): item is AnyParaItem => {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    ['projects', 'areas', 'resources', 'archives'].includes(item.category) &&
    Array.isArray(item.tags) &&
    typeof item.createdAt === 'string' &&
    typeof item.updatedAt === 'string'
  );
};

// Made with Bob
