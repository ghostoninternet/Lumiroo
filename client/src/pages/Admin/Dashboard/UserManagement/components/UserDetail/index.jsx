import React from 'react';
import { motion } from 'framer-motion';
import UserInfo from './UserInfo';

function UserDetail() {
  // Mock data cho user
  const userData = {
    name: "Admin1",
    address: "日本、東京都渋谷区神宮前",
    birthDate: "2000年4月23日",
    status: "アクティブ",
    role: "ユーザー"
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1000px] mx-auto p-6"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-600">ユーザー情報</h1>
          <p className="text-sm text-gray-500">ユーザーの詳細情報を確認できます。</p>
        </div>

        {/* User Information */}
        <UserInfo data={userData} />
      </motion.div>
    </div>
  );
}

export default UserDetail;