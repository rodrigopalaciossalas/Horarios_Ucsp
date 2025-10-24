# backend/app/routers/curso.py
from fastapi import APIRouter
import pandas as pd
from app.utils import (
    filtrar_por_curso,
    filtrar_por_curso_y_dia,
    filtrar_por_tipo,
    ordenar_por_dia_y_hora,
)

router = APIRouter(prefix="/cursos", tags=["Cursos"])


def limpiar(df):
    """Convierte NaN a None para que FastAPI devuelva JSON válido"""
    return df.where(pd.notnull(df), None)


@router.get("/{curso}")
async def get_curso(curso: str):
    df_result = filtrar_por_curso(curso)
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "curso": curso,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }


@router.get("/{curso}/dias/{dia}")
async def get_curso_dia(curso: str, dia: str):
    df_result = filtrar_por_curso_y_dia(curso, dia)
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "curso": curso,
        "dia": dia,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }


@router.get("/{curso}/tipo/{tipo}")
async def get_curso_tipo(curso: str, tipo: str):
    df_curso = filtrar_por_curso(curso)
    df_result = filtrar_por_tipo(tipo, df_curso)  # <-- le pasamos el DF filtrado
    df_result = ordenar_por_dia_y_hora(df_result)
    df_result = limpiar(df_result)
    return {
        "curso": curso,
        "tipo": tipo,
        "total_horarios": len(df_result),
        "horarios": df_result.to_dict(orient="records"),
    }
