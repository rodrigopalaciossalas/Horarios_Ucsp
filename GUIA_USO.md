# 📚 Buscador de Horarios UCSP - Guía de Uso

## Descripción General

Esta es una aplicación web **Progressive Web App (PWA)** que permite consultar horarios de clases, disponibilidad de aulas y información de profesores en la UCSP.

### Stack Tecnológico

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** FastAPI + Pandas
- **Caché & Offline:** Service Worker + TanStack React Query
- **Base de Datos:** CSV (escalable a PostgreSQL)

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js >= 18
- Python >= 3.10
- npm o yarn

### Backend

#### 1. Instalar dependencias

```bash
cd backend
pip install -r requirements.txt
```

#### 2. Ejecutar servidor

```bash
python main.py
```

El backend estará disponible en: **http://localhost:8001**

**Documentación interactiva:** http://localhost:8001/docs (Swagger UI)

---

### Frontend

#### 1. Instalar dependencias

```bash
cd frontend
npm install
```

#### 2. Configurar variables de entorno

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:8001
```

#### 3. Ejecutar servidor de desarrollo

```bash
npm run dev
# o
npx vite
```

El frontend estará disponible en: **http://localhost:5173**

#### 4. Build para producción

```bash
npm run build
npm run preview
```

---

## 🧪 Laboratorio de Pruebas (Test Lab)

Accede a `http://localhost:5173` y hace click en el botón **🧪 Test Lab** para acceder a la interfaz de pruebas donde puedes:

- ✅ Probar cada endpoint de la API
- ✅ Ver respuestas en tiempo real
- ✅ Validar el funcionamiento de todos los servicios

### Endpoints Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/profesores/{nombre}` | GET | Horarios de un profesor |
| `/profesores/{nombre}/dias/{dia}` | GET | Horarios de profesor por día |
| `/profesores/{nombre}/tipo/{tipo}` | GET | Horarios de profesor por tipo (Presencial/Virtual) |
| `/cursos/{curso}` | GET | Horarios de un curso |
| `/cursos/{curso}/dias/{dia}` | GET | Horarios de curso por día |
| `/cursos/{curso}/tipo/{tipo}` | GET | Horarios de curso por tipo |
| `/aulas/{numero}` | GET | Horarios de una aula |
| `/aulas/{numero}/dias/{dia}` | GET | Horarios de aula por día |
| `/aulas/{numero}/tipo/{tipo}` | GET | Horarios de aula por tipo |
| `/aulas_libres/dia/{dia}/hora/{hora}` | GET | Aulas disponibles en una fecha y hora |

---

## 📱 Características PWA

La aplicación funciona como una PWA completa:

- ✅ **Instalable:** Guarda la app en el escritorio o pantalla de inicio
- ✅ **Offline:** Utiliza cache inteligente para funcionar sin conexión
- ✅ **Fast:** Carga rápida con precarga de datos
- ✅ **Responsive:** Funciona en cualquier dispositivo

### Instalar PWA

1. Abre la app en tu navegador (Chrome, Edge, Firefox, Safari)
2. Haz click en el menú (⋮) → "Instalar aplicación"
3. O usa el botón de instalación que aparece en la barra de direcciones

---

## 🔍 Usando la Aplicación

### Búsqueda por Profesor

1. Selecciona **👨‍🏫 Profesor**
2. Ingresa el nombre (ej: "Carlos", "Gina", "María")
3. Presiona Enter o click en "Buscar"
4. Ver todos los horarios del profesor

### Búsqueda por Curso

1. Selecciona **📚 Curso**
2. Ingresa el nombre del curso (ej: "Matemáticas", "Física", "Programación")
3. Presiona Enter o click en "Buscar"
4. Ver todos los horarios donde se dicta el curso

### Búsqueda por Aula

1. Selecciona **🏫 Aula**
2. Ingresa el número/código de aula (ej: "N06", "A101", "B205")
3. Presiona Enter o click en "Buscar"
4. Ver el horario completo de esa aula

### Aulas Libres

1. Selecciona **✅ Aulas Libres**
2. Ingresa el día (ej: "Lunes", "Martes") y hora (ej: "10:00", "14:30")
3. Presiona Enter o click en "Buscar"
4. Ver todas las aulas disponibles en ese horario

---

## 📊 Estructura de Respuestas

### Horarios

```json
{
  "profesor": "Carlos Rubianes",
  "total_horarios": 5,
  "horarios": [
    {
      "PROFESOR": "Carlos Rubianes",
      "DIA": "Lunes",
      "INICIO": "5:30 pm",
      "FIN": "7:00 pm",
      "CURSO": "Legislación Laboral",
      "GRUPO": "CONT3-1",
      "SUBGRUPO": "",
      "AMBIENTE": "N06",
      "TIPO DICTADO": "Presencial"
    }
  ]
}
```

### Aulas Libres

```json
{
  "dia": "Lunes",
  "hora_actual": "10:00",
  "aulas_libres": [
    {
      "aula": "N06",
      "siguiente_profesor": "Dr. García",
      "curso": "Matemáticas",
      "siguiente_inicio": "11:00",
      "en_minutos": 60
    }
  ]
}
```

---

## 🛠️ Desarrollo

### Estructura del Proyecto

```
Horarios_Ucsp/
├── backend/
│   ├── main.py              # Aplicación FastAPI
│   ├── requirements.txt      # Dependencias Python
│   └── app/
│       ├── routers/          # Endpoints de API
│       ├── services/         # Servicios de negocio
│       └── utils.py          # Utilidades
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # Servicios API
│   │   └── App.tsx           # Componente principal
│   ├── package.json
│   └── vite.config.ts
└── data/
    └── horarios_2025_2.csv   # Base de datos
```

### Scripts Disponibles

#### Backend

```bash
# Ejecutar servidor
python main.py

# Con hot reload
python -m uvicorn backend.main:app --reload
```

#### Frontend

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview de producción
npm run preview

# Linter
npm run lint
```

---

## 🐛 Troubleshooting

### El frontend no conecta con el backend

1. Verifica que el backend esté corriendo en `http://localhost:8001`
2. Revisa la consola del navegador (F12) para ver errores CORS
3. Asegúrate de que la variable de entorno `VITE_API_URL` está bien configurada

### El servicio worker no funciona

1. Abre DevTools (F12) → Application → Service Workers
2. Verifica que el SW está registrado
3. Limpia el cache y recarga la página

### Errores de módulos no encontrados

```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Notas de Desarrollo

- El CSV se carga en memoria al iniciar el backend
- Las búsquedas son case-insensitive
- Se soportan búsquedas parciales (ej: "mat" encuentra "Matemáticas")
- Los datos se cachean en el frontend para mejor rendimiento

---

## 🚀 Próximas Mejoras

- [ ] Integración con BD PostgreSQL
- [ ] Autenticación OAuth con Google
- [ ] Notificaciones de cambios de horario
- [ ] Calendario integrado
- [ ] Sincronización en tiempo real
- [ ] Búsqueda avanzada con filtros
- [ ] Exportar horarios (PDF/iCal)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

## 👥 Autor

Desarrollado para UCSP - Buscador de Horarios 🎓

**Versión:** 1.0
**Última actualización:** 13 de Noviembre de 2025
