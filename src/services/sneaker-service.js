import { API_BASE } from '../const'

import axios from 'axios'

export const getSneakerByBrandId = async (brandId) => {
  return await axios.get(`${API_BASE}/sneaker/brand/${brandId}`)
}

export const getSneakerList = async () => {
  return await axios.get(`${API_BASE}/sneaker`)
}

export const updateSneaker = async (data) => {
  return await axios.put(`${API_BASE}/sneaker`, data)
}

export const addNewSneaker = async (data) => {
  return await axios.post(`${API_BASE}/sneaker`, data)
}
