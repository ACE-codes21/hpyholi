"use client";

import { Suspense } from 'react';
import { Montserrat } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import ColorSplash from '@/components/ColorSplash';
import Envelope from '@/components/Envelope';

const montserrat = Montserrat({ subsets: ['latin'] });

function HomeContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const isNaira = name?.toLowerCase() === 'naira';

  console.log('URL Parameters:', { name, isNaira }); // Debug log

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="text-center mb-12">
        <h1 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in`}>
          {isNaira ? 'Dear Naira, Happy Holi! 🎨' : 'Happy Holi! 🎨'}
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8 animate-slide-up">
          {isNaira 
            ? 'Let the colors of joy paint your world with happiness ✨' 
            : 'Tap the envelope'}
        </p>
      </div>
      <Envelope name={name} />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <ColorSplash />
      <Suspense fallback={
        <div className="container mx-auto px-4 py-12 relative z-10 text-center">
          <h1 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-white mb-4`}>
            Loading...
          </h1>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </main>
  );
}
