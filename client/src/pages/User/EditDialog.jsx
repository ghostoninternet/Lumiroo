import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EditDialog = ({ isOpen, onClose, onSave, title, currentValue, fieldType = 'text' }) => {
  const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fieldType === 'gender') {
      const selectedGender = e.target.querySelector('input[name="gender"]:checked')?.value;
      if (selectedGender) onSave(selectedGender);
    } else {
      const formData = new FormData(e.target);
      onSave(formData.get('value'));
    }
  };

  const renderInput = () => {
    if (fieldType === 'gender') {
      return (
        <div className="flex flex-col gap-4">
          {['男性', '女性', 'その他'].map((option) => (
            <label key={option} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={option}
                defaultChecked={currentValue === option}
                className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-base text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    return (
      <input
        name="value"
        type={fieldType}
        defaultValue={currentValue}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        autoFocus
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden z-10"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {title}の編集
              </h3>
              <motion.button
                type="button"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            <div className="p-6">
              {renderInput()}
            </div>

            <div className="flex justify-end gap-3 p-4 bg-gray-50">
              <motion.button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                キャンセル
              </motion.button>
              <motion.button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                保存
              </motion.button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditDialog;