// components/AttractionHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plus} from 'lucide-react';

const AttractionHeader = ({ onAddNew }) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-green-600">アトラクション</h1>
          </div>
          <p className="text-sm text-gray-600">アトラクションの一覧を管理します。</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddNew}
          className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-500 
                   text-white font-medium rounded-xl shadow-sm
                   hover:shadow-md hover:from-green-500 hover:to-green-400
                   transition-all duration-200 gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>新規追加</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AttractionHeader;