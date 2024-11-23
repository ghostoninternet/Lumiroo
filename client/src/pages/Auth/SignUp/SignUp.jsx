import React, { useState } from "react";
import { signUp } from "../../../apis/auth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    email: "gioitrongxuan@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    birthDate: "2003-02-21",
    gender: "男性",
    address: "",
    firstName: "Duong",
    lastName: "Gioi",
    phoneNumber: "03232020324",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    try {
      const response = await signUp(formData);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl flex space-x-6"
      >
        {/* Section 1: Avatar */}
        <div className="w-1/3 flex flex-col items-center border-r border-gray-300 pr-4">
          <img
            src={avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border border-gray-300"
          />
          <label className="text-blue-500 cursor-pointer">
            アバターを選択
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Section 2: Form */}
        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード確認
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              生年月日
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              性別
            </label>
            <div className="mt-1 flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="男性"
                  checked={formData.gender === "男性"}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                男性
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="女性"
                  checked={formData.gender === "女性"}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                女性
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="その他"
                  checked={formData.gender === "その他"}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                その他
              </label>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              住所
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              名
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              姓
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              電話番号
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-2 flex justify-between items-center">
            <Link to="/auth/sign-in" className="text-blue-500">
              アカウントをお持ちですか？ログインへ
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
            >
              登録
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
