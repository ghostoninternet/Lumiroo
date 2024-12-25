import axiosInstance from ".";

export const pingServer = async () => {
  return await axiosInstance('/ping')
}
