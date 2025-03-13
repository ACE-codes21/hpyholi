import { Montserrat } from 'next/font/google';
import ColorSplash from '@/components/ColorSplash';
import Envelope from '@/components/Envelope';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <ColorSplash />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in`}>
            Happy Holi! 🎨
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 animate-slide-up">
            Tap the envelope
          </p>
        </div>
        <Envelope />
      </div>
    </main>
  );
}
