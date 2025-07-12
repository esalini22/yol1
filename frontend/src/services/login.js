import axios from 'axios'
const baseUrl = '/api/login'
//const baseUrl = 'http://localhost:3001/login'

const config = {
  headers: { Authorization: 'access_granted' },
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

export default { login }
