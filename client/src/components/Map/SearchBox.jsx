import React from 'react';
import { MapPin, Navigation, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchBox = ({ 
  origin, 
  setOrigin, 
  destination, 
  onSearch, 
  isLoading, 
  onGetCurrentLocation,
  playgroundName
}) => {
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: 'ホームページ', path: '/' },
    { label: '遊び場検索', path: '/playground-recommendation' },
    { label: playgroundName || 'ディズニーランド', path: '/playground-detail' },
    { label: '道順', path: null }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-4 z-[1000] mt-4"
    >
      <div className="bg-white rounded-lg shadow-lg w-[600px] transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] group">
        <div className="border-b border-gray-100 px-6 py-2.5 bg-gradient-to-r from-white to-gray-50 rounded-t-lg transition-colors duration-300 group-hover:from-gray-50 group-hover:to-white">
          <div className="flex items-center gap-2 text-sm whitespace-nowrap min-w-0">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                )}
                {item.path ? (
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-600 hover:text-green-600 transition-all duration-200 shrink-0 hover:scale-105"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-green-600 shrink-0">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2 group/input">
            <label className="text-sm font-bold text-green-600 transition-colors duration-200 group-hover/input:text-green-700">
              出発地
            </label>
            <div className="relative flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="出発地を入力"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-2.5 pl-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 hover:border-green-300"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover/input:text-green-500 transition-colors duration-200" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetCurrentLocation}
                className="px-3.5 py-2.5 bg-gray-100 rounded-lg hover:bg-green-50 transition-all duration-200 hover:shadow-md active:shadow-sm"
                title="現在地を取得"
              >
                <Navigation className="w-4 h-4 text-gray-600 group-hover/input:text-green-600 transition-colors duration-200" />
              </motion.button>
            </div>
          </div>

          <div className="space-y-2 group/input">
            <label className="text-sm font-bold text-green-600 transition-colors duration-200 group-hover/input:text-green-700">
              目的地
            </label>
            <div className="relative">
              <input
                type="text"
                value={destination}
                readOnly
                className="w-full px-4 py-2.5 pl-9 text-sm border border-gray-200 rounded-lg bg-gray-50 transition-all duration-200 
                  group-hover/input:border-green-300 
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  focus:border-green-500"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover/input:text-green-500 transition-colors duration-200" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSearch}
            disabled={isLoading}
            className="w-full py-3 bg-green-600 text-white rounded-lg text-sm font-medium transition-all duration-300 
              hover:bg-green-500 hover:shadow-lg hover:shadow-green-100
              active:bg-green-700 active:shadow-sm
              disabled:bg-gray-400 disabled:shadow-none
              relative overflow-hidden group/button"
          >
            <span className="relative z-10">見つける</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBox;