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
import ValueColor from './ValueColor';
import Divider from './Divider';
import { dummyReview } from './dummy';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [review, setReview] = useState<ResumeEvaluation | null>(
    () => dummyReview
  );
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
  return (
    <section className="py-20">
      {/* <div className="max-w-sm">
        <pre className="whitespace-pre-wrap mt-[20px]">
          {review ? JSON.stringify(review, null, 2) : ''}
        </pre>
      </div> */}
      <div className="h-screen overflow-hidden">
        <div className="not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 min-h-full border-border bg-white  bg-[15px_20px] bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] shadow-shadow [background-size:30px_30px]">
          <Tabs defaultValue="input" className="max-w-xl font-montserrat">
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
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500 ">
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
                    className="w-full cursor-pointer font-bold"
                  >
                    {isLoading ? 'Sedang Mereview...' : 'Review CV'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="review">
              <Card>
                <ScrollArea className="h-[550px]">
                  <CardHeader>
                    <CardTitle className="font-semibold">
                      Kelengkapan CV
                    </CardTitle>
                    <CardDescription>
                      <div className="flex justify-between items-center my-3">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor value={review?.profil.nilai} />
                          </p>{' '}
                          <p>Profil</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor value={review?.summary.nilai} />
                          </p>{' '}
                          <p>Summary</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor
                              value={review?.pengalaman_kerja.nilai}
                            />
                          </p>{' '}
                          <p>Pengalaman Kerja</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor value={review?.pendidikan.nilai} />
                          </p>{' '}
                          <p>Pendidikan</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor value={review?.keahlian.nilai} />
                          </p>{' '}
                          <p>Keahlian</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-pixelify-sans text-2xl font-semibold">
                            <ValueColor value={review?.portofolio.nilai} />
                          </p>{' '}
                          <p>Portofolio</p>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  {/* divider */}
                  <Divider />
                  {/* PROFILE */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Profile (<ValueColor value={review?.profil.nilai} />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.profil.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.profil.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.profil.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.profil.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                  <Divider />
                  {/* SUMMARY */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Summary (<ValueColor value={review?.summary.nilai} />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.summary.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.summary.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.summary.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.summary.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                  <Divider />
                  {/* PENGALAMAN KERJA */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Pengalaman Kerja (
                        <ValueColor
                          value={review?.pengalaman_kerja.nilai}
                        />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pengalaman_kerja.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pengalaman_kerja.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pengalaman_kerja.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.pengalaman_kerja.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                  <Divider />
                  {/* PENDIDIKAN */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Pendidikan (
                        <ValueColor value={review?.pendidikan.nilai} />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pendidikan.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pendidikan.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.pendidikan.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.pendidikan.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                  <Divider />
                  {/* KEAHLIAN */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Keahlian (
                        <ValueColor value={review?.keahlian.nilai} />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.keahlian.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.keahlian.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.keahlian.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.keahlian.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                  <Divider />
                  {/* PORTOFOLIO */}
                  <CardContent>
                    {/* feedbaack */}
                    <CardTitle className="font-semibold">
                      <p className="flex gap-x-2 items-center">
                        Portofolio (
                        <ValueColor value={review?.portofolio.nilai} />){' '}
                      </p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.portofolio.feedback}
                    </CardDescription>
                    {/* kelebihan */}
                    <CardTitle className="font-semibold text-green-600">
                      <p>Kelebihan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.portofolio.kelebihan}
                    </CardDescription>
                    {/* kekurangan */}
                    <CardTitle className="font-semibold text-yellow-500">
                      <p>Kekurangan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      {review?.portofolio.kekurangan}
                    </CardDescription>
                    {/* perbaikan */}
                    <CardTitle className="font-semibold">
                      <p>Perbaikan</p>
                    </CardTitle>
                    <CardDescription className="my-3">
                      <ul className="list-disc pl-5">
                        {review?.portofolio.perbaikan.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardContent>
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
