import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const editMovie = async (movie) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`/api/admin/${movie.imdbID}`, movie, config)
  return response.data
}

const removeMovie = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`/api/admin/${id}`, config)
  return response.data
}

const addMovie = async (movie) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post('/api/admin/', movie, config)
  return response.data
}

export default { editMovie, removeMovie, addMovie, setToken }