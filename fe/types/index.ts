export interface SectionDetail {
  nilai: number;
  feedback: string;
  kelebihan: string;
  kekurangan: string;
  perbaikan: string[];
}

export interface ResumeEvaluation {
  profil: SectionDetail;
  summary: SectionDetail;
  pengalaman_kerja: SectionDetail;
  pendidikan: SectionDetail;
  keahlian: SectionDetail;
  portofolio: SectionDetail;
  nilai_total: number;
  kesimpulan: string;
}

export type SectionKey =
  | 'profil'
  | 'summary'
  | 'pengalaman_kerja'
  | 'pendidikan'
  | 'keahlian'
  | 'portofolio';
