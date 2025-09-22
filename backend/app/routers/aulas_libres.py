from fastapi import APIRouter, Query
import pandas as pd
from pathlib import Path

router = APIRouter(prefix="/aula_libre", tags=["aula_libre"])

# Ruta absoluta del CSV
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "horarios_2025_2.csv"

# Cargar CSV
df = pd.read_csv(DATA_PATH)

@router.get("/")
def get_aula_libre(dia: str = Query(..., description="Día a consultar"),
                   hora: str = Query(..., description="Hora en formato HH:MM")):
    """
    Busca aulas libres en un día y hora específica.
    """
    # Filtramos solo las filas que coinciden con el día
    df_dia = df[df["DIA"].str.contains(dia, case=False, na=False)]

    # Buscar aulas ocupadas a esa hora
    ocupadas = df_dia[
        (df_dia["INICIO"] <= hora) & (df_dia["FIN"] >= hora)
    ]["AMBIENTE"].unique()

    # Todas las aulas
    todas_aulas = df["AMBIENTE"].dropna().unique()

    # Diferencia → aulas libres
    libres = [a for a in todas_aulas if a not in ocupadas]

    return {
        "dia": dia,
        "hora": hora,
        "aulas_libres": libres
    }

