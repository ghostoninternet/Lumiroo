// components/AttractionForm.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Pencil, Type, FileText, Save, XCircle } from 'lucide-react';

const AttractionForm = ({ attraction, onClose, onSubmit }) => {
  const isEdit = !!attraction;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 overflow-hidden border border-green-100"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center gap-2">
              {isEdit ? (
                <Pencil className="w-6 h-6 text-green-600" />
              ) : (
                <Plus className="w-6 h-6 text-green-600" />
              )}
              <h2 className="text-xl font-bold text-green-600">
                {isEdit ? 'アトラクションを編集' : '新しいアトラクション'}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-green-600">
                <Type className="w-4 h-4" />
                アトラクション名
              </label>
              <input
                type="text"
                defaultValue={attraction?.name}
                placeholder="アトラクション名を入力してください"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-green-600">
                <FileText className="w-4 h-4" />
                説明
              </label>
              <textarea
                defaultValue={attraction?.description}
                placeholder="アトラクションの説明を入力してください"
                rows={4}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         outline-none transition-all shadow-sm resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl
                       hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              <span>キャンセル</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#22c55e' }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 text-white bg-green-600 rounded-xl
                       hover:bg-green-500 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? '更新' : '追加'}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AttractionForm;