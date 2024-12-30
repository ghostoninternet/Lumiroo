import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import PlaygroundInfo from "./PlaygroundInfo";
import PlaygroundBreadcrumb from "./PlaygroundBreadcrumb";
import { getPlaygroundDetails } from "../../../../../apis/playground";
import { updatePlayground } from "../../../../../apis/admin";

function PlaygroundDetail() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [playground, setPlayground] = useState({});

  const fetchPlaygroundData = async () => {
    try {
      const { data } = await getPlaygroundDetails(id);
      setPlayground(data);
    } catch (err) {
      console.error("Error fetching playground:", err);
    }
  };

  useEffect(() => {
    fetchPlaygroundData();
  }, [id, isEditing]);

  const handleOnSave = async (playgroundId, updateData) => {
    await updatePlayground(playgroundId, updateData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto p-6"
      >
        <PlaygroundBreadcrumb />
        {/* Header with Edit Button */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-green-600">遊び場詳細</h1>
            <p className="text-sm text-gray-600">
              遊び場の情報を確認・編集できます。
            </p>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-500 
                       text-white font-medium rounded-xl shadow-sm
                       hover:shadow-md hover:from-green-500 hover:to-green-400
                       transition-all duration-200 gap-2"
            >
              <Pencil className="w-4 h-4" />
              <span>編集</span>
            </motion.button>
          )}
        </div>

        {/* Playground Information */}
        <PlaygroundInfo
          data={playground}
          isEditing={isEditing}
          onSave={handleOnSave}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    </div>
  );
}

export default PlaygroundDetail;
