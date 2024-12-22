import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import PlaygroundFilter from './components/PlaygroundFilter';
import PlaygroundTable from './components/PlaygroundTable';

function PlaygroundManagement() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto"
      >
        {/* Breadcrumb */}
        {/* <nav className="mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/admin" className="text-gray-500 hover:text-green-600 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <span className="text-green-600 font-medium">遊び場管理</span>
            </li>
          </ol>
        </nav> */}

        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
          <h1 className="text-2xl font-bold text-green-600">遊び場管理</h1>
          <p className="text-sm text-gray-500">遊び場の一覧と管理が可能です。</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/playgrounds/add')}
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r 
                     from-green-600 to-green-500 text-white font-medium rounded-xl 
                     shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400
                     transition-all duration-200 gap-2.5 group"
          >
            <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 
                        transition-colors">
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
            <PlaygroundFilter />
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PlaygroundTable />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default PlaygroundManagement;