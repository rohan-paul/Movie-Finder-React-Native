import axios from 'axios'
const API_REF = require('./apiConfig')

const axiosService = axios.create({
  baseURL: API_REF.HOST,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Request-Headers': '*',
//   },
// }

// const axiosService = async () =>
//   axios.get(`https://demo9455293.mockable.io/movielist`, config)

export default axiosService
// export default { axiosService }
