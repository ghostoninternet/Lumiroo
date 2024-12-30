import { FaEye, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Pagination from "../../../../components/PlaygroundList/Pagination";
import { useNavigate } from "react-router-dom";
import convertTimeToString from "../../../../utils/convertTimeToString";
import { deletePlayground } from "../../../../apis/admin";

function PlaygroundTable({
  displayPlaygrounds,
  pagination,
  onPageChange,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        await deletePlayground(id);
        onDelete(); // Refresh playground list
      } catch (error) {
        console.error("Error deleting playground:", error);
      }
    }
  };

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
                  料金-べトナムドン
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
              {displayPlaygrounds?.map((playground, index) => (
                <motion.tr
                  key={playground?._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-green-50/50 group transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm font-bold text-green-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {playground?._id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 group-hover:text-green-700">
                    {playground?.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {playground?.admissionFee}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 group-hover:text-green-600 transition-colors">
                    {convertTimeToString(playground?.openingTime)}-
                    {convertTimeToString(playground?.closingTime)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigate(`/admin/playgrounds/${playground?._id}`); // Đường dẫn cho admin view
                        }} // Đảm bảo đường dẫn này đúng
                        className="p-2 text-green-600 hover:text-green-500 hover:bg-green-50 
                                rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        title="詳細を見る"
                      >
                        <FaEye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(playground?._id)}
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
              表示: {displayPlaygrounds?.length} 件
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PlaygroundTable;
