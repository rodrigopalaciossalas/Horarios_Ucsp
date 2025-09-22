from fastapi import FastAPI
from app.routers import profesor, curso, aula, aulas_libres

app = FastAPI(title="API de Horarios 2025-2 🚀")

# Incluir los routers
app.include_router(profesor.router)
app.include_router(curso.router)
app.include_router(aula.router)
app.include_router(aulas_libres.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando 🚀"}
