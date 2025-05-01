import { ResumeEvaluation } from '@/types';
import { useState } from 'react';
import { dummyReview } from '../components/dummy';
import { toast } from 'sonner';

export const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [review, setReview] = useState<ResumeEvaluation>(() => dummyReview);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpload = async () => {
    try {
      setIsLoading(true);
      if (!file)
        return toast.error('Gagal mereview!', {
          description: 'Masukkan file C V-mu dalam format pdf/docx',
        });

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:5000/upload', {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUpload, setFile, review, isLoading };
};
