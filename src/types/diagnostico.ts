import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser {
  id: string;
  email?: string;
  paidStatus?: boolean;
  name?: string;
  birthDate?: string;
  whatsapp?: string;
  role?: string;
}

export const meditations = [
  {
    id: 1,
    title: "Clareza Matinal",
    duration: "10:00",
    description: "Inicie seu dia limpando a névoa mental e focando no que é essencial.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Descompressão Emocional",
    duration: "15:00",
    description: "Libere as tensões do dia e reorganize sua base vibracional.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Sono Profundo e Alinhado",
    duration: "20:00",
    description: "Prepare seu campo para um descanso restaurador e alinhamento inconsciente.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export type Page = 'home' | 'diagnostico_info' | 'reprogramacao_pessoal_info' | 'clube_clarear_info' | 'clube_taro_info' | 'clube_posicao_info' | 'rituais_mes_info' | 'reprogramar_eu_info' | 'diagnostico_quiz_intro' | 'intro' | 'quiz' | 'analysis' | 'final' | 'auth' | 'checkout' | 'clube_clarear_content' | 'clube_taro_content' | 'admin_dashboard' | 'dashboard' | 'mapeamento_intro' | 'mapeamento_form' | 'mapeamento_analysis' | 'mapeamento_result' | 'lealdades_intro' | 'lealdades_form' | 'lealdades_analysis' | 'lealdades_result' | 'jornada_emocional' | 'confirmation' | 'reprogramacao_form' | 'reprogramacao_scheduling' | 'triage_quiz' | 'triage_result' | 'lista_espera_clarear' | 'numerologia_intro' | 'grupovip' | 'carta_semana' | 'leituras_taro_cigano';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}
