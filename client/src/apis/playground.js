import axiosInstance from ".";

export const getPlayground = async () => {
  const response = await axiosInstance.get('/playground')
  return response
}
