import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  CreditCard,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { getAreas } from "../../../../apis/playground";

const DropdownPortal = ({ children, isOpen, targetRef }) => {
  const [portalNode] = useState(() => document.createElement("div"));

  useEffect(() => {
    if (isOpen) {
      document.body.appendChild(portalNode);
      return () => {
        document.body.removeChild(portalNode);
      };
    }
  }, [isOpen, portalNode]);

  if (!isOpen || !targetRef.current) return null;

  const { left, top, width } = targetRef.current.getBoundingClientRect();

  return createPortal(
    <div
      style={{
        position: "fixed",
        left: `${left}px`,
        top: `${top + targetRef.current.offsetHeight + 8}px`,
        width: `${width}px`,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    portalNode
  );
};

const PlaygroundFilter = ({ onSearch }) => {
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    area: "",
    openTime: "",
    closeTime: "",
    minPrice: "",
    maxPrice: "",
    searchKeyword: "",
  });

  const [selectedArea, setSelectedArea] = useState({ name: "すべての地域" });
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const selectedRef = useRef(null);

  const fetchAreas = async () => {
    try {
      const response = await getAreas();
      setAreas(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !selectedRef.current.contains(event.target)
      ) {
        setShowAreaDropdown(false);
      }
    };

    if (showAreaDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAreaDropdown]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target === document
      ) {
        setShowAreaDropdown(false);
      }
    };

    if (showAreaDropdown) {
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showAreaDropdown]);

  const handleSearchKey = (e) => {
    const newFormData = { ...formData, searchKeyword: e.target.value };
    setFormData(newFormData);
    onSearch(newFormData); // Pass new form data directly
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden border-2 border-green-500/20"
    >
      <div className="p-6 space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Search Input */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Search className="w-5 h-5 text-green-600" />
              <label className="text-sm font-bold text-green-600">
                キーワード
              </label>
            </div>
            <div className="relative group">
              <input
                type="text"
                placeholder="キーワードを入力"
                value={formData.searchKeyword}
                onChange={(e) => handleSearchKey(e)}
                className="w-full pl-4 pr-4 py-3 bg-white border-2 border-gray-200 
                         rounded-xl focus:ring-0 focus:border-green-500
                         hover:border-green-400 transition-all duration-200 text-sm
                         shadow-sm hover:shadow-md outline-none"
              />
            </div>
          </motion.div>

          {/* Area Dropdown */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <label className="text-sm font-bold text-green-600">地域</label>
            </div>
            <div className="relative">
              <button
                ref={selectedRef}
                onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                   text-left hover:border-green-400 focus:ring-0 focus:border-green-500
                   transition-all duration-200 text-sm shadow-sm hover:shadow-md outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{selectedArea?.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 
              ${showAreaDropdown ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <DropdownPortal isOpen={showAreaDropdown} targetRef={selectedRef}>
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border-2 border-gray-200 rounded-xl shadow-xl 
                      max-h-60 overflow-y-auto"
                >
                  {areas.map((area) => (
                    <motion.button
                      key={area?._id}
                      onClick={() => {
                        setSelectedArea(area);
                        setFormData({ ...formData, area: area?.name });
                        setShowAreaDropdown(false);
                      }}
                      whileHover={{ backgroundColor: "rgb(240, 253, 244)" }}
                      className={`w-full px-4 py-3 text-sm text-left transition-colors
                  ${
                    area?.id === selectedArea?.id
                      ? "bg-green-100 text-green-600 font-bold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                    >
                      {area?.name}
                    </motion.button>
                  ))}
                </motion.div>
              </DropdownPortal>
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Time Range */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-green-600" />
              <label className="text-sm font-bold text-green-600">
                営業時間
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative group flex-1">
                <input
                  type="time"
                  value={formData.openTime}
                  onChange={(e) =>
                    setFormData({ ...formData, openTime: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                          rounded-xl focus:ring-0 focus:border-green-500
                          hover:border-green-400 transition-all duration-200 text-sm
                          shadow-sm hover:shadow-md outline-none"
                />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
              <div className="relative group flex-1">
                <input
                  type="time"
                  value={formData.closeTime}
                  onChange={(e) =>
                    setFormData({ ...formData, closeTime: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                          rounded-xl focus:ring-0 focus:border-green-500
                          hover:border-green-400 transition-all duration-200 text-sm
                          shadow-sm hover:shadow-md outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Price Range */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <CreditCard className="w-5 h-5 text-green-600" />
              <label className="text-sm font-bold text-green-600">料金</label>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative group flex-1">
                <input
                  type="text"
                  placeholder="0"
                  value={formData.minPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, minPrice: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                          rounded-xl focus:ring-0 focus:border-green-500
                          hover:border-green-400 transition-all duration-200 text-sm
                          shadow-sm hover:shadow-md outline-none"
                />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
              <div className="relative group flex-1">
                <input
                  type="text"
                  placeholder="9999999999"
                  value={formData.maxPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, maxPrice: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 
                          rounded-xl focus:ring-0 focus:border-green-500
                          hover:border-green-400 transition-all duration-200 text-sm
                          shadow-sm hover:shadow-md outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Button */}
      <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-green-500/20">
        <div className="flex justify-end">
          <motion.button
            onClick={() => onSearch(formData)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 
                     text-white font-bold rounded-xl text-sm
                     shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400
                     transition-all duration-200"
          >
            検索
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaygroundFilter;
