// components/AttractionTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';

const AttractionTable = ({ attractions = [], onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-green-50 to-white border-b-2 border-green-500/20">
              <th className="py-4 px-6 text-left font-bold text-green-700 w-16 uppercase text-xs tracking-wider">#</th>
              <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">アトラクション名</th>
              <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">説明</th>
              <th className="py-4 px-6 text-center font-bold text-green-700 uppercase text-xs tracking-wider w-32">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {attractions.map((attraction, index) => (
              <motion.tr
                key={attraction.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-green-50/50 group transition-all duration-200"
              >
                <td className="py-4 px-6 text-sm font-bold text-green-600">{index + 1}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 group-hover:text-green-700">{attraction.name}</td>
                <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors line-clamp-1">{attraction.description}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(attraction)}
                      className="p-2 text-green-600 hover:text-green-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      title="編集"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#fef2f2' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(attraction)}
                      className="p-2 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AttractionTable;