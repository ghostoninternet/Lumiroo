import axiosInstance from "."

// http://localhost:8000/api/auth/sign-in
export const signIn = async (authData) => {
  const response = await axiosInstance.post('/auth/sign-in', authData)
  return response
}

// http://localhost:8000/api//auth/sign-up
export const signUp = async (authData) => {
  const response = await axiosInstance.post('/auth/sign-up', authData)
  return response
}
