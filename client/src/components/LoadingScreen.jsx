import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#16a34a] via-green-500 to-green-400 z-50">
      <motion.div
        className="relative bg-white p-8 rounded-2xl shadow-xl max-w-sm mx-auto text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-[#16a34a] border-t-transparent border-solid rounded-full mx-auto"
          style={{
            animation: 'spin 1s linear infinite',
          }}
        ></motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-xl font-bold text-[#16a34a] mt-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          読み込み中
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            ...
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Custom animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
