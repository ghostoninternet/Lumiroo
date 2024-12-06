import axiosInstance from ".";

export const uploadImage = async (formData) => {
  const response = await axiosInstance.post('/uploads/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}
