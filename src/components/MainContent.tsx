import { useParaStore } from '../store/useParaStore';
import { getCategoryName, getCategoryDescription } from '../utils/helpers';
import { Grid3x3, List, LayoutGrid } from 'lucide-react';
import type { ViewMode } from '../types';

export const MainContent = () => {
  const { activeCategory, viewMode, setViewMode, getFilteredItems } = useParaStore();
  const items = getFilteredItems();

  const viewModes: { id: ViewMode; icon: any; label: string }[] = [
    { id: 'grid', icon: Grid3x3, label: 'Grid' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
  ];

  return (
    <main className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {getCategoryName(activeCategory)}
            </h2>
            
            {/* View Mode Selector */}
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              {viewModes.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`p-2 rounded transition-colors ${
                    viewMode === id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
          <p className="text-gray-600">{getCategoryDescription(activeCategory)}</p>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Grid3x3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first {activeCategory.slice(0, -1)}
            </p>
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Add {activeCategory.slice(0, -1).charAt(0).toUpperCase() + activeCategory.slice(1, -1)}
            </button>
          </div>
        ) : (
          <div className={`
            ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
            ${viewMode === 'list' ? 'space-y-4' : ''}
            ${viewMode === 'kanban' ? 'flex gap-6 overflow-x-auto' : ''}
          `}>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

// Made with Bob
