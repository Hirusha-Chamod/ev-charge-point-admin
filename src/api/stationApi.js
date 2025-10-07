import axiosInstance from './axiosConfig';

export const stationApi = {
  // Get all stations
  getAllStations: () => axiosInstance.get('/stations'),
  
  // Get station by ID
  getStationById: (id) => axiosInstance.get(`/stations/${id}`),
  
  // Create new station
  createStation: (stationData) => axiosInstance.post('/stations', stationData),
  
  // Update station
  updateStation: (id, stationData) => axiosInstance.put(`/stations/${id}`, stationData),
  
  // Delete station
  deleteStation: (id) => axiosInstance.delete(`/stations/${id}`),
  
  // Get available stations
  getAvailableStations: () => axiosInstance.get('/stations/available'),
};