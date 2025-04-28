'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import React, { useState } from 'react';

const ReviewSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [review, setReview] = useState();
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
      console.log(response, '<<<<<<<');
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

  return (
    <section className="py-20">
      <div className="max-w-sm">
        <Label htmlFor="picture">File</Label>
        <Input
          id="picture"
          type="file"
          className="bg-background cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button onClick={() => handleUpload()} disabled={isLoading}>
          {isLoading ? 'Sedang Mereview...' : 'Review CV'}
        </Button>
        <pre className="whitespace-pre-wrap mt-[20px]">
          {review ? JSON.stringify(review, null, 2) : ''}
        </pre>
      </div>
    </section>
  );
};

export default ReviewSection;
