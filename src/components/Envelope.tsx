"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Envelope = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const greetings = [
    {
      title: "Happy Holi! 🎨",
      message: "May this festival of colors paint your life with the hues of happiness, splash your days with moments of joy, and color your heart with the tints of love. Let the spirit of Holi bring new beginnings and fresh perspectives to your life.",
      color: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      title: "बुरा न मानो होली है! 🌈",
      message: "रंगों की बौछार में खुशियों की बहार हो,\nहर दिल में प्यार हो, हर घर में त्योहार हो।\nमिटे सारे गम, हो खुशियों की धूम,\nऐसी रंगीली होली हो जो पहले ना हुई हो।\nHappy Holi to you and your loved ones!",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      title: "Colors of Unity 🕊️",
      message: "On this auspicious day, may the colors of Holi dissolve all differences and bring us together in harmony. Let's celebrate the triumph of good over evil, forgive past grievances, and embrace new friendships with open hearts.",
      color: "bg-gradient-to-r from-green-400 to-blue-500"
    },
    {
      title: "Radiant Blessings ✨",
      message: "Like the vibrant colors that fill the sky during Holi, may your life be filled with every shade of joy, success, and prosperity. Let this festival wash away your worries and fill your heart with the eternal colors of love and peace.",
      color: "bg-gradient-to-r from-purple-400 to-indigo-500"
    },
    {
      title: "होली की शुभकामनाएं 🪔",
      message: "लाल, पीला, नीला, हरा,\nहर रंग हो आपका सहारा।\nढेर सारी मिठाइयां, गुजिया और पपड़ी,\nहोली का त्योहार हो आपके लिए यादगार।\nMay the sweetness of gujiya and the colors of gulal bring endless moments of happiness!",
      color: "bg-gradient-to-r from-red-500 to-yellow-500"
    },
    {
      title: "Festival of New Beginnings 🌺",
      message: "As nature blooms with spring, let this Holi mark a new chapter in your life. May the colors of this festival bring you the courage to paint your dreams, the strength to chase them, and the blessing to achieve them all.",
      color: "bg-gradient-to-r from-teal-400 to-emerald-500"
    }
  ];

  const createColorBurst = (x: number, y: number) => {
    const event = new MouseEvent('click', {
      clientX: x,
      clientY: y,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  const handleEnvelopeClick = (e: React.MouseEvent) => {
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (!isOpen) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createColorBurst(
            rect.left + rect.width * Math.random(),
            rect.top + rect.height * Math.random()
          );
        }, i * 100);
      }
      setIsOpen(true);
    } else {
      createColorBurst(e.clientX, e.clientY);
      setCurrentPage((prev) => (prev + 1) % greetings.length);
    }
  };

  const variants = {
    closed: { transform: 'rotateX(0deg)' },
    open: { transform: 'rotateX(180deg)' }
  };

  return (
    <div 
      ref={envelopeRef}
      className="relative w-[95%] max-w-md mx-auto aspect-[3/4] cursor-pointer mt-8" 
      onClick={handleEnvelopeClick}
    >
      <div className={`absolute inset-0 bg-white/20 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden transform transition-all duration-700 ${isOpen ? 'scale-95' : 'scale-100'}`}>
        {/* Envelope Flap */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-white/10 rounded-t-lg origin-bottom"
          style={{
            clipPath: 'polygon(0 0, 50% 50%, 100% 0)'
          }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.7 }}
        />
        
        {/* Envelope Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-lg" />

        {/* Card Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-4 ${greetings[currentPage].color} rounded-lg shadow-xl flex flex-col items-center justify-center p-4 md:p-6 text-white transform transition-transform duration-700 overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-[60%]'}`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              {greetings[currentPage].title}
            </h2>
            <p className="text-base md:text-lg text-center whitespace-pre-line leading-relaxed">
              {greetings[currentPage].message}
            </p>
            {isOpen && (
              <div className="absolute bottom-2 md:bottom-4 text-xs md:text-sm opacity-70">
                Tap to see next greeting ({currentPage + 1}/{greetings.length})
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Envelope; 