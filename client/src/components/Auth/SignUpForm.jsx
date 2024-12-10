import { motion } from "framer-motion";
import { Mail, Lock, Calendar, User2, MapPin, Phone, Plus } from 'lucide-react';

const SignUpForm = ({ 
  formData, 
  onInputChange, 
  onAvatarChange, 
  onSubmit,
  errorConfirmPassword 
}) => {
  return (
    <motion.div
        className="relative bg-white rounded-3xl shadow-xl p-8 z-10 w-[750px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-center text-green-600 mb-8"
        whileHover={{ scale: 1.05 }}
      >
        登録
      </motion.h2>

      <motion.form onSubmit={onSubmit} className="space-y-6">
        <div className="flex gap-8">
          {/* Avatar Section */}
          <div className="w-32">
            <motion.label
              htmlFor="avatar-upload"
              className="block w-32 h-32 rounded-full cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-full rounded-full border-2 border-green-500 overflow-hidden">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-green-500" />
                  </div>
                )}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                className="hidden"
              />
            </motion.label>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            {/* Email */}
            <div>
              <label className="text-base font-bold text-green-600 mb-1 block">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  placeholder="例: abc12345@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                  パスワード確認
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Birthday & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                  生年月日
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={onInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                    性別
                </label>
                <div className="relative flex items-center h-[38px]">
                    <User2 className="w-5 h-5 text-green-500 mr-2" />
                    <div className="flex items-center gap-6">
                    {["男性", "女性", "その他"].map((gender) => (
                        <label key={gender} className="inline-flex items-center whitespace-nowrap">
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={onInputChange}
                            className="w-4 h-4 accent-green-500"
                        />
                        <span className="ml-1 text-gray-700">{gender.split('').map((char, i) => (
                            <span key={i} className="inline-block">{char}</span>
                        ))}</span>
                        </label>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                  名
                </label>
                <div className="relative">
                  <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-bold text-green-600 mb-1 block">
                  姓
                </label>
                <div className="relative">
                  <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-base font-bold text-green-600 mb-1 block">
                住所
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={onInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-base font-bold text-green-600 mb-1 block">
                電話番号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {errorConfirmPassword && (
          <p className="text-sm text-red-600 text-center">
            正しい確認パスワードを入力してください
          </p>
        )}

        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="px-10 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            登録
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default SignUpForm;