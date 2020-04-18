import { API_BASE } from '../const'

import axios from 'axios'

export const getSneakerByBrandId = async (brandId) => {
  return await axios.get(`${API_BASE}/Sneaker/Brand/${brandId}`)
}
