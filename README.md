# Esquema: Buscador de horarios - UCSP

**Descripción corta**
Aplicación web para consultar dónde y cuándo dictan clases los profesores de la universidad a partir de un CSV con la estructura (ejemplo real):

```
"PROFESOR","DIA","INICIO","FIN","CURSO","GRUPO","SUBGRUPO","AMBIENTE","TIPO DICTADO"

"Abarca Rubianes Carlos Rodrigo","Martes","5:30 pm","7:00 pm","Legislación Laboral","CONT3-1","","N06","Presencial"
```

Se debe permitir búsquedas por **profesor**, **curso** y **aula**, además de detectar consultas "humanas" (ej.: "profe gina", "discretas 2", "aula N06 martes 5:30").

---

## Objetivos

* Proveer una API REST que responda consultas desde un frontend.
* Búsqueda tolerante a errores (fuzzy search) para `PROFESOR` y `CURSO`.
* Validación de usuarios con correo institucional `@ucsp.edu.pe`.
* Mostrar disponibilidad de aulas y profesores por franjas horarias.

---

## Stack recomendado (prototipo)

* **Frontend:** React (Vite) + Tailwind (rápido para prototipado).
* **Backend:** FastAPI (fácil, documentación automática).
* **Procesamiento CSV:** pandas.
* **Búsqueda difusa:** RapidFuzz.
* **Autenticación:** Google OAuth (restringir dominio `ucsp.edu.pe`) — fallback: validar `endswith('@ucsp.edu.pe')`.
* **DB (futuro):** PostgreSQL (si migras desde CSV).

---

## Estructura sugerida de carpetas

```
project-root/
  ├─ backend/
  │   ├─ main.py
  │   ├─ requirements.txt
  │   ├─ app/ (módulos)
  │   └─ data/horarios.csv
  ├─ frontend/
  │   ├─ package.json
  │   └─ src/
  ├─ docs/
  └─ README.md
```

---

## Modelo de datos (mapeo CSV → entidad)

* Profesor: `PROFESOR` (string, ej. *Abarca Rubianes Carlos Rodrigo*)
* Sesión/clase: {`DIA`, `INICIO`, `FIN`, `CURSO`, `GRUPO`, `SUBGRUPO`, `AMBIENTE`, `TIPO DICTADO`}
* Aula/ambiente: `AMBIENTE` (ej. *N06*)

> Nota: al migrar a BD, separa tablas: `profesores`, `cursos`, `sesiones`, `aulas`.

---

## API (endpoints propuestos)

* `GET /profesor?nombre=<q>` → lista de horarios del/los profesor(es) que más coinciden.
* `GET /curso?nombre=<q>` → lista de profesores y horarios para ese curso.
* `GET /aula?nombre=<amb>&dia=<DIA>&hora=<HH:MM>` → indica libre/ocupada.
* `GET /aulas_libres?dia=<DIA>&hora=<HH:MM>` → lista de aulas libres.
* `POST /admin/upload` → subir CSV (endpoint protegido para admin).

Cada endpoint devuelve JSON con estructura clara (ver ejemplo dentro del documento).

---

## Lógica de búsqueda e inferencia (intenciones básicas)

1. **Normalización:** pasar a minúsculas, eliminar tildes, trim.
2. **Detección de intención por heurística** (orden sugerido):

   * Si el input contiene la palabra `aula` o patrón `N\\d+` → intent `aula`.
   * Si contiene palabras como `profe`, `profesor`, o se ve como nombre (varias palabras con mayúsculas) → intent `profesor`.
   * Si contiene número de curso (`2`, `II`, `3-1`, etc.) o palabras típicas de cursos → intent `curso`.
   * Si no está claro → buscar en `PROFESOR` y `CURSO` con fuzzy y devolver coincidencias ordenadas.
3. **Búsqueda difusa:** usar RapidFuzz sobre las listas únicas de `PROFESOR` y `CURSO` y devolver top-N (ej. top 5) con umbral (p.ej. score >= 65).
4. **Post-procesado:** al elegir coincidencias, devolver las filas del CSV relacionadas (agrupadas por profesor/curso).

---

## Ejemplo de backend (FastAPI) — idea principal

> En el documento incluyo un ejemplo funcional de `main.py` que lee el CSV al inicio, normaliza columnas y expone `/profesor` y `/curso`. (Código dentro del documento.)

---

## Frontend — componentes clave

* `Login` (OAuth o validación email institucional)
* `SearchBar` (input con autocompletado + detección de intención)
* `ResultsList` (muestra tarjetas o tabla según tipo: profesor/curso/aula)
* `ProfessorDetail` (tabla con días y horas)
* `CourseDetail` (lista de grupos/profesores)
* `Map/Aulas` (opcional: mostrar ambientes en SVG — ya mencionaste que tienes nombres en el SVG)
* `Admin` (subir CSV, refrescar dataset)

---

## Validación de correo institucional

* **Producción:** Google OAuth con `hd=ucsp.edu.pe` y validación en backend del dominio del correo.
* **Prototipo:** hacer login simple (email + contraseña dummy) y validar `email.endswith("@ucsp.edu.pe")`.

---

## Despliegue sugerido

* Frontend: Vercel / Netlify.
* Backend: Render / Railway / Heroku (soporta FastAPI).
* Si usas Docker: crea `Dockerfile` para backend y despliega en cualquier servicio con contenedor.

---

## Checklist — PRIMEROS PASOS (inmediatos, lo que debes hacer ahora)

1. Crear repositorio (GitHub/GitLab) y estructura de carpetas (ver arriba).
2. Subir el CSV a `backend/data/horarios.csv` (usa la estructura exacta que has mostrado).
3. Crear un entorno virtual en `backend/` e instalar dependencias:

   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\\Scripts\\activate
   pip install fastapi uvicorn pandas rapidfuzz python-dotenv
   ```
4. Añadir `requirements.txt` con las dependencias.
5. Crear `backend/main.py` con la plantilla (el ejemplo está en este documento).
6. Ejecutar localmente:

   ```bash
   uvicorn main:app --reload
   ```
7. Probar endpoints con `curl` o Postman:

   ```bash
   curl "http://127.0.0.1:8000/profesor?nombre=abarcA"
   curl "http://127.0.0.1:8000/curso?nombre=legislacion laboral"
   ```
8. Empezar el frontend: crear app con Vite + React y un `SearchBar` que consuma la API.

---

## Consideraciones y próximos pasos funcionales

* Migrar CSV a base de datos cuando el dataset crezca (Postgres).
* Añadir cache en backend (si consultas son costosas).
* Crear panel admin para subir CSV y versionado de horarios.
* Añadir tests unitarios para endpoints.

---

## Riesgos y mitigaciones

* **CSV mal formateado:** crear validaciones al subir (formato de columnas y tipos de tiempo).
* **Ambigüedad en nombres/cursos:** usar fuzzy + mostrar top coincidencias para que el usuario elija.
* **Autenticación incompleta:** prototipo con validación de dominio, producción con OAuth.

---

## Al final del documento: "Qué haré si quieres que empiece ahora"

Incluyo además un bloque listo para copiar/pegar del `main.py` mínimo (FastAPI) que implementa `/profesor`, `/curso` y `/aulas_libres` usando pandas + rapidfuzz. También dejo ejemplos de respuestas JSON y `curl` para probar.
