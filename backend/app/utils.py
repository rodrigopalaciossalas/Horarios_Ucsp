from pathlib import Path
import pandas as pd

# Ruta corregida (el CSV está dentro de /app/data)
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "horarios_2025_2.csv"

df = pd.read_csv(DATA_PATH)


dias_orden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

# =========================
# Filtros básicos
# =========================
def filtrar_por_aula(aula: str):
    return df[df["AMBIENTE"].str.contains(aula, case=False, na=False)]

def filtrar_por_profesor(nombre: str):
    return df[df["PROFESOR"].str.contains(nombre, case=False, na=False)]

def filtrar_por_curso(curso: str):
    return df[df["CURSO"].str.contains(curso, case=False, na=False)]

def filtrar_por_dia(dia: str):
    return df[df["DIA"].str.contains(dia, case=False, na=False)]

def filtrar_por_tipo(tipo: str):
    return df[df["TIPO DICTADO"].str.contains(tipo, case=False, na=False)]

# =========================
# Filtros combinados (columna principal + día)
# =========================
def filtrar_por_aula_y_dia(aula: str, dia: str):
    df_aula = filtrar_por_aula(aula)
    return df_aula[df_aula["DIA"].str.contains(dia, case=False, na=False)]

def filtrar_por_profesor_y_dia(nombre: str, dia: str):
    df_prof = filtrar_por_profesor(nombre)
    return df_prof[df_prof["DIA"].str.contains(dia, case=False, na=False)]

def filtrar_por_curso_y_dia(curso: str, dia: str):
    df_curso = filtrar_por_curso(curso)
    return df_curso[df_curso["DIA"].str.contains(dia, case=False, na=False)]

# =========================
# Filtros combinados (dos columnas principales)
# =========================
def filtrar_por_profesor_y_aula(nombre: str, aula: str):
    df_prof = filtrar_por_profesor(nombre)
    return df_prof[df_prof["AMBIENTE"].str.contains(aula, case=False, na=False)]

def filtrar_por_curso_y_aula(curso: str, aula: str):
    df_curso = filtrar_por_curso(curso)
    return df_curso[df_curso["AMBIENTE"].str.contains(aula, case=False, na=False)]

def filtrar_por_profesor_y_curso(nombre: str, curso: str):
    df_prof = filtrar_por_profesor(nombre)
    return df_prof[df_prof["CURSO"].str.contains(curso, case=False, na=False)]

# =========================
# Filtros combinados (tres columnas principales)
# =========================
def filtrar_por_profesor_curso_y_dia(nombre: str, curso: str, dia: str):
    df_filtrado = filtrar_por_profesor_y_curso(nombre, curso)
    return df_filtrado[df_filtrado["DIA"].str.contains(dia, case=False, na=False)]

def filtrar_por_aula_curso_y_dia(aula: str, curso: str, dia: str):
    df_filtrado = filtrar_por_curso_y_aula(curso, aula)
    return df_filtrado[df_filtrado["DIA"].str.contains(dia, case=False, na=False)]

def filtrar_por_profesor_aula_y_dia(nombre: str, aula: str, dia: str):
    df_filtrado = filtrar_por_profesor_y_aula(nombre, aula)
    return df_filtrado[df_filtrado["DIA"].str.contains(dia, case=False, na=False)]

#==========================
#coincidencia entre nombres
#==========================
def nombres_similares(nombre: str, lista_nombres: list):
    nombre = nombre.lower()
    similares = [n for n in lista_nombres if nombre in n.lower()]
    return similares



# =========================
# Ordenar
# =========================
def ordenar_por_dia_y_hora(resultados: pd.DataFrame):
    resultados = resultados.assign(
        dia_orden=pd.Categorical(resultados["DIA"], categories=dias_orden, ordered=True)
    ).sort_values(["dia_orden", "INICIO"])
    return resultados

