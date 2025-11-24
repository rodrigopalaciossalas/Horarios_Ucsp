const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

interface ScheduleEntry {
  PROFESOR: string;
  DIA: string;
  INICIO: string;
  FIN: string;
  CURSO: string;
  GRUPO: string;
  SUBGRUPO: string;
  AMBIENTE: string;
  'TIPO DICTADO': string;
}

interface ApiResponse<T> {
  [key: string]: any;
  horarios?: T[];
}

// Profesor
export const profesorService = {
  getByName: async (nombre: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/profesores/${encodeURIComponent(nombre)}`);
    if (!response.ok) throw new Error('Error fetching profesor');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByNameAndDay: async (nombre: string, dia: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/profesores/${encodeURIComponent(nombre)}/dias/${encodeURIComponent(dia)}`);
    if (!response.ok) throw new Error('Error fetching profesor by day');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByNameAndType: async (nombre: string, tipo: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/profesores/${encodeURIComponent(nombre)}/tipo/${encodeURIComponent(tipo)}`);
    if (!response.ok) throw new Error('Error fetching profesor by type');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },
};

// Curso
export const cursoService = {
  getByCourse: async (curso: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/cursos/${encodeURIComponent(curso)}`);
    if (!response.ok) throw new Error('Error fetching curso');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByCourseAndDay: async (curso: string, dia: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/cursos/${encodeURIComponent(curso)}/dias/${encodeURIComponent(dia)}`);
    if (!response.ok) throw new Error('Error fetching curso by day');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByCourseAndType: async (curso: string, tipo: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/cursos/${encodeURIComponent(curso)}/tipo/${encodeURIComponent(tipo)}`);
    if (!response.ok) throw new Error('Error fetching curso by type');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },
};

// Aula
export const aulaService = {
  getByNumber: async (numero: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/aulas/${encodeURIComponent(numero)}`);
    if (!response.ok) throw new Error('Error fetching aula');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByNumberAndDay: async (numero: string, dia: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/aulas/${encodeURIComponent(numero)}/dias/${encodeURIComponent(dia)}`);
    if (!response.ok) throw new Error('Error fetching aula by day');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },

  getByNumberAndType: async (numero: string, tipo: string): Promise<ScheduleEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/aulas/${encodeURIComponent(numero)}/tipo/${encodeURIComponent(tipo)}`);
    if (!response.ok) throw new Error('Error fetching aula by type');
    const data: ApiResponse<ScheduleEntry> = await response.json();
    return data.horarios || [];
  },
};

// Aulas Libres
interface AulaLibre {
  aula: string;
  siguiente_profesor?: string;
  curso?: string;
  siguiente_inicio?: string;
  en_minutos?: number;
  estado?: string;
}

export const aulasLibresService = {
  getAulasByday: async (dia: string, hora: string): Promise<AulaLibre[]> => {
    const response = await fetch(`${API_BASE_URL}/aulas_libres/dia/${encodeURIComponent(dia)}/hora/${encodeURIComponent(hora)}`);
    if (!response.ok) throw new Error('Error fetching aulas libres');
    const data = await response.json();
    return data.aulas_libres || [];
  },
};

export type { ScheduleEntry, AulaLibre };
