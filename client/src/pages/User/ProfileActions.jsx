import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Check, ArrowRight } from 'lucide-react';
import LogoutButton from './LogoutButton';

const ProfileActions = ({ onSave, onLogout }) => {
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setShowSaveConfirm(false);
    await onSave();
    setShowSuccess(true);
    // Auto hide success notification after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

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

  const successVariants = {
    hidden: { 
      opacity: 0,
      y: -100,
      x: "-50%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8 px-6">
        <LogoutButton onLogout={onLogout} />
        
        <motion.button
          onClick={() => setShowSaveConfirm(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Save className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">変更の保存</span>
        </motion.button>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-4 left-1/2 z-50"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="bg-white rounded-full shadow-lg py-3 px-6 flex items-center gap-3">
              <motion.div 
                className="bg-green-100 rounded-full p-1"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ 
                  rotate: 0,
                  opacity: 1,
                  transition: { delay: 0.2 }
                }}
              >
                <Check className="w-4 h-4 text-green-600" />
              </motion.div>
              <motion.span
                className="text-gray-700 font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.3 }
                }}
              >
                変更が正常に保存されました
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full opacity-10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Confirmation Modal */}
      <AnimatePresence>
        {showSaveConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowSaveConfirm(false)}
            />
            
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl p-8 w-[420px] mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSaveConfirm(false)}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center">
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center"
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
                    className="absolute inset-0 bg-green-100 rounded-full"
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
                    <Check className="w-10 h-10 text-green-500 relative z-10" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3 }
                  }}
                >
                  変更の保存
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
                  変更内容を保存してもよろしいですか？
                </motion.p>

                <div className="flex gap-3 justify-center">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.03, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSaveConfirm(false)}
                  >
                    <X className="w-4 h-4" />
                    <span>キャンセル</span>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-colors shadow-lg shadow-green-500/30"
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                  >
                    <span>保存する</span>
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

export default ProfileActions;