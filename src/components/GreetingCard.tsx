"use client";

import { useState } from 'react';

const GreetingCard = () => {
  const [message, setMessage] = useState('May your life be as colorful as the festival of Holi!');
  const [selectedTheme, setSelectedTheme] = useState('modern');

  const themes = {
    modern: 'bg-white/20 backdrop-blur-lg',
    traditional: 'bg-orange-100/90 backdrop-blur-lg',
    minimal: 'bg-gray-50/80 backdrop-blur-lg',
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Happy Holi!',
        text: message,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 shadow-2xl ${themes[selectedTheme as keyof typeof themes]}`}>
        {/* Theme Selection */}
        <div className="flex gap-3 mb-6 justify-center">
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all
                ${selectedTheme === theme 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'bg-white/30 text-white hover:bg-white/40'
                }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Greeting Message */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white/50 rounded-lg p-4 mb-6 min-h-[120px] text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write your Holi greeting..."
        />

        {/* Traditional Wishes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setMessage('बुरा न मानो होली है! Happy Holi!')}
            className="bg-white/30 hover:bg-white/40 text-white p-3 rounded-lg transition-all"
          >
            Add Hindi Wish
          </button>
          <button
            onClick={() => setMessage('May the colors of Holi spread happiness in your life!')}
            className="bg-white/30 hover:bg-white/40 text-white p-3 rounded-lg transition-all"
          >
            Add English Wish
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Greeting
        </button>
      </div>
    </div>
  );
};

export default GreetingCard; 