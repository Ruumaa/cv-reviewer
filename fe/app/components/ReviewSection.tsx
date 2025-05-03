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
import {
  BrainCircuit,
  BriefcaseBusiness,
  ChartPie,
  FileText,
  FileUser,
  GraduationCap,
  Sparkles,
  UserRound,
} from 'lucide-react';
import Divider from './Divider';

const ReviewSection = () => {
  const { setFile, handleUpload, isLoading, review, tab, setTab } = useUpload();
  const sections: { key: SectionKey; label: string; icon?: React.ReactNode }[] =
    [
      { key: 'profil', label: 'Data Diri', icon: <UserRound size={20} /> },
      { key: 'summary', label: 'Ringkasan', icon: <FileText size={20} /> },
      {
        key: 'pengalaman_kerja',
        label: 'Pengalaman',
        icon: <BriefcaseBusiness size={20} />,
      },
      {
        key: 'pendidikan',
        label: 'Pendidikan',
        icon: <GraduationCap size={20} />,
      },
      { key: 'keahlian', label: 'Keahlian', icon: <BrainCircuit size={20} /> },
      { key: 'portofolio', label: 'Portofolio', icon: <Sparkles size={20} /> },
    ];

  return (
    <section className="py-20">
      <div className="h-screen overflow-hidden">
        <div
          className="not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 min-h-full border-border bg-white  bg-[15px_20px] bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] shadow-shadow [background-size:30px_30px]"
          id="review"
        >
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="max-w-xl font-montserrat"
          >
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
                    <CardTitle className="flex items-center justify-start gap-x-1 text-xl font-semibold">
                      <ChartPie size={30} className="text-main-foreground" />
                      <p>Kelengkapan CV</p>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex justify-between items-center my-3">
                        {sections.map(({ key, label }) => (
                          <div
                            className="flex flex-col items-center justify-center"
                            key={key}
                          >
                            <p className="font-montserrat text-2xl font-semibold">
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
                        icon={sectionKey.icon}
                      />
                    </Fragment>
                  ))}
                  <Divider />
                  {/* Kesimpulan  */}
                  <CardContent className="flex mb-8">
                    <div className="w-1/3 flex flex-col justify-center items-center">
                      <FileUser size={100} />
                      <p className="font-montserrat text-2xl font-semibold mt-5">
                        {review?.nilai_total} / 100
                      </p>
                    </div>
                    <div className="w-2/3">
                      <CardTitle className="font-montserrat text-2xl font-semibold">
                        Kesimpulan
                      </CardTitle>
                      <CardDescription>{review?.kesimpulan}</CardDescription>
                    </div>
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
