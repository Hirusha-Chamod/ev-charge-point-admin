import React, { createContext, useState, useEffect } from "react";
import { stationApi } from "../api/stationApi";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await stationApi.getAllStations();
      setStations(response.data);
    } catch (err) {
      console.error("Failed to fetch stations:", err);
      setError("Could not fetch stations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const createStation = async (stationData) => {
    setLoading(true);
    setError(null);
    try {
      await stationApi.createStation(stationData);
      await fetchStations(); // Re-fetch to show the new station
      return { success: true };
    } catch (err) {
      console.error("Failed to create station:", err);
      setError("Failed to create station.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const updateStation = async (stationId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      await stationApi.updateStation(stationId, updateData);
      await fetchStations(); // Re-fetch to show the updated data
      return { success: true };
    } catch (err) {
      console.error("Failed to update station:", err);
      setError("Failed to update station.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const deactivateStation = async (stationId) => {
    setLoading(true);
    setError(null);
    try {
      await stationApi.deactivateStation(stationId);
      await fetchStations(); // Re-fetch to update the station's status
      return { success: true };
    } catch (err) {
      console.error("Failed to deactivate station:", err);
      setError("Failed to deactivate station.");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    stations,
    loading,
    error,
    fetchStations,
    createStation,
    updateStation,
    deactivateStation,
  };

  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
};
