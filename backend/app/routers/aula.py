# backend/app/routers/aula.py
from fastapi import APIRouter
from app.utils import filtrar_por_aula, filtrar_por_aula_y_dia, filtrar_por_tipo, ordenar_por_dia_y_hora
import pandas as pd

router = APIRouter(prefix="/aulas", tags=["Aulas"])

def df_to_json(df: pd.DataFrame):
    """Convierte DataFrame a lista de diccionarios compatible con JSON"""
    df_clean = df.where(pd.notnull(df), None)  # Reemplaza NaN por None
    return df_clean.to_dict(orient="records")

@router.get("/{numero}")
async def get_aula(numero: str):
    df_result = filtrar_por_aula(numero)
    df_result = ordenar_por_dia_y_hora(df_result)
    return {
        "aula": numero,
        "total_horarios": len(df_result),
        "horarios": df_to_json(df_result)
    }

@router.get("/{numero}/dias/{dia}")
async def get_aula_dia(numero: str, dia: str):
    df_result = filtrar_por_aula_y_dia(numero, dia)
    df_result = ordenar_por_dia_y_hora(df_result)
    return {
        "aula": numero,
        "dia": dia,
        "total_horarios": len(df_result),
        "horarios": df_to_json(df_result)
    }

@router.get("/{numero}/tipo/{tipo}")
async def get_aula_tipo(numero: str, tipo: str):
    df_result = filtrar_por_aula(numero)
    df_result = filtrar_por_tipo(tipo).pipe(lambda d: d[d["AMBIENTE"].str.contains(numero, case=False, na=False)])
    df_result = ordenar_por_dia_y_hora(df_result)
    return {
        "aula": numero,
        "tipo": tipo,
        "total_horarios": len(df_result),
        "horarios": df_to_json(df_result)
    }
