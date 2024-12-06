import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const ProfileBanner = ({ image, onUpdateImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="w-full h-[27.2rem] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt="Profile Banner"
        className="w-full h-full object-cover object-center transition-transform duration-300"
      />
      
      <motion.button
        onClick={onUpdateImage}
        className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg text-gray-800 hover:bg-white transition-colors duration-200 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Camera className="w-5 h-5" />
        <span className="font-medium">背景を変更</span>
      </motion.button>
    </motion.div>
  );
};

export default ProfileBanner;