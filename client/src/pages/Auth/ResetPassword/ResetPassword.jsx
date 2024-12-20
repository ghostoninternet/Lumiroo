import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaLock, FaArrowLeft } from 'react-icons/fa';
import backgroundImage from '../../../assets/amusement-park-animate.svg';

const ResetPassword = () => {
  const [verificationMethod, setVerificationMethod] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const containerAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  const formFieldAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 overflow-hidden"
         style={{
           backgroundImage: `url(${backgroundImage})`,
           backgroundSize: 'contain',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }}
            className="text-center mb-8"
          >
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-8 tracking-wide z-10"
              // className="inline-block text-4xl font-bold text-green-500"
            >
              パスワードの忘れ
            </motion.span>
          </motion.div>

          <form className="space-y-6">
            <motion.div 
              className="bg-green-50/80 rounded-2xl p-6"
              variants={formFieldAnimation}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-semibold text-green-600 mb-4">
                確認方法を選択してください
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                    verificationMethod === 'email'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-green-100'
                  }`}
                  onClick={() => setVerificationMethod('email')}
                >
                  <FaEnvelope className={`text-2xl ${verificationMethod === 'email' ? 'text-white' : 'text-green-500'}`} />
                  <span>メール確認</span>
                </motion.button>

                <motion.button
                  type="button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                    verificationMethod === 'phone'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-green-100'
                  }`}
                  onClick={() => setVerificationMethod('phone')}
                >
                  <FaPhone className={`text-2xl ${verificationMethod === 'phone' ? 'text-white' : 'text-green-500'}`} />
                  <span>SMS確認</span>
                </motion.button>
              </div>
            </motion.div>

            {verificationMethod && (
              <motion.div
                variants={formFieldAnimation}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {verificationMethod === 'email' && (
                  <div className="relative">
                    <label className="block text-lg font-medium text-green-600 mb-2">
                      メールアドレス
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 transition duration-300"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                )}

                {verificationMethod === 'phone' && (
                  <div className="relative">
                    <label className="block text-lg font-medium text-green-600 mb-2">
                      電話番号
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 transition duration-300"
                        placeholder="電話番号を入力してください"
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <label className="block text-lg font-medium text-green-600 mb-2">
                    新しいパスワード
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/50 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 transition duration-300"
                      placeholder="新しいパスワードを入力"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl"
                    >
                      {showPassword ? "🙉" : "🙈"}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-lg font-medium text-green-600 mb-2">
                    新しいパスワードを確認
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/50 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 transition duration-300"
                      placeholder="新しいパスワードを再入力"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-green-500 text-white font-bold py-4 rounded-xl mt-6 transition duration-300 shadow-lg hover:bg-green-600"
                >
                  パスワードをリセット
                </motion.button>
              </motion.div>
            )}
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <Link
              to="/auth/sign-in"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200 group"
            >
              <FaArrowLeft className="mr-2 text-sm transition-transform group-hover:-translate-x-1" />
              ログインページに戻る
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;