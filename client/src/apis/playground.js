import axiosInstance from ".";

export const getAttractions = async () => {
  const response = await axiosInstance.get('/playgrounds/attractions')
  return response
}

export const getAreas = async () => {
  const response = await axiosInstance.get('/playgrounds/areas')
  return response
}

export const getPlayground = async (queryParams) => {
  const response = await axiosInstance.get(`/playgrounds?${queryParams}`)
  return response
}

export const filterPlaygrounds = async (queryParams) => {
  const response = await axiosInstance.get(`/playgrounds/filter?${queryParams}`)
  return response
}
