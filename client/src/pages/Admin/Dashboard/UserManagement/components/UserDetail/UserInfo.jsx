import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Activity, UserCheck } from 'lucide-react';

function UserInfo({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border-2 border-green-500/20 overflow-hidden"
    >
      {/* User Avatar Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="p-6 space-y-6">
        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">住所</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
            {data.address}
          </div>
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">生年月日</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
            {data.birthDate}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">ステータス</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
            {data.status}
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            <label className="text-sm font-bold text-green-600">役割</label>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-900">
            {data.role}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white 
                    border-2 border-gray-300 rounded-xl hover:bg-gray-50 
                    transition-colors shadow-sm"
          >
            戻る
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default UserInfo;