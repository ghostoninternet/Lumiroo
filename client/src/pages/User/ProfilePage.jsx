import React, { useState } from "react";
import { faker } from '@faker-js/faker';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const backgroundImageUrl = faker.image.url();

  return (
    <div className="min-h-screen bg-green-100 p-8">
      {/* Background image */}
      <div
        className="w-full h-40 bg-gray-300 rounded-lg mb-6"
        style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover' }}
      ></div>

      {/* Profile card */}
      <div className="bg-white shadow-md rounded-lg p-6 bg-green-50">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span>ホームページ</span> &gt; <span>プロフィール</span>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>

          {/* User name */}
          <div className="ml-4 flex items-center">
            <span className="text-xl font-bold">ユーザーの名前</span>
            <button
              className="ml-2 p-1 text-gray-600 hover:text-gray-800"
              onClick={() => setEditMode(!editMode)}
            >
              <i className="fas fa-pen"></i>
            </button>
          </div>
        </div>

        {/* User Details Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              住所
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!editMode}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                生年月日
              </label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                電話番号
              </label>
              <input
                type="tel"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                disabled={!editMode}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              性別
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="男性"
                  disabled={!editMode}
                />
                <span className="ml-2">男性</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="女性"
                  disabled={!editMode}
                />
                <span className="ml-2">女性</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="その他"
                  disabled={!editMode}
                />
                <span className="ml-2">その他</span>
              </label>
            </div>
          </div>
        </form>

        {/* Save Button */}
        {editMode && (
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={() => setEditMode(false)}
          >
            変更の保存
          </button>
        )}

        {/* Logout Button */}
        <button
          className="mt-6 text-red-600 hover:underline"
          onClick={() => window.location.href = "/auth/sign-in"}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
