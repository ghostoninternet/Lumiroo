import axiosInstance from "./index.js"


export const getUsers = async (queryParams) => {
    const response = await axiosInstance.get(`admin/users?${queryParams}`)
    return response
}

export const searchUsers = async (queryParams) => {
    const response = await axiosInstance.get(`admin/users/search?${queryParams}`)
    return response
}

export const getUserDetail = async (userId) => {
    const response = await axiosInstance.get(`admin/users/${userId}`)
    return response
}

export const updateUser = async (userId, data) => {
    const response = await axiosInstance.put(`admin/users/${userId}`, data)
    return response
}

export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`admin/users/${userId}`)
    return response
}
