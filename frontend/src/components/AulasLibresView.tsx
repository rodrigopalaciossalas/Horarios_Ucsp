import type { AulaLibre } from '../services/api';

interface AulasLibresViewProps {
  data: AulaLibre[];
  loading: boolean;
  error: Error | null;
  dia?: string;
  hora?: string;
}

export const AulasLibresView = ({ data, loading, error, dia, hora }: AulasLibresViewProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando aulas libres...</p>
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
          No hay aulas libres en este horario.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          ✅ Aulas Libres
        </h2>
        {dia && hora && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Día:</strong> {dia} | <strong>Hora:</strong> {hora}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((aula, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 border-2 border-green-400 dark:border-green-600 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                {aula.aula}
              </div>

              {aula.estado ? (
                <div className="text-sm text-green-700 dark:text-green-300 font-semibold">
                  {aula.estado}
                </div>
              ) : (
                <div className="text-xs space-y-1">
                  <div>
                    <strong className="text-gray-700 dark:text-gray-300">Próxima clase:</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      {aula.siguiente_profesor || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-700 dark:text-gray-300">Curso:</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      {aula.curso || 'N/A'}
                    </p>
                  </div>
                  {aula.en_minutos !== undefined && aula.en_minutos !== null && (
                    <div>
                      <strong className="text-gray-700 dark:text-gray-300">En:</strong>
                      <p className="text-blue-600 dark:text-blue-400 font-bold">
                        {aula.en_minutos} minutos
                      </p>
                    </div>
                  )}
                  <div>
                    <strong className="text-gray-700 dark:text-gray-300">Inicio:</strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      {aula.siguiente_inicio || 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4">
        <p className="text-green-800 dark:text-green-100">
          <strong>Aulas disponibles:</strong> {data.length}
        </p>
      </div>
    </div>
  );
};
