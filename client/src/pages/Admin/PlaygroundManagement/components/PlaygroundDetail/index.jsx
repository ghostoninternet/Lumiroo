import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import PlaygroundInfo from './PlaygroundInfo';
import PlaygroundBreadcrumb from './PlaygroundBreadcrumb';

function PlaygroundDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  const mockData = {
    id: id,
    name: "Place#1",
    image: null,
    openTime: "8:00",
    closeTime: "16:00",
    ticket: "300000",
    attractions: ['プール', 'レストラン', 'お化け屋敷', 'ローラー',
                 '観覧車', 'メリーゴーランド', 'コースター', 'キャラバン'],
    checkedAttractions: [true, true, false, true, false, true, false, true],
    description: "遊び場の詳細情報です。\n様々なアトラクションをお楽しみいただけます。"
  };

  const [playgroundData, setPlaygroundData] = useState(mockData);

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
            <p className="text-sm text-gray-600">遊び場の情報を確認・編集できます。</p>
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
          data={playgroundData} 
          isEditing={isEditing}
          onSave={async (updatedData) => {
            // Mock API update
            console.log('Saving updated data:', updatedData);
            setPlaygroundData(updatedData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    </div>
  );
}

export default PlaygroundDetail;