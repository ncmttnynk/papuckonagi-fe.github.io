import { API_BASE } from '../const'

import axios from 'axios'

export const addNewBrand = async (data) => {
  return await axios.post(`${API_BASE}/brand`, data)
}

export const getBrandList = async () => {
  return await axios.get(`${API_BASE}/brand`)
}

export const updateBrand = async (data) => {
  return await axios.put(`${API_BASE}/brand`, data)
}

export const deleteBrand = async (data, modifiedBy) => {
  return await axios.delete(`${API_BASE}/brand/${data.ID}/${modifiedBy}`)
}
