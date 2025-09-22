from fastapi import APIRouter, Query
import pandas as pd
from pathlib import Path

router = APIRouter(prefix="/curso", tags=["curso"])

# Ruta absoluta del CSV
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "horarios_2025_2.csv"

# Cargar CSV
df = pd.read_csv(DATA_PATH)

@router.get("/")
def get_curso(nombre: str = Query(..., description="Nombre del curso")):
    resultados = df[df["CURSO"].str.contains(nombre, case=False, na=False)]

    # Convertir NaN → None
    horarios = resultados.where(pd.notnull(resultados), None).to_dict(orient="records")


    return {
        "query": nombre,
        "total": len(horarios),
        "horarios": horarios
    }
