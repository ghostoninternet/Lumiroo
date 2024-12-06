import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import LogoutButton from './LogoutButton';

const ProfileActions = ({ onSave, onLogout }) => {
  return (
    <div className="flex justify-between items-center mt-8 px-6">
      <LogoutButton onLogout={onLogout} />
      
      <motion.button
        onClick={onSave}
        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Save className="w-5 h-5" />
        <span className="font-medium">変更の保存</span>
      </motion.button>
    </div>
  );
};

export default ProfileActions;