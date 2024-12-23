import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Sparkles } from 'lucide-react';

function AttractionSelect({ 
  attractions,
  checkedAttractions,
  setCheckedAttractions,
  className 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previousState, setPreviousState] = useState([]);

  const handleExpandClick = () => {
    setPreviousState([...checkedAttractions]);
    setIsExpanded(true);
  };

  const handleConfirm = () => {
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setCheckedAttractions(previousState);
    setIsExpanded(false);
  };

  const filteredAttractions = attractions.filter(attraction =>
    attraction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-5 h-5 text-green-600" />
        <label className="text-sm font-bold text-green-600">
          アトラクション
        </label>
      </div>

      {/* Preview Grid */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {attractions.slice(0, 8).map((attraction, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 text-sm hover:text-green-600 
                       transition-colors cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checkedAttractions[index]}
                onChange={(e) => {
                  const newState = [...checkedAttractions];
                  newState[index] = e.target.checked;
                  setCheckedAttractions(newState);
                }}
                className="rounded border-gray-300 text-green-600 
                         focus:ring-green-500 cursor-pointer"
              />
              <span className="group-hover:text-green-600 transition-colors">
                {attraction}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Expand Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleExpandClick}
        className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-500 
                 text-white font-medium rounded-xl shadow-sm
                 hover:from-green-500 hover:to-green-400
                 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>もっと</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-bold text-green-600">
                      アトラクション
                    </h3>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="検索"
                      className="w-full pl-10 pr-4 py-2 text-sm border-2 border-gray-200 
                             rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 
                             focus:border-green-500 hover:border-green-400 
                             transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-4 bg-white max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4">
                    {filteredAttractions.map((attraction, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 text-sm hover:text-green-600 
                                 transition-colors cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={checkedAttractions[index]}
                          onChange={(e) => {
                            const newState = [...checkedAttractions];
                            newState[index] = e.target.checked;
                            setCheckedAttractions(newState);
                          }}
                          className="rounded border-gray-300 text-green-600 
                                   focus:ring-green-500 cursor-pointer"
                        />
                        <span className="group-hover:text-green-600 transition-colors">
                          {attraction}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 
                           bg-white border-2 border-gray-300 rounded-xl 
                           hover:bg-gray-50 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-6 py-2.5 text-sm font-medium text-white 
                           bg-gradient-to-r from-green-600 to-green-500
                           hover:from-green-500 hover:to-green-400
                           rounded-xl shadow-sm hover:shadow transition-all duration-200"
                  >
                    確認する
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AttractionSelect;