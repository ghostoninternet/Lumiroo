import axios from "axios"

const axiosInstance = new axios.Axios({
  baseURL: 'http://localhost:8000/api'
})

export default axiosInstance
