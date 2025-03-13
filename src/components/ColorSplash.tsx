"use client";

import { useEffect, useRef } from 'react';

const ColorSplash = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Color particles
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
      rotation: number;
      scale: number;
    }> = [];

    const colors = [
      '#FF1744', // Red
      '#D500F9', // Purple
      '#2979FF', // Blue
      '#00E676', // Green
      '#FFEA00', // Yellow
      '#FF9100', // Orange
    ];

    // Create burst of particles
    const createBurst = (x: number, y: number, intensity: number = 1) => {
      const particleCount = Math.floor(20 * intensity);
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 4 * intensity;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const radius = (Math.random() * 20 + 10) * intensity;
        const velocity = {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        };
        particles.push({
          x,
          y,
          radius,
          color,
          velocity,
          alpha: 1,
          rotation: Math.random() * Math.PI * 2,
          scale: 1,
        });
      }
    };

    // Handle click/tap events
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ('touches' in e) 
        ? e.touches[0].clientX - rect.left 
        : e.clientX - rect.left;
      const y = ('touches' in e) 
        ? e.touches[0].clientY - rect.top 
        : e.clientY - rect.top;
      createBurst(x, y);
    };

    canvas.addEventListener('click', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);

    // Animation
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Add gravity effect
        particle.velocity.y += 0.05;
        
        // Update alpha and scale
        particle.alpha -= 0.005;
        particle.scale = Math.max(0, particle.scale - 0.01);

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          // Save context state
          ctx.save();
          
          // Move to particle position
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.scale(particle.scale, particle.scale);

          // Draw particle
          ctx.beginPath();
          ctx.arc(0, 0, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Restore context state
          ctx.restore();
        }
      });

      // Add ambient particles
      if (Math.random() < 0.05) {
        createBurst(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          0.5
        );
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('click', handleInteraction);
      canvas.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto opacity-50"
    />
  );
};

export default ColorSplash; 