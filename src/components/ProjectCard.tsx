import { Calendar, Clock, TrendingUp, MoreVertical } from 'lucide-react';
import type { Project } from '../types';
import { formatDate, getPriorityColor, getStatusColor, isOverdue, isComingSoon, calculateProgress } from '../utils/helpers';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const progress = calculateProgress(project);
  const hasDeadline = !!project.deadline;
  const overdue = hasDeadline && isOverdue(project.deadline!);
  const comingSoon = hasDeadline && isComingSoon(project.deadline!);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Progress
          </span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        {hasDeadline ? (
          <div className={`flex items-center gap-1 ${overdue ? 'text-red-600' : comingSoon ? 'text-orange-600' : ''}`}>
            <Calendar className="w-3 h-3" />
            <span>{formatDate(project.deadline!)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>No deadline</span>
          </div>
        )}
        {project.milestones.length > 0 && (
          <span>
            {project.milestones.filter(m => m.completed).length}/{project.milestones.length} milestones
          </span>
        )}
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Made with Bob
