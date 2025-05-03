import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react';
import ValueColor from './ValueColor';
import Divider from './Divider';
import { SectionDetail } from '@/types';
import { BicepsFlexed, ListPlus, ListX } from 'lucide-react';

interface ReviewDetail {
  title: string;
  data: SectionDetail;
  icon?: React.ReactNode;
}

const ReviewDetail = ({ title, data, icon }: ReviewDetail) => {
  return (
    <>
      <Divider />
      <CardContent>
        <CardTitle className="font-semibold flex items-center gap-x-1">
          {icon}
          <p className="flex gap-x-2 items-center">
            {title} (<ValueColor value={data.nilai} />){' '}
          </p>
        </CardTitle>
        <CardDescription className="my-3">{data.feedback}</CardDescription>

        <CardTitle className="font-semibold">
          <p className="flex items-center gap-x-1">
            <BicepsFlexed size={20} className="text-green-600" /> Kelebihan
          </p>
        </CardTitle>
        <CardDescription className="my-3">{data.kelebihan}</CardDescription>

        <CardTitle className="font-semibold">
          <p className="flex items-center gap-x-1">
            <ListX size={20} className="text-red-600" /> Kekurangan
          </p>
        </CardTitle>
        <CardDescription className="my-3">{data.kekurangan}</CardDescription>

        <CardTitle className="font-semibold">
          <p className="flex items-center gap-x-1">
            {' '}
            <ListPlus size={20} className="text-main" /> Perbaikan
          </p>
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
