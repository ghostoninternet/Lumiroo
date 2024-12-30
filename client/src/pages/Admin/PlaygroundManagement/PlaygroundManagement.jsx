import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlaygroundFilter from "./components/PlaygroundFilter";
import PlaygroundTable from "./components/PlaygroundTable";
import { useState, useEffect, useMemo } from "react";
import { filterPlaygrounds } from "../../../apis/playground";
import convertStringToTime from "../../../utils/convertStringToTime";

function PlaygroundManagement() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limitPerPage: 4,
  });

  const [playgrounds, setPlaygrounds] = useState([]);
  const [formData, setFormData] = useState({
    area: "",
    openTime: "",
    closeTime: "",
    minPrice: "",
    maxPrice: "",
    searchKeyword: "",
  });

  const displayPlaygrounds = useMemo(
    () =>
      playgrounds?.filter((item) =>
        item?.name.toLowerCase().includes(formData.searchKeyword.toLowerCase())
      ),
    [playgrounds, formData.searchKeyword]
  );

  const fetchPlaygrounds = async () => {
    try {
      const queryParams = new URLSearchParams({
        minAdmissionFee: formData.minPrice || 0,
        maxAdmissionFee: formData.maxPrice || 9999999999,
        limit: pagination.limitPerPage,
        page: pagination.currentPage,
      });

      if (formData.openTime) {
        queryParams.append(
          "openingTime",
          convertStringToTime(formData.openTime)
        );
        console.log(
          "convertStringToTime(formData.openTime): ",
          convertStringToTime(formData.openTime)
        );
      }

      if (formData.closeTime) {
        queryParams.append(
          "closingTime",
          convertStringToTime(formData.closeTime) + 12 * 60 * 60
        );
      }

      if (formData.area) {
        queryParams.append("area", formData.area);
      }

      const { data } = await filterPlaygrounds(queryParams);
      setPlaygrounds(data.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPage,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  useEffect(() => {
    fetchPlaygrounds();
  }, [
    formData.area,
    formData.openTime,
    formData.closeTime,
    formData.minPrice,
    formData.maxPrice,
    pagination.currentPage,
  ]);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-600">遊び場管理</h1>
            <p className="text-sm text-gray-500">
              遊び場の一覧と管理が可能です。
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/playgrounds/add")}
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r 
                     from-green-600 to-green-500 text-white font-medium rounded-xl 
                     shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400
                     transition-all duration-200 gap-2.5 group"
          >
            <div
              className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 
                        transition-colors"
            >
              <Plus className="w-4 h-4" />
            </div>
            <span>遊び場追加</span>
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PlaygroundFilter onSearch={setFormData} />
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PlaygroundTable
              displayPlaygrounds={displayPlaygrounds}
              pagination={pagination}
              onPageChange={handlePageChange}
              onDelete={fetchPlaygrounds}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default PlaygroundManagement;
