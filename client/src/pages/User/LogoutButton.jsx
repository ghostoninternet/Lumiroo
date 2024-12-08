import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, AlertTriangle, X, ArrowRight } from 'lucide-react';

const LogoutButton = ({ onLogout }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-2 px-6 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          whileHover="animate"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:rotate-12" />
        </motion.div>
        <span className="font-medium">ログアウト</span>
      </motion.button>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowConfirm(false)}
            />
            
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl p-8 w-[420px] mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <motion.button
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(false)}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center">
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      delay: 0.2
                    }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-red-100 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: {
                        duration: 0.5,
                        delay: 0.3,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <AlertTriangle className="w-10 h-10 text-red-500 relative z-10" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3 }
                  }}
                >
                  ログアウトの確認
                </motion.h2>

                <motion.p
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.4 }
                  }}
                >
                  システムからログアウトしてもよろしいですか？
                </motion.p>

                <div className="flex gap-3 justify-center">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.03, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirm(false)}
                  >
                    <X className="w-4 h-4" />
                    <span>キャンセル</span>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-lg shadow-red-500/30"
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onLogout();
                      setShowConfirm(false);
                    }}
                  >
                    <span>ログアウト</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LogoutButton;