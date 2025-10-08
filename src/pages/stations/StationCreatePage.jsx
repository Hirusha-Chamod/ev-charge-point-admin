import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStationContext } from "../../hooks/useStationContext";
import showToast from "../../utils/toastNotification";

const StationCreatePage = () => {
  const navigate = useNavigate();
  const { createStation, loading } = useStationContext();

  const [name, setName] = useState("");
  const [type, setType] = useState("AC");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [numberOfSlots, setNumberOfSlots] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !latitude || !longitude) {
      showToast("error", "Please fill out all required fields.");
      return;
    }

    const stationData = {
      name,
      type,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      numberOfSlots: parseInt(numberOfSlots, 10),
    };

    const result = await createStation(stationData);

    if (result.success) {
      showToast("success", "Station created successfully!");
      navigate("/stations");
    } else {
      showToast("error", result.error?.message || "Failed to create station.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Station</h1>
        <p className="text-sm text-gray-600">
          Add a new charging station to the network
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Station Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. Station D - University"
              />
            </div>

            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. 6.9022"
              />
            </div>

            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. 79.8611"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Station Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>AC</option>
                <option>DC</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="slots"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Slots
              </label>
              <input
                id="slots"
                type="number"
                value={numberOfSlots}
                onChange={(e) => setNumberOfSlots(e.target.value)}
                min={1}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Station"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationCreatePage;
