import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Check } from 'lucide-react';

const NotificationDialog = ({ isOpen, onClose, title, message, type = 'error' }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const successVariants = {
    hidden: { opacity: 0, y: -100, x: '-50%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, y: -100, transition: { duration: 0.2 } },
  };

  const renderIcon = () => {
    if (type === 'success') {
      return <Check className="w-5 h-5 text-green-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden z-10"
            variants={type === 'success' ? successVariants : modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {renderIcon()}
                <h3
                  className={`text-lg font-semibold ${
                    type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {title}
                </h3>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            <div className="p-6">
              <p className="text-gray-600">{message}</p>
            </div>

            <div className="flex justify-end p-4 bg-gray-50">
              <motion.button
                onClick={onClose}
                className={`px-4 py-2 text-white rounded-lg transition-colors duration-300 ${
                  type === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                閉じる
              </motion.button>
            </div>
          </motion.div>

          {type === 'success' && (
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDialog;