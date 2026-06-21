import type { AnyParaItem } from '../types';
import { ProjectCard } from './ProjectCard';
import { MoreVertical, ExternalLink } from 'lucide-react';
import { formatRelativeTime } from '../utils/helpers';

interface ItemCardProps {
  item: AnyParaItem;
  onClick?: () => void;
}

export const ItemCard = ({ item, onClick }: ItemCardProps) => {
  // Use specialized card for projects
  if (item.category === 'projects') {
    return <ProjectCard project={item} onClick={onClick} />;
  }

  // Generic card for other categories
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {item.title}
          </h3>
          {item.category === 'areas' && 'reviewFrequency' in item && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
              Review: {item.reviewFrequency}
            </span>
          )}
          {item.category === 'resources' && 'type' in item && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded capitalize">
              {item.type}
            </span>
          )}
          {item.category === 'archives' && 'originalCategory' in item && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded capitalize">
              From: {item.originalCategory}
            </span>
          )}
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Category-specific content */}
      {item.category === 'areas' && 'standard' in item && item.standard && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs font-medium text-green-900 mb-1">Standard/Goal:</p>
          <p className="text-sm text-green-700">{item.standard}</p>
        </div>
      )}

      {item.category === 'resources' && 'url' in item && item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="truncate">{item.url}</span>
        </a>
      )}

      {item.category === 'archives' && 'archivedReason' in item && item.archivedReason && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-900 mb-1">Archived Reason:</p>
          <p className="text-sm text-gray-700">{item.archivedReason}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>Updated {formatRelativeTime(item.updatedAt)}</span>
        {item.category === 'archives' && 'archivedAt' in item && (
          <span>Archived {formatRelativeTime(item.archivedAt)}</span>
        )}
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-500">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Made with Bob
