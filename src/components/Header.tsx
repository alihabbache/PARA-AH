import { Search, Download, Upload, Settings } from 'lucide-react';
import { useParaStore } from '../store/useParaStore';
import { downloadJSON, readJSONFile } from '../utils/helpers';

export const Header = () => {
  const { searchQuery, setSearchQuery, exportData, importData } = useParaStore();

  const handleExport = () => {
    const data = exportData();
    const filename = `para-export-${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(data, filename);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const content = await readJSONFile(file);
        importData(content);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">PARA App</h1>
            <span className="ml-3 text-sm text-gray-500">
              Organize your life with the PARA method
            </span>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
            </div>

            {/* Export */}
            <button
              onClick={handleExport}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Export data"
            >
              <Download className="w-5 h-5" />
            </button>

            {/* Import */}
            <label className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            {/* Settings (placeholder) */}
            <button
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Made with Bob
