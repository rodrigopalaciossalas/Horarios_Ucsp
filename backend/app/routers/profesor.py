from fastapi import APIRouter
import pandas as pd
from rapidfuzz import process, fuzz
from pathlib import Path

router = APIRouter(prefix="/profesor", tags=["Profesor"])

# Ruta absoluta del CSV
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "horarios_2025_2.csv"

# Cargar CSV
df = pd.read_csv(DATA_PATH)

@router.get("/")
def get_profesor(nombre: str):
    profesores = df["PROFESOR"].dropna().unique().tolist()
    match, score, idx = process.extractOne(nombre, profesores, scorer=fuzz.WRatio)
    resultados = df[df["PROFESOR"] == match]
    return {
        "query": nombre,
        "match": match,
        "score": score,
        "horarios": resultados.where(pd.notnull(resultados), None).to_dict(orient="records")
    }
