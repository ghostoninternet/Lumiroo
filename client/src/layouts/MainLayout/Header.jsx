import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../components/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {logout} from "../../apis/auth";
import { 
  faHome, 
  faSearch, 
  faHeart, 
  faSignOutAlt, 
  faUser, 
  faUserPlus,
  faUserCircle 
} from "@fortawesome/free-solid-svg-icons";

function Header({ role }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedOut, setLoggedOut] = useState(false);
  const location = useLocation();
  const userData = localStorage.getItem("user");
  //read user data from local storage
  const user = JSON.parse(userData);
  let avatarUrl = user ? user.avatarUrl : null;
  avatarUrl = avatarUrl || "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Adrian";


  const navigate = useNavigate();
  const menuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };
  

  const handleLogout =  async () => {
    //setLoggedOut(true);
    //setMenuOpen(false);
    // Implement logout logic here
    await logout();
    // tạm thời cho tới page signin
    navigate('/auth/sign-in')
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
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
              className={`flex items-center gap-2 transition duration-300 ${isActive("/home") ? "text-green-500 border-b-2 border-green-500" : "hover:text-green-500"}`}
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
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!isLoggedOut ? (
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleMenu}
              >
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    isMenuOpen 
                      ? 'border-green-600 shadow-lg scale-110' 
                      : 'border-green-500 hover:border-green-600 hover:scale-105'
                  }`}
                />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden"
                    style={{ transformOrigin: 'top right' }}
                  >
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">プロフィール</div>
                          <div className="text-xs text-gray-500">アカウント設定</div>
                        </div>
                      </Link>
                      
                      <div className="px-3 my-1">
                        <div className="border-t border-gray-200"></div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">ログアウト</div>
                          <div className="text-xs text-gray-500">アカウントから出る</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
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
