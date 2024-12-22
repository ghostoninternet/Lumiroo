import React from 'react';
import { motion } from 'framer-motion';
import UserInfo from './UserInfo';
import { useParams } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import { getUserDetail } from '../../../../../../apis/admin';
import formattedDate from '../../../../../../utils/formattedDate';
function UserDetail() {
  // Mock data cho user
  const { id } = useParams();
  const [userData, setUserData] = useState({
    userId: id,
    name: "Admin1",
    address: "日本、東京都渋谷区神宮前",
    birthDate: "2000年4月23日",
    status: "アクティブ",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=68",
  });

  useEffect(() => {
    const userDataGet = async () => {
      try {
        const response = await getUserDetail(id);
        console.log(response);
        response.data.birthDate = formattedDate(response.data.birthDate);
        response.data.status = response.data.status ? "アクティブ" : "無効";
        setUserData((prevUserData) => ({
          ...prevUserData, // Keep existing data
          ...response.data, // Overwrite or add new fields
        }));

        console.log(response.data)

      } catch (error) {
        console.log(error);
      }
    }
    userDataGet();
  }, [id]);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1000px] mx-auto p-6"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-600">ユーザー情報</h1>
          <p className="text-sm text-gray-500">ユーザーの詳細情報を確認できます。</p>
        </div>

        {/* User Information */}
        <UserInfo data={userData} />
      </motion.div>
    </div>
  );
}

export default UserDetail;