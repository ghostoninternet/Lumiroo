import axiosInstance from "./index.js"

export const getUserInfo = async () => {
  const response = await axiosInstance.get('/')
  return response
}
