import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../components/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faHeart, faCog, faSignOutAlt, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Header({ role }) {
  const [isMenuOpen, setMenuOpen] = useState(false);  // Để quản lý trạng thái popup
  const [isLoggedOut, setLoggedOut] = useState(false);  // Để quản lý trạng thái đăng nhập
  const location = useLocation();

  // Kiểm tra trang hiện tại để áp dụng class đánh dấu
  const isActive = (path) => location.pathname === path;

  // Hàm đóng mở popup profile menu
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Hàm xử lý logout
  const handleLogout = () => {
    setLoggedOut(true);
    setMenuOpen(false);  // Đóng menu khi logout
    // Thực hiện các công việc liên quan đến logout như xoá session, token, vv
  };

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
          <Logo size="text-3xl" />
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
              className={`flex items-center gap-2 transition duration-300 ${isActive("/") ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"}`}
            >
              <FontAwesomeIcon icon={faHome} /> ホームページ
            </Link>
            <Link
              to="/playground-recommendation"
              className={`flex items-center gap-2 transition duration-300 ${isActive("/playground-recommendation") ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"}`}
            >
              <FontAwesomeIcon icon={faSearch} /> 遊び/編集検索
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-2 transition duration-300 ${isActive("/favorites") ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"}`}
            >
              <FontAwesomeIcon icon={faHeart} /> お気に入りの遊び場
            </Link>
          </motion.nav>
        )}

        {/* Profile Section */}
        <motion.div
          className="flex items-center gap-4 cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!isLoggedOut ? (
            <div className="relative">
              {/* Avatar */}
              <img
                src="https://avatars.dicebear.com/api/bottts/johndoe.svg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-green-500 shadow-md"
                onClick={toggleMenu}
              />
              {/* Popup Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-300">
                  <ul>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <FontAwesomeIcon icon={faCog} /> 設定
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-gray-700"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} /> ログアウト
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Đăng xuất, hiển thị 2 nút
            <div className="flex gap-4">
              <Link
                to="/auth/sign-in"
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUser} /> ログイン
              </Link>
              <Link
                to="/auth/sign-up"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUserPlus} /> 登録
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
