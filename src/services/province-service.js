import { API_BASE } from '../const'

import axios from 'axios'

export const getProvinceList = async () => {
  return await axios.get(`${API_BASE}/province`)
}
