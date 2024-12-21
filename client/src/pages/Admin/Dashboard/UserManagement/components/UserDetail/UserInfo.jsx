import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Calendar, Activity, UserCheck, XCircle, Save, ChevronDown } from 'lucide-react';
import cr7Image from '../../../../../../assets/cr7.jpg';

function UserInfo({ data }) {
  const roles = ['管理者', 'スタッフ', 'ゲスト'];
  const statuses = ['アクティブ', '非アクティブ'];

  const [selectedRole, setSelectedRole] = useState(data?.role || roles[0]);
  const [selectedStatus, setSelectedStatus] = useState(data?.status || statuses[0]);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const roleDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DropdownOption = ({ value, onClick }) => (
    <motion.div
      whileHover={{ backgroundColor: '#f0fdf4' }}
      className="px-4 py-2.5 cursor-pointer text-gray-900 hover:text-green-600 transition-all"
      onClick={onClick}
    >
      {value}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-visible relative"
    >
      {/* User Avatar Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
        <div className="flex items-center space-x-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white"
          >
            <img 
              src={cr7Image} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-1">{data?.name}</h2>
            <p className="text-sm text-gray-600">{data?.email}</p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="p-6 space-y-6">
        {/* Address */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">住所</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
            {data?.address}
          </div>
        </motion.div>

        {/* Birth Date */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">生年月日</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
            {data?.birthDate}
          </div>
        </motion.div>

        {/* Status Dropdown */}
        <div className="space-y-2 relative" ref={statusDropdownRef}>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">ステータス</label>
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-green-500 rounded-xl text-sm text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
          >
            {selectedStatus}
            <ChevronDown
              className={`w-5 h-5 text-green-600 transform transition-transform duration-300 ${
                isStatusOpen ? 'rotate-180' : ''
              }`}
            />
          </motion.div>
          <AnimatePresence>
            {isStatusOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                style={{ position: 'absolute', left: 0, right: 0, zIndex: 50 }}
                className="bg-white shadow-xl rounded-xl mt-2 border border-gray-100 overflow-hidden"
              >
                {statuses.map((status, index) => (
                  <DropdownOption
                    key={index}
                    value={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsStatusOpen(false);
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Role Dropdown */}
        <div className="space-y-2 relative" ref={roleDropdownRef}>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">役割</label>
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-green-500 rounded-xl text-sm text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setIsRoleOpen(!isRoleOpen)}
          >
            {selectedRole}
            <ChevronDown
              className={`w-5 h-5 text-green-600 transform transition-transform duration-300 ${
                isRoleOpen ? 'rotate-180' : ''
              }`}
            />
          </motion.div>
          <AnimatePresence>
            {isRoleOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                style={{ position: 'absolute', left: 0, right: 0, zIndex: 50 }}
                className="bg-white shadow-xl rounded-xl mt-2 border border-gray-100 overflow-hidden"
              >
                {roles.map((role, index) => (
                  <DropdownOption
                    key={index}
                    value={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsRoleOpen(false);
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl transition-colors shadow-sm flex items-center space-x-2"
          >
            <XCircle className="w-5 h-5 text-gray-700" />
            <span>キャンセル</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#22c55e' }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 border-2 border-green-500 rounded-xl transition-colors shadow-sm flex items-center space-x-2"
          >
            <Save className="w-5 h-5 text-white" />
            <span>完了</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default UserInfo;