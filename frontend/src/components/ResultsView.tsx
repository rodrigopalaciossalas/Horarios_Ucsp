import type { ScheduleEntry } from '../services/api';

interface ResultsViewProps {
  data: ScheduleEntry[];
  loading: boolean;
  error: Error | null;
  title?: string;
}

const formatTime = (time: string) => time || 'N/A';

const getDayColor = (day: string) => {
  const colors: Record<string, string> = {
    'Lunes': 'bg-blue-100 dark:bg-blue-900',
    'Martes': 'bg-green-100 dark:bg-green-900',
    'Miércoles': 'bg-yellow-100 dark:bg-yellow-900',
    'Jueves': 'bg-purple-100 dark:bg-purple-900',
    'Viernes': 'bg-pink-100 dark:bg-pink-900',
    'Sábado': 'bg-orange-100 dark:bg-orange-900',
  };
  return colors[day] || 'bg-gray-100 dark:bg-gray-800';
};

export const ResultsView = ({ data, loading, error, title }: ResultsViewProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-lg p-6 text-red-800 dark:text-red-100">
        <h3 className="font-bold text-lg mb-2">❌ Error</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No se encontraron resultados. Intenta con otro término de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Día</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Hora</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Profesor</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Curso</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Aula</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Tipo</th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Grupo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    getDayColor(entry.DIA)
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {entry.DIA}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {formatTime(entry.INICIO)} - {formatTime(entry.FIN)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {entry.PROFESOR || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {entry.CURSO || 'N/A'}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                    {entry.AMBIENTE || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {entry['TIPO DICTADO'] || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {entry.GRUPO || '-'} {entry.SUBGRUPO && `/ ${entry.SUBGRUPO}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
        <p className="text-blue-800 dark:text-blue-100">
          <strong>Total de resultados:</strong> {data.length}
        </p>
      </div>
    </div>
  );
};
