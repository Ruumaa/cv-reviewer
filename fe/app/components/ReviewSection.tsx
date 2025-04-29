'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
interface SectionDetail {
  nilai: number;
  feedback: string;
  kelebihan: string;
  kekurangan: string;
  perbaikan: string[];
}

interface ResumeEvaluation {
  profil: SectionDetail;
  summary: SectionDetail;
  pengalaman_kerja: SectionDetail;
  pendidikan: SectionDetail;
  keahlian: SectionDetail;
  portofolio: SectionDetail;
  nilai_total: number;
  kesimpulan: string;
}

const ReviewSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [review, setReview] = useState<ResumeEvaluation | null>();
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
      {/* <div className="max-w-sm">
        <pre className="whitespace-pre-wrap mt-[20px]">
          {review ? JSON.stringify(review, null, 2) : ''}
        </pre>
      </div> */}
      <div className="h-screen">
        <div className="not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 min-h-full border-border bg-white  bg-[15px_20px] bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] shadow-shadow [background-size:30px_30px]">
          <Tabs defaultValue="input" className="max-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle>Input</CardTitle>
                  <CardDescription>
                    Unggah CV atau Resume Anda, dan biarkan{' '}
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500">
                      Gemini AI
                    </span>{' '}
                    memberikan evaluasi mendalam secara instan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <div className="grid gap-3">
                    <Label htmlFor="file">File</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleUpload()}
                    disabled={isLoading}
                    className="w-full cursor-pointer"
                  >
                    {isLoading ? 'Sedang Mereview...' : 'Review CV'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* TODO -- Styling Review */}
            <TabsContent value="review">
              <Card>
                <CardHeader>
                  <CardTitle>Review</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Current password</Label>
                    <Input id="tabs-demo-current" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">New password</Label>
                    <Input id="tabs-demo-new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="neutral">
                    Save password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
