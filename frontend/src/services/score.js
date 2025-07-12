import axios from 'axios'

const config = {
  headers: { Authorization: 'access_granted' },
}

const checkScore = async (run, dv) => {
  const response = await axios.get(`/api/score/${run}/${dv}`, config)
  return response.data
}

export default { checkScore }