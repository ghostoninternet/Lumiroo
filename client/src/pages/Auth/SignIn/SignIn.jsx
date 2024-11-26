import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng
import amusementParkSVG from "../../../assets/amusement-park-animate.svg";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieAnimation from "../../../assets/ride-animation.json";
import TransitionWrapper from "../../../components/TransitionWrapper"; // Import TransitionWrapper
import { signIn } from "../../../apis/auth";

const SignIn = () => {
  const navigate = useNavigate(); // Dùng để điều hướng
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setError("");
    await signIn({ email, password });
    navigate('/playground-recommendation');
    console.log("ログイン成功:", { email, password });
  };

  return (
    <TransitionWrapper direction={1}> {/* Điều chỉnh hướng trượt */}
      <div className="min-h-screen flex">
        {/* Phần bên trái */}
        <motion.div
          className="w-1/2 bg-green-100 flex flex-col justify-center items-center p-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Lumiroo */}
          <motion.h1
            className="text-center text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-6 tracking-wide z-10"
            whileHover={{ scale: 1.1 }}
          >
            Lumiroo
          </motion.h1>
          {/* Animation */}
          <Player
            autoplay
            loop
            src={lottieAnimation}
            className="w-3/4 h-auto mb-8 z-10"
          />
          <h2 className="text-3xl font-extrabold text-green-700 mb-4 mt-4 z-10">
            新しいユーザーですか？
          </h2>
          <p className="text-gray-800 text-center mb-6 z-10">
            まだアカウントをお持ちでない場合は、今すぐ登録してください。
          </p>
          <button
            onClick={() => navigate("/auth/sign-up")} // Điều hướng sang SignUp
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 z-10"
          >
            <i className="fa-solid fa-user"></i> サインアップ
          </button>
        </motion.div>

        {/* Phần bên phải */}
        <motion.div
          className="w-1/2 bg-gradient-to-b from-white to-green-50 flex flex-col justify-center items-center p-10 shadow-2xl relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Họa tiết nền */}
          <img
            src={amusementParkSVG}
            alt="Amusement Park"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
          />

          {/* Title: Sign In */}
          <motion.h1
            className="text-center text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-8 tracking-wide z-10"
            whileHover={{ scale: 1.1 }}
          >
            サインイン
          </motion.h1>
          <p className="text-lg font-bold text-green-700 bg-green-100 p-2 rounded-lg mb-8 z-10">
            楽しい時間を見つけるための最適な場所！
          </p>

          <form onSubmit={handleSubmit} className="w-3/4 z-10">
            {/* Email */}
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例: abc12345@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 transition duration-300 shadow-sm"
              required
            />

            {/* Password */}
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力してください"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-sm"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙉" : "🙈"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-medium py-3 mt-6 rounded-lg hover:bg-green-600 shadow-lg transition duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fa-solid fa-right-to-bracket"></i> ログイン
            </motion.button>
          </form>

          <p className="text-sm text-gray-700 mt-4">
            またはソーシャルアカウントでログイン
          </p>
          <div className="flex justify-center items-center mt-2 space-x-4 z-10">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <i className="fab fa-google fa-2x"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </TransitionWrapper>
  );
};

export default SignIn;
