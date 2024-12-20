import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaHome, 
  FaUsers, 
  FaPlayCircle, 
  FaChartBar,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: "/admin", label: "ダッシュボード", icon: FaHome },
    { path: "/admin/users", label: "ユーザー管理", icon: FaUsers },
    { path: "/admin/playgrounds", label: "遊び場管理", icon: FaPlayCircle },
    { path: "/admin/analytics", label: "分析", icon: FaChartBar },
    { path: "/admin/settings", label: "設定", icon: FaCog },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Lumiroo</h2>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
          >
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? "bg-green-50 text-green-600" 
                  : "text-gray-600 hover:bg-gray-50"}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <FaUsers className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Admin</p>
            <p className="text-xs text-gray-500">管理者</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;