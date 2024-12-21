import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Pagination from '../../../../components/PlaygroundList/Pagination';
import { useNavigate } from 'react-router-dom';  

function PlaygroundTable() {
  const navigate = useNavigate();
  const playgrounds = [
    { id: "00000001", name: "Place#1", attractions: "300000", price: "300000", hours: "8:00-16:00" },
    { id: "00000002", name: "Place#2", attractions: "300000", price: "300000", hours: "8:00-16:00" },
    { id: "00000003", name: "Place#3", attractions: "300000", price: "300000", hours: "8:00-16:00" },
    { id: "00000004", name: "Place#4", attractions: "300000", price: "300000", hours: "8:00-16:00" },
    { id: "00000005", name: "Place#5", attractions: "300000", price: "300000", hours: "8:00-16:00" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-50 to-white border-b-2 border-green-500/20">
                <th className="py-4 px-6 text-left font-bold text-green-700 w-16 uppercase text-xs tracking-wider">
                  #
                </th>
                <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">
                  場所ID
                </th>
                <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">
                  施設名
                </th>
                <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">
                  アトラクション
                </th>
                <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">
                  料金
                </th>
                <th className="py-4 px-6 text-left font-bold text-green-700 uppercase text-xs tracking-wider">
                  営業時間
                </th>
                <th className="py-4 px-6 text-center font-bold text-green-700 uppercase text-xs tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {playgrounds.map((playground, index) => (
                <motion.tr
                  key={playground.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-green-50/50 group transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm font-bold text-green-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {playground.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 group-hover:text-green-700">
                    {playground.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {playground.attractions}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    ¥{playground.price}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {playground.hours}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-3">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        navigate(`/admin/playgrounds/${playground.id}`); // Đường dẫn cho admin view
                      }}  // Đảm bảo đường dẫn này đúng
                      className="p-2 text-green-600 hover:text-green-500 hover:bg-green-50 
                                rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      title="詳細を見る"
                    >
                      <FaEye className="w-4 h-4" />
                    </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-500 
                                 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        title="削除"
                      >
                        <FaTrash className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t-2 border-green-500/20 bg-gradient-to-br from-green-50 to-white">
          <div className="flex justify-between items-center">
            <div className="text-sm text-green-600 font-medium">
              表示: {playgrounds.length} 件
            </div>
            <Pagination
              currentPage={1}
              totalPages={5}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PlaygroundTable;