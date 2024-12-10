// src/pages/User/ProfilePage.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import defaultAvatar from '../../assets/cr7.jpg';
import ProfileBanner from './ProfileBanner';
import ProfileBreadcrumb from './ProfileBreadcrumb';
import ProfileForm from './ProfileForm';
import ProfileActions from './ProfileActions';
import EditDialog from './EditDialog';
import { getUserInfo ,updateProfile} from '../../apis/user';
import { uploadImage } from "../../apis/upload";
import { logout } from '../../apis/auth';
import { ClipLoader } from 'react-spinners';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [bannerImage, setBannerImage] = useState(defaultAvatar);
  const [avatarImage, setAvatarImage] = useState(defaultAvatar);
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);


  const [userData, setUserData] = useState({
    name: 'ユーザー名',
    avatarUrl: null,
    email: 'user@example.com',
    address: '東京都渋谷区',
    birthday: '1990-01-01',
    phone: '090-1234-5678',
    gender: '男性'
  });

  // Cập nhật thông tin người dùng khi load trang
  useEffect(() => {
    const fetchUserData = async () => {
      const infor = await getUserInfo();
      console.log('User data:', infor.data.result);
      setUserData(infor.data.result);
      
      if (infor.data.result.avatarUrl != null ){ 
        console.log('avatar:', infor.data.result.avatarUrl);
        setAvatarImage(infor.data.result.avatarUrl);}
    };
    console.log('Fetching user data...');
    fetchUserData();
    console.log('User data fetched');
  }, []); // Chạy 1 lần khi component được mount

  const handleLogout = async () => {
    // Implement logout logic here
    await logout();
    navigate('/auth/sign-in')
  };

  const handleAvatarChange = async (e) => {
    if (e.target.files) {
      try {
        setIsLoading(true)
        const formDataAvatar = new FormData();
        formDataAvatar.append('image', e.target.files[0]);
        const response = await uploadImage(formDataAvatar);
        if (response && response.data && response.data.data) {
          const avatarUrl = response.data.data;
          setUserData(prev => ({ ...prev, avatarUrl }));
          console.log('Avatar uploaded:', avatarUrl);
          setIsLoading(false); // Kết thúc tải
        } else {
          console.error('Failed to upload avatar');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleImageUpload = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') {
          setBannerImage(reader.result);
        } else {
          handleAvatarChange(event);
          setAvatarImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveField = async (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
     const data = {
        username: userData.name,
        avatarUrl: userData.avatarUrl,
        address: userData.address,
        dob: userData.birthday,
        phoneNumber: userData.phone,
        gender: userData.gender
      }
      const response = await updateProfile(data);
      //updata avatarUrl to local storage
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatarUrl = userData.avatarUrl;
      localStorage.setItem("user", JSON.stringify(user));
      
    } catch (error) {
      console.error('Update profile error:', error
      );
    }
  }
  return (
    <div className="min-h-screen bg-gray-50/80 pt-[57px]"  style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 z-50">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        </div>
      )}
      <div className="relative">
        <input
          type="file"
          ref={bannerInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'banner')}
        />
        <input
          type="file"
          ref={avatarInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'avatar')}
        />

        <ProfileBanner 
          image={bannerImage} 
          onUpdateImage={() => bannerInputRef.current?.click()} 
        />
        
        <div className="relative max-w-5xl mx-auto px-6 -mt-48 ">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-8 ">
              <ProfileBreadcrumb onNavigate={navigate} />
              
              <div className="mt-6 space-y-8">
                <div className="flex items-center gap-6 ">
                  <div className="relative group">
                    <img
                      src={avatarImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      <motion.button
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData.name}
                    </h1>
                    <div>
                      <motion.button
                        onClick={() => setEditingName(true)}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <ProfileForm 
                  data={userData}
                  onEdit={handleSaveField}
                  titleClass="text-[#16a34a]"
                />

                <ProfileActions
                  onSave={handleSaveProfile}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditDialog
        isOpen={editingName}
        onClose={() => setEditingName(false)}
        onSave={(value) => {
          handleSaveField('name', value);
          setEditingName(false);
        }}
        title="名前"
        currentValue={userData.name}
      />
      
    </div>
  );
};

export default ProfilePage;