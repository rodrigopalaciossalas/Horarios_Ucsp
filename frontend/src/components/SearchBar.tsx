import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, type: 'profesor' | 'curso' | 'aula' | 'aulas_libres') => void;
  loading?: boolean;
}

export const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'profesor' | 'curso' | 'aula' | 'aulas_libres'>('profesor');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          🎓 Buscador de Horarios UCSP
        </h1>

        <div className="flex gap-2 mb-4">
          {(['profesor', 'curso', 'aula', 'aulas_libres'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSearchType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {type === 'profesor' && '👨‍🏫 Profesor'}
              {type === 'curso' && '📚 Curso'}
              {type === 'aula' && '🏫 Aula'}
              {type === 'aulas_libres' && '✅ Aulas Libres'}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Buscar ${searchType}...`}
            className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? '🔄 Buscando...' : '🔍 Buscar'}
          </button>
        </div>
      </div>
    </div>
  );
};
