// Loaders.jsx - FIXED VERSION
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loaders = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBreaking(true), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isBreaking) {
      setTimeout(() => setIsZooming(true), 800);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500); // Complete after zoom animation
    }
  }, [isBreaking, onComplete]);

  if (!isZooming) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="relative w-[200px] h-[40px]">
          {/* Counter */}
          <motion.div
            animate={{ opacity: isBreaking ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -bottom-24 left-0 text-white text-[80px] font-light"
          >
            {progress}
          </motion.div>

          {/* Background Bar */}
          <motion.div
            animate={{ opacity: isBreaking ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#333]"
          />

          {/* Empty Bar */}
          <motion.div
            animate={{ opacity: isBreaking ? 0 : 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="absolute inset-0 bg-[#333]"
          />

          {/* Filled Bar / L Shape */}
          <motion.div
            initial={{ width: '0%' }}
            animate={
              isBreaking
                ? {
                    width: '40px',
                    height: '120px',
                    y: -80,
                    transition: { duration: 1, ease: [0.4, 0, 0.6, 1] }
                  }
                : { width: `${progress}%` }
            }
            className="absolute left-0 top-0 h-full bg-white"
          />

          {/* Horizontal Part of L */}
          {isBreaking && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1, ease: [0.4, 0, 0.6, 1] }}
              className="absolute left-0 top-0 h-[40px] bg-white"
            />
          )}
        </div>

        {/* Top Line */}
        <div className="fixed top-0 left-0 w-full h-px bg-[#333]" />
      </div>
    );
  }

  // Zoom phase
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="fixed inset-0 bg-white z-[9999]"
    />
  );
};

export default Loaders;
