from fastapi import APIRouter, Query
import pandas as pd
from pathlib import Path

router = APIRouter(prefix="/aula", tags=["aula"])

# Ruta absoluta del CSV
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "horarios_2025_2.csv"

# Cargar CSV
df = pd.read_csv(DATA_PATH)

@router.get("/")
def get_aula(nombre: str = Query(..., description="Código del aula o ambiente")):
    resultados = df[df["AMBIENTE"].str.contains(nombre, case=False, na=False)]

    # Convertir NaN → None
    horarios = resultados.where(pd.notnull(resultados), None).to_dict(orient="records")


    return {
        "query": nombre,
        "total": len(horarios),
        "horarios": horarios
    }
