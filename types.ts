export enum EducationLevel {
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA'
}

export enum SubjectType {
  UMUM = 'Umum',
  AGAMA = 'Agama'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation?: string;
}

export interface QuizConfig {
  level: EducationLevel;
  subject: string;
  type: SubjectType;
  isFestival: boolean;
  schoolName?: string;
}

export interface VideoContent {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  level: EducationLevel;
  subject: string;
}

export interface SchoolRank {
  rank: number;
  schoolName: string;
  points: number;
  level: EducationLevel;
}