import React, { createContext, useState, useCallback } from "react";
import { stationApi } from "../api/stationApi";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStations = useCallback(async () => {
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
  }, []);

  const createStation = async (stationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await stationApi.createStation(stationData);
      // Add the new station to the existing list instead of refetching
      setStations((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
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
      const response = await stationApi.updateStation(stationId, updateData);
      // Update the specific station in the list
      setStations((prev) =>
        prev.map((station) =>
          station.id === stationId ? { ...station, ...response.data } : station
        )
      );
      return { success: true, data: response.data };
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
      // Update the station's status locally
      setStations((prev) =>
        prev.map((station) =>
          station.id === stationId ? { ...station, isActive: false } : station
        )
      );
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
