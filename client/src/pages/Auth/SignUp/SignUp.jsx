import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import amusementParkAnimation from "../../../assets/ride-animation.json";
import amusementParkSVG from "../../../assets/amusement-park-animate.svg";
import TransitionWrapper from "../../../components/TransitionWrapper";
import { uploadImage } from "../../../apis/upload";
import { GENDER } from "../../../constants";
import { signUp } from "../../../apis/auth";
import SignUpRight from "../../../components/Auth/SignUpRight";
import SignUpForm from "../../../components/Auth/SignUpForm";
import NotificationDialog from "../../../components/ui/NotificationDialog";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "男性",
    address: "",
    phoneNumber: "",
    avatarUrl: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
  });

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
  }, [formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = async (e) => {
    if (e.target.files) {
      try {
        const formDataAvatar = new FormData();
        formDataAvatar.append('image', e.target.files[0]);
        const response = await uploadImage(formDataAvatar);
        const avatarUrl = response.data.data;
        setFormData({...formData, avatarUrl: avatarUrl });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setNotificationTitle('エラー');
      setNotificationMessage('パスワードが一致しません。');
      setShowNotification(true);
      return;
    }

    const signUpData = {
      username: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      gender: GENDER[formData.gender],
      phoneNumber: formData.phoneNumber,
      dob: formData.birthDate,
      avatarUrl: formData.avatarUrl,
    };

    try {
      await signUp(signUpData);
      navigate('/playground-recommendation');
    } catch (error) {
      console.log(error);
      setNotificationTitle('エラー');
      setNotificationMessage('サインアップに失敗しました。もう一度お試しください。');
      setShowNotification(true);
    }
  };

  return (
    <TransitionWrapper direction={-1}>
      <div className="min-h-screen flex overflow-hidden">
        <motion.div
          className="w-1/2 relative p-10 shadow-2xl flex flex-col justify-center items-center bg-gradient-to-b from-white to-green-50"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={amusementParkSVG}
            alt="Amusement Park"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
          />
          <SignUpForm
            formData={formData}
            onInputChange={handleInputChange}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleSubmit}
            errorConfirmPassword={errorConfirmPassword}
          />
        </motion.div>

        <SignUpRight animation={amusementParkAnimation} />
      </div>
      <NotificationDialog
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        title={notificationTitle}
        message={notificationMessage}
      />
    </TransitionWrapper>
  );
};

export default SignUp;