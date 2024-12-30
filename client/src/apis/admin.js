import axiosInstance from "./index.js";

export const getUsers = async (queryParams) => {
  const response = await axiosInstance.get(`admin/users?${queryParams}`);
  return response;
};

export const searchUsers = async (queryParams) => {
  const response = await axiosInstance.get(`admin/users/search?${queryParams}`);
  return response;
};

export const getUserDetail = async (userId) => {
  const response = await axiosInstance.get(`admin/users/${userId}`);
  return response;
};

export const updateUser = async (userId, data) => {
  const response = await axiosInstance.put(`admin/users/${userId}`, data);
  return response;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`admin/users/${userId}`);
  return response;
};

export const updatePlayground = async (playgroundId, updateData) => {
  const response = await axiosInstance.put(
    `admin/playgrounds/${playgroundId}`,
    {
      updateData,
    }
  );
  return response;
};

export const createPlayground = async (newPlaygroundData) => {
  const response = await axiosInstance.post(`admin/playgrounds`, {
    newPlaygroundData,
  });
  return response;
};

export const deletePlayground = async (playgroundId) => {
  const response = await axiosInstance.delete(
    `admin/playgrounds/${playgroundId}`
  );
  return response;
};
