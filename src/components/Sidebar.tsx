import { FolderKanban, Target, BookOpen, Archive, Plus } from 'lucide-react';
import { useParaStore } from '../store/useParaStore';
import type { ParaCategory } from '../types';
import { getCategoryName } from '../utils/helpers';

const categories: { id: ParaCategory; icon: any; color: string }[] = [
  { id: 'projects', icon: FolderKanban, color: 'text-blue-600 bg-blue-50' },
  { id: 'areas', icon: Target, color: 'text-green-600 bg-green-50' },
  { id: 'resources', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
  { id: 'archives', icon: Archive, color: 'text-gray-600 bg-gray-50' },
];

export const Sidebar = () => {
  const { activeCategory, setActiveCategory, items, getItemsByCategory } = useParaStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Quick Add Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Quick Add
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {categories.map(({ id, icon: Icon, color }) => {
            const count = getItemsByCategory(id).length;
            const isActive = activeCategory === id;

            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? color : 'bg-gray-100'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex-1 text-left font-medium">
                  {getCategoryName(id)}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p className="font-medium">Total Items: {items.length}</p>
          <p className="mt-1">PARA Method v1.0</p>
        </div>
      </div>
    </aside>
  );
};

// Made with Bob
