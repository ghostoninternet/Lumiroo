import axiosInstance from "./index.js"

export const getUserInfo = async () => {
  const response = await axiosInstance.get('users/profile',{
    withCredentials: true,
  })
  return response
}
export const updateProfile = async ( data) => {
  console.log('Update profile:', data);
  const response = await axiosInstance.put('users/profile', data,{
    withCredentials: true,
  })
  return response
}
