import { EducationLevel, SchoolRank } from './types';

export const CURRICULUM = {
  [EducationLevel.SD]: {
    umum: [
      "Matematika", "Bahasa Indonesia", "IPA", "IPS", "PPKn", "SBdP", "PJOK"
    ],
    agama: [
      "Pendidikan Agama Islam", "Pendidikan Agama Kristen", "Pendidikan Agama Katolik", 
      "Pendidikan Agama Hindu", "Pendidikan Agama Buddha"
    ]
  },
  [EducationLevel.SMP]: {
    umum: [
      "Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS", "PPKn", "Informatika"
    ],
    agama: [
      "Pendidikan Agama Islam", "Pendidikan Agama Kristen", "Pendidikan Agama Katolik", 
      "Pendidikan Agama Hindu", "Pendidikan Agama Buddha"
    ]
  },
  [EducationLevel.SMA]: {
    umum: [
      "Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia", "Biologi", 
      "Sejarah", "Geografi", "Ekonomi", "Sosiologi", "Informatika"
    ],
    agama: [
      "Pendidikan Agama Islam", "Pendidikan Agama Kristen", "Pendidikan Agama Katolik", 
      "Pendidikan Agama Hindu", "Pendidikan Agama Buddha"
    ]
  }
};

export const MOCK_LEADERBOARD: SchoolRank[] = [
  { rank: 1, schoolName: "SDN 1 Nusantara", points: 15400, level: EducationLevel.SD },
  { rank: 2, schoolName: "SMP Bintang Juara", points: 14250, level: EducationLevel.SMP },
  { rank: 3, schoolName: "SMA Harapan Bangsa", points: 13900, level: EducationLevel.SMA },
  { rank: 4, schoolName: "SD Mentari Pagi", points: 12100, level: EducationLevel.SD },
  { rank: 5, schoolName: "SMA Negeri 1 Kota", points: 11800, level: EducationLevel.SMA },
];

export const MOCK_VIDEOS = [
  { id: '1', title: 'Trik Cepat Matematika Dasar', thumbnail: 'https://picsum.photos/300/170?random=1', duration: '10:05', level: EducationLevel.SD, subject: 'Matematika' },
  { id: '2', title: 'Sejarah Kemerdekaan Indonesia', thumbnail: 'https://picsum.photos/300/170?random=2', duration: '15:30', level: EducationLevel.SMP, subject: 'IPS' },
  { id: '3', title: 'Hukum Newton & Penerapannya', thumbnail: 'https://picsum.photos/300/170?random=3', duration: '20:15', level: EducationLevel.SMA, subject: 'Fisika' },
  { id: '4', title: 'Basic English Conversation', thumbnail: 'https://picsum.photos/300/170?random=4', duration: '08:45', level: EducationLevel.SMP, subject: 'Bahasa Inggris' },
  { id: '5', title: 'Memahami Ekosistem Laut', thumbnail: 'https://picsum.photos/300/170?random=5', duration: '12:20', level: EducationLevel.SD, subject: 'IPA' },
];
