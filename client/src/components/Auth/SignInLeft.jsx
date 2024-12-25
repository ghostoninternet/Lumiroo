import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

const SignInLeft = ({ lottieAnimation }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-1/2 bg-green-100 flex flex-col justify-center items-center p-10"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Logo size="text-7xl" className="mb-6" />
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
        onClick={() => navigate("/auth/sign-up")}
        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 z-10"
      >
        <i className="fa-solid fa-user"></i> サインアップ
      </button>
    </motion.div>
  );
};

export default SignInLeft;