import axiosInstance from "."

// http://localhost:8000/api/auth/sign-in
export const signIn = async (authData) => {
  const response = await axiosInstance.post('/sign-in', authData)
  return response
}
