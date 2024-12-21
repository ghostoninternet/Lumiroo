import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import PlaygroundBreadcrumb from './PlaygroundBreadcrumb';
import PlaygroundInfo from './PlaygroundInfo';

function PlaygroundDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playgroundData, setPlaygroundData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch playground data
    const fetchData = async () => {
      try {
        // API call here
        const response = await fetchPlaygroundById(id);
        setPlaygroundData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching playground data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto p-6"
      >
        {/* Header with Edit Button */}
        <div className="flex justify-between items-start mb-6">
          <PlaygroundBreadcrumb playgroundName={playgroundData?.name} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/admin/playgrounds/${id}/edit`)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 
                     text-white font-medium rounded-xl shadow-sm
                     hover:shadow-md hover:from-green-500 hover:to-green-400
                     transition-all duration-200 gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>編集</span>
          </motion.button>
        </div>

        {/* Playground Information */}
        <PlaygroundInfo data={playgroundData} />
      </motion.div>
    </div>
  );
}

export default PlaygroundDetail;