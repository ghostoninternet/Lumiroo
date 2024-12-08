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

export const getReviews = async (queryParams) => {
  const response = await axiosInstance.get(`/playgrounds/${queryParams}/reviews`)
  return response
}

export const postReview = async (playgroundId, reviewData) => {
  const response = await axiosInstance.post(`/playgrounds/${playgroundId}/reviews`, reviewData,{
    withCredentials: true
  })
  return response
}

export const getPlaygroundDetails = async (id) => {
  const response = await axiosInstance.get(`/playgrounds/${id}`);
  return response;
};

export const addToFavorites = async (userId, playgroundId) => {
  const response = await axiosInstance.post('/playgrounds/favorites', { userId, playgroundId });
  return response;
};

export const removeFromFavorites = async (userId, playgroundId) => {
  const response = await axiosInstance.delete(`/playgrounds/favorites/${playgroundId}`, { data: { userId } });
  return response;
};

export const getFavorites = async (userId) => {
  const response = await axiosInstance.get('/playgrounds/favorites', { params: { userId } });
  return response;
};

