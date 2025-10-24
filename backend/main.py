from fastapi import FastAPI
from app.routers import aula, profesor, curso, aulas_libres

app = FastAPI(title="API Horarios 2025-2 🚀")

app.include_router(aula.router)
app.include_router(profesor.router)
app.include_router(curso.router)
app.include_router(aulas_libres.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando 🚀"}
