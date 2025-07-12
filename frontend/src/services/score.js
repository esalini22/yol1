import axios from 'axios'

const config = {
  headers: { Authorization: 'access_granted' },
}

const checkScore = async (run, dv) => {
  const rut = run+"-"+dv
  const response = await axios.get(`/api/score/${rut}`, config)
  return response.data
}

export default { checkScore }