'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import React, { useState } from 'react';

const ReviewSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      console.log(!file);
      if (!file)
        return toast('Gagal mereview!', {
          description: 'Masukkan file CV-mu dalam format PDF/docx',
        });

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data, '<<<<<<<<<<<<<<<<<');
      setReview(data.review || data.error);
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
          className="bg-background"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button onClick={() => handleUpload()} disabled={isLoading}>
          {isLoading ? 'Sedang Mereview...' : 'Review CV'}
        </Button>
        <pre className="whitespace-pre-wrap mt-[20px]">{review}</pre>
      </div>

      <Button
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </section>
  );
};

export default ReviewSection;
