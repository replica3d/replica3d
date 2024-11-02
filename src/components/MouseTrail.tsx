import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; }[]>([]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    const trailInterval = setInterval(() => {
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, mousePosition];
        if (newTrail.length > 5) {
          return newTrail.slice(1);
        }
        return newTrail;
      });
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(trailInterval);
    };
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 rounded-full bg-indigo-500"
          style={{
            left: position.x - 8,
            top: position.y - 8,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;