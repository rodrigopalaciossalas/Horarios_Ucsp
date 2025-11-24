import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import {
  profesorService,
  cursoService,
  aulaService,
  aulasLibresService,
} from '../services/api';
import type { ScheduleEntry, AulaLibre } from '../services/api';

// Profesor hooks
export const useProfesor = (nombre: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['profesor', nombre],
    queryFn: () => profesorService.getByName(nombre),
    enabled: !!nombre,
  });
};

export const useProfesorByDay = (nombre: string, dia: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['profesor', nombre, 'dia', dia],
    queryFn: () => profesorService.getByNameAndDay(nombre, dia),
    enabled: !!nombre && !!dia,
  });
};

export const useProfesorByType = (nombre: string, tipo: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['profesor', nombre, 'tipo', tipo],
    queryFn: () => profesorService.getByNameAndType(nombre, tipo),
    enabled: !!nombre && !!tipo,
  });
};

// Curso hooks
export const useCurso = (curso: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['curso', curso],
    queryFn: () => cursoService.getByCourse(curso),
    enabled: !!curso,
  });
};

export const useCursoByDay = (curso: string, dia: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['curso', curso, 'dia', dia],
    queryFn: () => cursoService.getByCourseAndDay(curso, dia),
    enabled: !!curso && !!dia,
  });
};

export const useCursoByType = (curso: string, tipo: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['curso', curso, 'tipo', tipo],
    queryFn: () => cursoService.getByCourseAndType(curso, tipo),
    enabled: !!curso && !!tipo,
  });
};

// Aula hooks
export const useAula = (numero: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['aula', numero],
    queryFn: () => aulaService.getByNumber(numero),
    enabled: !!numero,
  });
};

export const useAulaByDay = (numero: string, dia: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['aula', numero, 'dia', dia],
    queryFn: () => aulaService.getByNumberAndDay(numero, dia),
    enabled: !!numero && !!dia,
  });
};

export const useAulaByType = (numero: string, tipo: string): UseQueryResult<ScheduleEntry[]> => {
  return useQuery({
    queryKey: ['aula', numero, 'tipo', tipo],
    queryFn: () => aulaService.getByNumberAndType(numero, tipo),
    enabled: !!numero && !!tipo,
  });
};

// Aulas Libres hook
export const useAulasLibres = (dia: string, hora: string): UseQueryResult<AulaLibre[]> => {
  return useQuery({
    queryKey: ['aulas_libres', dia, hora],
    queryFn: () => aulasLibresService.getAulasByday(dia, hora),
    enabled: !!dia && !!hora,
  });
};
