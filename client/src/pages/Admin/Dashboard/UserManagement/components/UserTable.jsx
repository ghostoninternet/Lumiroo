import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Pagination from '../../../../../components/PlaygroundList/Pagination';
import { useNavigate } from 'react-router-dom';

function UserTable({
  users,
  currentPage,
  setCurrentPage,
  totalPage,
  userDeleteHandler
}) {
    const navigate = useNavigate();
  
  
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
                <th className="py-4 px-6 text-left font-bold text-green-700 w-16">#</th>
                <th className="py-4 px-6 text-left font-bold text-green-700">ID</th>
                <th className="py-4 px-6 text-left font-bold text-green-700">名前</th>
                <th className="py-4 px-6 text-left font-bold text-green-700">年齢</th>
                <th className="py-4 px-6 text-left font-bold text-green-700">電話番号</th>
                <th className="py-4 px-6 text-center font-bold text-green-700">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-green-50/50 group transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm font-bold text-green-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600">
                    {user.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 group-hover:text-green-700">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600">
                    {user.age}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600">
                    {user.phone}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-3">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="p-2 text-green-600 hover:text-green-500 hover:bg-green-50 
                                    rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        title="詳細を見る"
                        >
                        <FaEye className="w-4 h-4" />
                    </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => userDeleteHandler(user.id)}
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
              表示: {users.length} 件
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserTable;