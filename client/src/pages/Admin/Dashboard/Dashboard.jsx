import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
    FaUsers, 
    FaMapMarkedAlt, // Thay thế cho FaPlayground
    FaChartLine, 
    FaSearch, 
    FaArrowUp 
  } from "react-icons/fa";

function Dashboard() {
            const chartData = [
          { month: '1月', users: 900 },
          { month: '2月', users: 1500 },
          { month: '3月', users: 1300 },
          { month: '4月', users: 1800 },
        ];
      
        const popularyPlaygrounds = [
          { name: '遊び場 A', count: 1234 },
          { name: '遊び場 B', count: 1100 },
          { name: '遊び場 C', count: 980 },
          { name: '遊び場 D', count: 870 },
        ];
      
        const mostSearched = [
          { name: '遊び場 X', count: 567 },
          { name: '遊び場 Y', count: 489 },
          { name: '遊び場 Z', count: 432 },
          { name: '遊び場 W', count: 398 },
        ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-100 text-lg mb-2">ユーザー数</h3>
              <p className="text-4xl font-bold">2,000</p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
              <FaUsers className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-lg p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-100 text-lg mb-2">遊び場数</h3>
              <p className="text-4xl font-bold">2,000</p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
                <FaMapMarkedAlt className="w-8 h-8" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graph */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-500">ユーザー数の推移</h3>
          <div className="flex items-center gap-2 text-green-500">
            <FaArrowUp />
            <span>15% 増加</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                ticks={[0, 450, 900, 1350, 1800]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '0.5rem',
                  border: '1px solid #22c55e',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 6, fill: "#22c55e", strokeWidth: 2, stroke: "#ffffff" }}
                activeDot={{ r: 8, fill: "#16a34a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-green-500">最も人気のある遊び場</h3>
            <FaChartLine className="text-green-500 w-6 h-6" />
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left py-3 px-4 text-green-700 font-medium">遊び場名</th>
                  <th className="text-right py-3 px-4 text-green-700 font-medium">アクセス数</th>
                </tr>
              </thead>
              <tbody>
                {popularyPlaygrounds.map((item, index) => (
                  <motion.tr 
                    key={index}
                    whileHover={{ backgroundColor: '#f0fdf4' }}
                    className="border-t border-gray-100"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="text-right py-3 px-4 text-green-600 font-medium">
                      {item.count.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-green-500">最も検索された遊び場</h3>
            <FaSearch className="text-green-500 w-6 h-6" />
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left py-3 px-4 text-green-700 font-medium">遊び場名</th>
                  <th className="text-right py-3 px-4 text-green-700 font-medium">検索回数</th>
                </tr>
              </thead>
              <tbody>
                {mostSearched.map((item, index) => (
                  <motion.tr 
                    key={index}
                    whileHover={{ backgroundColor: '#f0fdf4' }}
                    className="border-t border-gray-100"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="text-right py-3 px-4 text-green-600 font-medium">
                      {item.count.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;