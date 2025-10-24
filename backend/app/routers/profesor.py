# backend/app/routers/profesor.py
from fastapi import APIRouter
import pandas as pd
from app.utils import (
    filtrar_por_profesor,
    filtrar_por_profesor_y_dia,
    filtrar_por_tipo,
    ordenar_por_dia_y_hora,
)

router = APIRouter(prefix="/profesores", tags=["Profesores"])


def limpiar(df):
    """Convierte NaN a None para que FastAPI pueda devolver JSON válido"""
    return df.where(pd.notnull(df), None)


@router.get("/{nombre}")
async def get_profesor(nombre: str):
    df_result = filtrar_por_profesor(nombre)
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "profesor": nombre,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }


@router.get("/{nombre}/dias/{dia}")
async def get_profesor_dia(nombre: str, dia: str):
    df_result = filtrar_por_profesor_y_dia(nombre, dia)
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "profesor": nombre,
        "dia": dia,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }


@router.get("/{nombre}/tipo/{tipo}")
async def get_profesor_tipo(nombre: str, tipo: str):
    df_prof = filtrar_por_profesor(nombre)
    df_result = filtrar_por_tipo(tipo, df_prof)  # <-- ojo: aquí pasamos el DF
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "profesor": nombre,
        "tipo": tipo,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }
