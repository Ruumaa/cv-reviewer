import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react';
import ValueColor from './ValueColor';
import Divider from './Divider';
import { SectionDetail } from '@/types';

interface ReviewDetail {
  title: string;
  data: SectionDetail;
}

const ReviewDetail = ({ title, data }: ReviewDetail) => {
  return (
    <>
      <Divider />
      <CardContent>
        <CardTitle className="font-semibold">
          <p className="flex gap-x-2 items-center">
            {title} (<ValueColor value={data.nilai} />){' '}
          </p>
        </CardTitle>
        <CardDescription className="my-3">{data.feedback}</CardDescription>

        <CardTitle className="font-semibold text-green-600">
          <p>Kelebihan</p>
        </CardTitle>
        <CardDescription className="my-3">{data.kelebihan}</CardDescription>

        <CardTitle className="font-semibold text-yellow-500">
          <p>Kekurangan</p>
        </CardTitle>
        <CardDescription className="my-3">{data.kekurangan}</CardDescription>

        <CardTitle className="font-semibold">
          <p>Perbaikan</p>
        </CardTitle>
        <CardDescription className="my-3">
          <ul className="list-disc pl-5">
            {data.perbaikan.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </CardDescription>
      </CardContent>
    </>
  );
};

export default ReviewDetail;
