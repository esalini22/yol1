import axios from 'axios'
const baseUrl = '/api/users'

const config = {
  headers: { Authorization: 'access_granted' },
}

const getAll = async() => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const updateFavs = async ({ username, favoriteMovies }) => {
  const response = await axios.put(baseUrl, { username, favoriteMovies }, config)
  return response.data
}

export default { getAll, register, updateFavs }
