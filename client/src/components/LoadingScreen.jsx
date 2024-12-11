import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      {/* Animated Dots */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <motion.span
            key={index}
            className="w-4 h-4 rounded-full bg-[#16a34a]"
            animate={{
              y: [0, -10, 0], // Move up and down
              opacity: [0.7, 1, 0.7], // Fade in and out
            }}
            transition={{
              duration: 0.8, // Total time for one loop
              repeat: Infinity, // Infinite loop
              delay: index * 0.2, // Stagger animation for each dot
            }}
          ></motion.span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
