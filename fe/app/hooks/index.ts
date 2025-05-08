import { ResumeEvaluation } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tab, setTab] = useState('input');
  const [review, setReview] = useState<ResumeEvaluation>();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async () => {
    try {
      setIsLoading(true);
      if (!file)
        return toast.error('Gagal mereview!', {
          description: 'Masukkan file C V-mu dalam format pdf/docx',
        });

      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setIsLoading(false);
        return toast.error('Format file tidak didukung!', {
          description: 'Pastikan file memiliki format .pdf atau .docx',
        });
      }

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const response = await res.json();
      const rawReview = response.review;

      const cleaned = rawReview
        .replace(/```json/, '')
        .replace(/```/, '')
        .trim();

      const parsedData = JSON.parse(cleaned);
      setReview(parsedData || response.error);
      setTab('review');
    } catch (error) {
      console.error(error);
      toast.error('Gagal mereview!', {
        description: 'Terjadi kesalahan, mohon ulangi beberapa saat lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUpload, file, setFile, review, isLoading, tab, setTab };
};
