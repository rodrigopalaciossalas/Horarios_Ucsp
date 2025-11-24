import { useState } from 'react';
import { useProfesor, useCurso, useAula, useAulasLibres } from '../hooks/useApi';
import { ResultsView } from './ResultsView';
import { AulasLibresView } from './AulasLibresView';

export const TestLab = () => {
  // Profesor
  const [profesorName, setProfesorName] = useState('');
  const [profesorSearched, setProfesorSearched] = useState('');
  const { data: profesorData, isLoading: profesorLoading, error: profesorError } = useProfesor(profesorSearched);

  // Curso
  const [cursoName, setCursoName] = useState('');
  const [cursoSearched, setCursoSearched] = useState('');
  const { data: cursoData, isLoading: cursoLoading, error: cursoError } = useCurso(cursoSearched);

  // Aula
  const [aulaNumber, setAulaNumber] = useState('');
  const [aulaSearched, setAulaSearched] = useState('');
  const { data: aulaData, isLoading: aulaLoading, error: aulaError } = useAula(aulaSearched);

  // Aulas Libres
  const [aulasLibresDia, setAulasLibresDia] = useState('');
  const [aulasLibresHora, setAulasLibresHora] = useState('');
  const [aulasLibresSearched, setAulasLibresSearched] = useState(false);
  const { data: aulasLibresData, isLoading: aulasLibresLoading, error: aulasLibresError } = useAulasLibres(
    aulasLibresSearched ? aulasLibresDia : '',
    aulasLibresSearched ? aulasLibresHora : ''
  );

  const handleProfesorSearch = () => {
    if (profesorName.trim()) setProfesorSearched(profesorName);
  };

  const handleCursoSearch = () => {
    if (cursoName.trim()) setCursoSearched(cursoName);
  };

  const handleAulaSearch = () => {
    if (aulaNumber.trim()) setAulaSearched(aulaNumber);
  };

  const handleAulasLibresSearch = () => {
    if (aulasLibresDia.trim() && aulasLibresHora.trim()) {
      setAulasLibresSearched(true);
    }
  };

  const testEndpoints = [
    { name: 'Profesor', endpoint: '/profesores/{nombre}', method: 'GET' },
    { name: 'Profesor por Día', endpoint: '/profesores/{nombre}/dias/{dia}', method: 'GET' },
    { name: 'Profesor por Tipo', endpoint: '/profesores/{nombre}/tipo/{tipo}', method: 'GET' },
    { name: 'Curso', endpoint: '/cursos/{curso}', method: 'GET' },
    { name: 'Curso por Día', endpoint: '/cursos/{curso}/dias/{dia}', method: 'GET' },
    { name: 'Curso por Tipo', endpoint: '/cursos/{curso}/tipo/{tipo}', method: 'GET' },
    { name: 'Aula', endpoint: '/aulas/{numero}', method: 'GET' },
    { name: 'Aula por Día', endpoint: '/aulas/{numero}/dias/{dia}', method: 'GET' },
    { name: 'Aula por Tipo', endpoint: '/aulas/{numero}/tipo/{tipo}', method: 'GET' },
    { name: 'Aulas Libres', endpoint: '/aulas_libres/dia/{dia}/hora/{hora}', method: 'GET' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          🧪 Laboratorio de Pruebas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Prueba todos los endpoints de la API aquí
        </p>

        {/* Endpoints Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📡 Endpoints disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testEndpoints.map((endpoint, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                <p className="font-bold text-gray-900 dark:text-white">{endpoint.name}</p>
                <code className="text-sm text-blue-600 dark:text-blue-400 break-all">{endpoint.endpoint}</code>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded ml-2">
                  {endpoint.method}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profesor Test */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">👨‍🏫 Test: Profesor</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={profesorName}
                onChange={(e) => setProfesorName(e.target.value)}
                placeholder="Ej: Carlos, Gina, etc."
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleProfesorSearch}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
              >
                Buscar Profesor
              </button>
            </div>
            {profesorData && (
              <div className="mt-4">
                <ResultsView data={profesorData || []} loading={profesorLoading} error={profesorError} />
              </div>
            )}
          </div>

          {/* Curso Test */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📚 Test: Curso</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={cursoName}
                onChange={(e) => setCursoName(e.target.value)}
                placeholder="Ej: Matemáticas, Física, etc."
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleCursoSearch}
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium"
              >
                Buscar Curso
              </button>
            </div>
            {cursoData && (
              <div className="mt-4">
                <ResultsView data={cursoData || []} loading={cursoLoading} error={cursoError} />
              </div>
            )}
          </div>

          {/* Aula Test */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🏫 Test: Aula</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={aulaNumber}
                onChange={(e) => setAulaNumber(e.target.value)}
                placeholder="Ej: N06, A101, etc."
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAulaSearch}
                className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium"
              >
                Buscar Aula
              </button>
            </div>
            {aulaData && (
              <div className="mt-4">
                <ResultsView data={aulaData || []} loading={aulaLoading} error={aulaError} />
              </div>
            )}
          </div>

          {/* Aulas Libres Test */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">✅ Test: Aulas Libres</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={aulasLibresDia}
                onChange={(e) => setAulasLibresDia(e.target.value)}
                placeholder="Ej: Lunes, Martes, etc."
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={aulasLibresHora}
                onChange={(e) => setAulasLibresHora(e.target.value)}
                placeholder="Ej: 10:00, 14:30, etc."
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAulasLibresSearch}
                className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium"
              >
                Buscar Aulas Libres
              </button>
            </div>
            {aulasLibresSearched && (
              <div className="mt-4">
                <AulasLibresView
                  data={aulasLibresData || []}
                  loading={aulasLibresLoading}
                  error={aulasLibresError}
                  dia={aulasLibresDia}
                  hora={aulasLibresHora}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
