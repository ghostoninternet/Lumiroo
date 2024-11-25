import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng giữa các trang
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import amusementParkAnimation from "../../../assets/ride-animation.json";
import amusementParkSVG from "../../../assets/amusement-park-animate.svg";
import TransitionWrapper from "../../../components/TransitionWrapper"; // Import TransitionWrapper

const SignUp = () => {
  const navigate = useNavigate(); // Điều hướng giữa các trang
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "男性",
    address: "",
    phoneNumber: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
  };

  return (
    <TransitionWrapper direction={-1}> {/* Trượt sang trái */}
      <div className="min-h-screen flex overflow-hidden">
        {/* Left Section - Form */}
        <motion.div
          className="w-1/2 relative p-10 shadow-2xl flex flex-col justify-center items-center bg-gradient-to-b from-white to-green-50"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={amusementParkSVG}
            alt="Amusement Park"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
          />
          <motion.form
            onSubmit={handleSubmit}
            className="relative bg-white/70 backdrop-blur-md rounded-lg shadow-xl p-8 z-10 w-3/4"
          >
            {/* Title: 登録 */}
            <motion.h2
              className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-6 tracking-wide z-10"
              whileHover={{ scale: 1.1 }}
            >
              登録
            </motion.h2>
            <div className="flex justify-center mb-6 relative">
              <label
                htmlFor="avatar-upload"
                className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md cursor-pointer flex items-center justify-center bg-white overflow-hidden"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fa-solid fa-plus text-green-500 text-3xl"></i>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              {[ // Các trường thông tin trong form
                { name: "firstName", label: "名", type: "text", icon: "fa-user" },
                { name: "lastName", label: "姓", type: "text", icon: "fa-user" },
                {
                  name: "email",
                  label: "メールアドレス",
                  type: "email",
                  icon: "fa-envelope",
                  colSpan: true,
                },
                {
                  name: "password",
                  label: "パスワード",
                  type: "password",
                  icon: "fa-lock",
                },
                {
                  name: "confirmPassword",
                  label: "パスワード確認",
                  type: "password",
                  icon: "fa-lock",
                },
              ].map(({ name, label, type, icon, colSpan }) => (
                <div className={colSpan ? "col-span-2" : ""} key={name}>
                  <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                    {label}
                    <i className={`fa-solid ${icon} text-green-600`}></i>
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:border-green-500 transition-shadow duration-300"
                  />
                </div>
              ))}

              {/* Birth Date and Gender */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  生年月日
                  <i className="fa-solid fa-calendar text-green-600"></i>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  性別
                  <i className="fa-solid fa-venus-mars text-green-600"></i>
                </label>
                <div className="flex items-center space-x-4">
                  {["男性", "女性", "その他"].map((gender) => (
                    <label key={gender} className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="accent-green-500"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address and Phone Number */}
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  住所
                  <i className="fa-solid fa-map-marker-alt text-green-600"></i>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow duration-300"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  電話番号
                  <i className="fa-solid fa-phone text-green-600"></i>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-medium py-3 mt-6 rounded-lg hover:bg-green-600 shadow-lg transition transform hover:-translate-y-1"
            >
              <i className="fa-solid fa-check"></i> 登録
            </button>
          </motion.form>
        </motion.div>

        {/* Right Section - Animation */}
        <motion.div
          className="w-1/2 bg-green-100 flex flex-col justify-center items-center p-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-8 tracking-wide z-10"
            whileHover={{ scale: 1.1 }}
          >
            Lumiroo
          </motion.h1>
          <Player
            autoplay
            loop
            src={amusementParkAnimation}
            className="w-3/4 h-auto mb-12"
          />
          <h2 className="text-3xl font-extrabold text-green-700 mt-4 mb-4">
            サインインですか？
          </h2>
          <p className="text-gray-800 text-center mb-6">
            すでにアカウントをお持ちの場合は、今すぐログインしてください。
          </p>
          <button
            onClick={() => navigate("/auth/sign-in")}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-right-to-bracket"></i> サインイン
          </button>
        </motion.div>
      </div>
    </TransitionWrapper>
  );
};

export default SignUp;
