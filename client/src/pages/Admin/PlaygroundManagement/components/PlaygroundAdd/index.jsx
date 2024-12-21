import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PlaygroundBreadcrumb from './PlaygroundBreadcrumb';
import PlaygroundForm from './PlaygroundForm';

function PlaygroundAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    openTime: '',
    closeTime: '',
    ticket: '',
    description: '',
    image: null,
    attractions: [
      'プール', 'レストラン', 'お化け屋敷', 'ローラー',
      '観覧車', 'メリーゴーランド', 'コースター', 'キャラバン',
      'スカイバイキング', '回転木馬'
    ],
    checkedAttractions: new Array(10).fill(false)
  });

  const handleSubmit = async () => {
    try {
      // API call logic here
      navigate('/admin/playgrounds');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto p-6"
      >
        {/* Breadcrumb Navigation */}
        <PlaygroundBreadcrumb />

        {/* Form Section */}
        <PlaygroundForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/playgrounds')}
        />
      </motion.div>
    </div>
  );
}

export default PlaygroundAdd;