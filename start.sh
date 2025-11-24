#!/bin/bash

# 🎓 Inicio Rápido - Horarios UCSP

echo "================================"
echo "🎓 Buscador de Horarios UCSP"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Detectar sistema
OS="$(uname -s)"

# Función para abrir navegador
open_browser() {
    if [ "$OS" = "Darwin" ]; then
        open "$1"
    elif [ "$OS" = "Linux" ]; then
        xdg-open "$1" 2>/dev/null &
    elif [ "$OS" = "MINGW64_NT" ] || [ "$OS" = "MSYS_NT" ]; then
        start "$1"
    fi
}

# Iniciar Backend
echo -e "${BLUE}[1/2] Iniciando Backend...${NC}"
cd backend 2>/dev/null || { echo "❌ No se encontró directorio backend"; exit 1; }

# Verificar si hay venv
if [ ! -d "venv" ]; then
    echo "🔧 Instalando dependencias..."
    python -m venv venv
    source venv/bin/activate 2>/dev/null || . venv/Scripts/activate
    pip install -r requirements.txt > /dev/null 2>&1
fi

# Activar venv
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate

# Iniciar servidor en background
python main.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"

# Esperar a que backend esté listo
sleep 3

# Volver al directorio raíz
cd ..

# Iniciar Frontend
echo -e "${BLUE}[2/2] Iniciando Frontend...${NC}"
cd frontend 2>/dev/null || { echo "❌ No se encontró directorio frontend"; exit 1; }

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "🔧 Instalando dependencias..."
    npm install > /dev/null 2>&1
fi

# Iniciar Vite en background
npx vite > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"

# Esperar a que frontend esté listo
sleep 3

# Mostrar URLs
echo ""
echo "================================"
echo -e "${GREEN}✅ TODO LISTO!${NC}"
echo "================================"
echo ""
echo -e "${BLUE}📱 Frontend:${NC}"
echo "   http://localhost:5173"
echo ""
echo -e "${BLUE}⚙️  Backend:${NC}"
echo "   http://localhost:8001"
echo "   API Docs: http://localhost:8001/docs"
echo ""
echo -e "${BLUE}🧪 Test Lab:${NC}"
echo "   http://localhost:5173 → Click en 🧪 Test Lab"
echo ""
echo "================================"
echo -e "${BLUE}📝 Guías:${NC}"
echo "   • GUIA_USO.md - Guía de uso completa"
echo "   • IMPLEMENTACION_RESUMEN.md - Detalles técnicos"
echo "   • RESUMEN_FINAL.txt - Este archivo"
echo "================================"
echo ""
echo -e "${BLUE}Presiona Ctrl+C para terminar${NC}"
echo ""

# Abrir navegador
echo "🌐 Abriendo navegador..."
open_browser "http://localhost:5173" || echo "   Abre manualmente: http://localhost:5173"

# Mantener script corriendo
wait
