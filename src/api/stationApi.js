import axiosInstance from "./axiosConfig";

export const stationApi = {
  // GET /api/stations
  getAllStations: () => axiosInstance.get("/stations"),

  // GET /api/stations/{id}
  getStationById: (id) => axiosInstance.get(`/stations/${id}`),

  // GET /api/stations/nearby
  getNearbyStations: ({ latitude, longitude }) =>
    axiosInstance.get("/stations/nearby", { params: { latitude, longitude } }),

  // POST /api/stations
  createStation: (stationData) => axiosInstance.post("/stations", stationData),

  // PUT /api/stations/{id}
  updateStation: (id, stationData) =>
    axiosInstance.put(`/stations/${id}`, stationData),

  // PATCH /api/stations/{id}/deactivate
  deactivateStation: (id) => axiosInstance.patch(`/stations/${id}/deactivate`),
};
