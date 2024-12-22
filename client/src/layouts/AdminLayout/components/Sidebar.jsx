import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaHome, 
  FaUsers, 
  FaPlayCircle,
  FaGamepad
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: "/admin", label: "ダッシュボード", icon: FaHome },
    { path: "/admin/users", label: "ユーザー管理", icon: FaUsers },
    { path: "/admin/playgrounds", label: "遊び場管理", icon: FaPlayCircle },
    { path: "/admin/attractions", label: "アトラクション", icon: FaGamepad },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-green-100">
      <div className="p-6 border-b border-green-100">
        <motion.h2 
          whileHover={{ scale: 1.01 }}
          className="text-2xl font-bold text-green-600"
        >
          Lumiroo
        </motion.h2>
      </div>

      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
          >
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.97 }}
              className={`
                flex items-center px-4 py-3 my-1.5 rounded-lg transition-all duration-200
                ${location.pathname === item.path 
                  ? "bg-green-600 shadow-md shadow-green-100" 
                  : "text-gray-600 hover:bg-green-50"
                }
              `}
            >
              <item.icon className={`
                w-5 h-5 mr-3
                ${location.pathname === item.path 
                  ? "text-white" 
                  : "text-green-600"
                }
              `} />
              <span className={`
                font-medium
                ${location.pathname === item.path 
                  ? "text-white" 
                  : "text-gray-700"
                }
              `}>
                {item.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-green-100">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-sm">
            <FaUsers className="text-white w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Admin</p>
            <p className="text-xs text-gray-500">管理者</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Sidebar;