import axios from 'axios'

const config = {
  headers: { Authorization: 'access_granted' },
}

const getMovie = async (id) => {
  const response = await axios.get(`/api/movies/${id}`, config)
  return response.data
}

const getResults = async () => {
  const response = await axios.get('/api/movies', config)
  return response.data
}

export default { getMovie, getResults }