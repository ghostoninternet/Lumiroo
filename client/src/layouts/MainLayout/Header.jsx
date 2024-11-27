import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../components/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";

function Header({ role }) {
  const location = useLocation();

  // Kiểm tra trang hiện tại để áp dụng class đánh dấu
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center h-[57px] px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/home">
            <Logo size="text-3xl" />
          </Link>
        </motion.div>

        {/* Navigation Links */}
        {role !== "admin" && (
          <motion.nav
            className="flex items-center gap-6 text-base font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/home"
              className={`flex items-center gap-2 transition duration-300 ${
                isActive("/home") ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"
              }`}
            >
              <FontAwesomeIcon icon={faHome} /> ホームページ
            </Link>
            <Link
              to="/playground-recommendation"
              className={`flex items-center gap-2 transition duration-300 ${
                isActive("/playground-recommendation")
                  ? "text-green-500 border-b-2 border-green-500"
                  : "hover:text-green-500"
              }`}
            >
              <FontAwesomeIcon icon={faSearch} /> 遊び/編集検索
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-2 transition duration-300 ${
                isActive("/favorites")
                  ? "text-green-500 border-b-2 border-green-500"
                  : "hover:text-green-500"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} /> お気に入りの遊び場
            </Link>
          </motion.nav>
        )}

        {/* Profile Section */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
        <Link to="/user-profile" className="flex items-center gap-2">
            <img
              src="https://avatars.dicebear.com/api/bottts/johndoe.svg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-green-500 shadow-md"
            />
            <span className="text-sm font-semibold text-gray-700">User</span>
          </Link>        </motion.div>
      </div>
    </header>
  );
}

export default Header;
