import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ onLogout }) => {
  return (
    <motion.button
      onClick={onLogout}
      className="inline-flex items-center gap-2 px-6 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">ログアウト</span>
    </motion.button>
  );
};

export default LogoutButton;