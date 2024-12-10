import { motion } from "framer-motion";
import { useState } from "react";

const SignInForm = ({ onSubmit, initialEmail = "", initialPassword = "" }) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setError("");
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 z-10">
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
  );
};

export default SignInForm;