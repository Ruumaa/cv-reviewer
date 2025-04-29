import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Marquee from '@/components/ui/marquee';
import ReviewSection from './components/ReviewSection';
import BaseLayout from '@/components/layouts/BaseLayout';

export default function Home() {
  const items = [
    'Revume',
    'Gemini AI',
    'Cover Letter',
    'Resume',
    '#AI-Powered',
  ];
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <BaseLayout>
            <div className="items-center justify-center flex flex-col text-center ">
              {/* tagline */}
              <Badge>Your AI-Powered Career Assistant</Badge>
              {/* title */}
              <h1 className="text-5xl font-bold mt-10 mb-5">
                Tingkatkan{' '}
                <span className="relative inline-block bg-main rotate-x-3 rotate-z-3  hover:rotate-x-0 hover:rotate-z-0 duration-150 hover:cursor-default rounded px-2 py-1">
                  Kualitas CV
                </span>{' '}
                Kamu dalam Hitungan Detik
              </h1>
              {/* subtitle */}
              <p className="text-sm max-w-sm">
                Dapatkan insight kelebihan & kekurangan CV kamu secara otomatis,
                cepat, dan gratis dengan bantuan{' '}
                <a
                  href="https://gemini.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-500"
                >
                  Gemini AI
                </a>
              </p>
              {/* action button */}
              <Button className="mt-10">Mulai Sekarang</Button>
            </div>
          </BaseLayout>
        </div>

        <div className="mt-auto">
          <Marquee items={items} />
        </div>
      </div>

      <div className="bg-background">
        <BaseLayout>
          <ReviewSection />
        </BaseLayout>
      </div>
    </>
  );
}
