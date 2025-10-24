// services/searchService.js
import fuzzysort from 'fuzzysort';

export function buscarProfesor(query, profesores) {
  const tokens = query.toLowerCase().split(" ");

  const resultados = profesores.map(profesor => {
    const nombre = profesor.PROFESOR.toLowerCase();

    // Calculamos similitud con cada token
    let score = 0;
    tokens.forEach(token => {
      const result = fuzzysort.single(token, nombre);
      if (result) score += result.score;
    });

    return { profesor: profesor.PROFESOR, score, horarios: profesor.horarios };
  });

  // Ordenamos por score (mejor primero)
  resultados.sort((a, b) => b.score - a.score);

  return resultados;
}
