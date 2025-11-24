import sys
from pathlib import Path

# Agregar el directorio backend al path de Python
sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI
from app.routers import aula, profesor, curso, aulas_libres
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Horarios 2025-2 🚀")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aula.router)
app.include_router(profesor.router)
app.include_router(curso.router)
app.include_router(aulas_libres.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)


