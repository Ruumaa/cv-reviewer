'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { Fragment } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import ReviewDetail from './ReviewDetail';
import { useUpload } from '../hooks';
import { SectionDetail, SectionKey } from '@/types';

const ReviewSection = () => {
  const { setFile, handleUpload, isLoading, review } = useUpload();
  const sections: { key: SectionKey; label: string }[] = [
    { key: 'profil', label: 'Profil' },
    { key: 'summary', label: 'Summary' },
    { key: 'pengalaman_kerja', label: 'Pengalaman Kerja' },
    { key: 'pendidikan', label: 'Pendidikan' },
    { key: 'keahlian', label: 'Keahlian' },
    { key: 'portofolio', label: 'Portofolio' },
  ];

  return (
    <section className="py-20">
      <div className="h-screen overflow-hidden">
        <div
          className="not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 min-h-full border-border bg-white  bg-[15px_20px] bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] shadow-shadow [background-size:30px_30px]"
          id="review"
        >
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
                        {sections.map(({ key, label }) => (
                          <div
                            className="flex flex-col items-center justify-center"
                            key={key}
                          >
                            <p className="font-pixelify-sans text-2xl font-semibold">
                              <ValueColor value={review?.[key].nilai} />
                            </p>{' '}
                            <p>{label}</p>
                          </div>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  {sections.map((sectionKey, i) => (
                    <Fragment key={i}>
                      <ReviewDetail
                        title={sectionKey.label}
                        data={review[sectionKey.key] as SectionDetail}
                      />
                    </Fragment>
                  ))}
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
