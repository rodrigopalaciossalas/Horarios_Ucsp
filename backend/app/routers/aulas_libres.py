from fastapi import APIRouter
from app.utils import df, dias_orden
from datetime import datetime

router = APIRouter(prefix="/aulas_libres", tags=["Aulas Libres"])

def convertir_hora(hora_str: str):
    """Convierte una cadena de hora a objeto datetime.time, soportando varios formatos"""
    formatos = ["%H:%M", "%I:%M %p", "%I:%M%p", "%I:%M", "%H.%M"]
    for fmt in formatos:
        try:
            return datetime.strptime(hora_str.strip(), fmt).time()
        except:
            pass
    return None

def diferencia_minutos(hora_actual, hora_objetivo):
    """Calcula los minutos entre dos objetos datetime.time"""
    h1 = datetime.combine(datetime.today(), hora_actual)
    h2 = datetime.combine(datetime.today(), hora_objetivo)
    delta = (h2 - h1).total_seconds() / 60
    return int(delta) if delta > 0 else 0

@router.get("/dia/{dia}/hora/{hora}")
async def aulas_libres_dia_hora(dia: str, hora: str):
    df_horas = df.copy().fillna("")

    # Convertimos las horas a formato datetime.time
    df_horas["INICIO_TIME"] = df_horas["INICIO"].apply(convertir_hora)
    df_horas["FIN_TIME"] = df_horas["FIN"].apply(convertir_hora)
    hora_usuario = convertir_hora(hora)

    if hora_usuario is None:
        return {"error": f"Formato de hora no válido: {hora}"}

    # Filtrar clases del día (coincidencia insensible a mayúsculas)
    df_dia = df_horas[df_horas["DIA"].str.contains(dia, case=False, na=False)]

    # Aulas ocupadas: clases que ya empezaron y no han terminado
    ocupadas = df_dia[
        (df_dia["INICIO_TIME"] <= hora_usuario) & (df_dia["FIN_TIME"] > hora_usuario)
    ]["AMBIENTE"].unique()

    # Todas las aulas del horario
    todas_aulas = df_horas["AMBIENTE"].dropna().unique()
    libres = [a for a in todas_aulas if a not in ocupadas]

    resultado = []
    for aula in libres:
        # Buscar próxima clase en esa aula
        futuras = df_dia[df_dia["AMBIENTE"] == aula]
        futuras = futuras[futuras["INICIO_TIME"] > hora_usuario].sort_values(by="INICIO_TIME")

        if not futuras.empty:
            prox = futuras.iloc[0]
            minutos_restantes = diferencia_minutos(hora_usuario, prox["INICIO_TIME"])

            info = {
                "aula": aula,
                "siguiente_profesor": prox["PROFESOR"],
                "curso": prox["CURSO"],
                "siguiente_inicio": str(prox["INICIO"]),
                "en_minutos": minutos_restantes
            }
        else:
            info = {
                "aula": aula,
                "siguiente_profesor": None,
                "curso": None,
                "siguiente_inicio": None,
                "en_minutos": None,
                "estado": "Libre todo el día"
            }

        resultado.append(info)

    # Ordenar aulas libres por el tiempo restante hasta la próxima clase (prioridad)
    resultado.sort(key=lambda x: x["en_minutos"] if x["en_minutos"] else 9999)

    return {
        "dia": dia.capitalize(),
        "hora_actual": hora,
        "aulas_libres": resultado
    }
