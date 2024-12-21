import React from 'react';
import { motion } from 'framer-motion';
import UserFilter from './components/UserFilter';
import UserTable from './components/UserTable';

function UserManagement() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600">ユーザー管理</h1>
          <p className="text-sm text-gray-500">ユーザーの一覧と管理が可能です。</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <UserFilter />
          <UserTable />
        </div>
      </motion.div>
    </div>
  );
}

export default UserManagement;