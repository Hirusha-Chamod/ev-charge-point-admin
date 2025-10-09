import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStationContext } from "../../hooks/useStationContext";
import SlotsModal from "../../components/stations/SlotsModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import showToast from "../../utils/toastNotification";

const StationsPage = () => {
  const { stations, loading, error, fetchStations, deactivateStation } =
    useStationContext();
  const [slotsModalStation, setSlotsModalStation] = useState(null);
  const [deactivationTarget, setDeactivationTarget] = useState(null);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const handleViewSlots = (station) => setSlotsModalStation(station);
  const handleCloseSlotsModal = () => setSlotsModalStation(null);

  const openDeactivateModal = (station) => setDeactivationTarget(station);
  const closeDeactivateModal = () => setDeactivationTarget(null);

  const confirmDeactivation = async () => {
    if (deactivationTarget) {
      // const result = await deactivateStation(deactivationTarget.id);
      // if (result.success) {
      //   showToast(
      //     "success",
      //     `Station "${deactivationTarget.name}" deactivated.`
      //   );
      // } else {
      //   showToast("error", "Failed to deactivate station.");
      // }
      console.log("Deactivation logic is currently disabled.");
      // closeDeactivateModal();
    }
  };

  if (loading && stations.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Stations Management
          </h1>
          <p className="text-sm text-gray-600">
            Oversee all registered charging stations.
          </p>
        </div>
        <Link
          to="/stations/create"
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Station
        </Link>
      </div>

      {stations.length === 0 && !loading ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No stations found.</p>
          <p className="text-gray-400 text-sm mt-2">
            Create your first station to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location (Lng, Lat)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slots
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stations.map((station) => {
                const availableSlots =
                  station.slots?.filter((slot) => slot.isAvailable).length || 0;
                const totalSlots = station.slots?.length || 0;
                const [longitude, latitude] = station.location?.coordinates || [
                  0, 0,
                ];
                return (
                  <tr key={station.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {station.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          station.type === "DC"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {station.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {longitude.toFixed(4)}, {latitude.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span
                        className={`font-medium ${
                          availableSlots > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {availableSlots}/{totalSlots}
                      </span>
                      <span className="text-gray-500 ml-1">available</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {station.isActive ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <button
                        onClick={() => handleViewSlots(station)}
                        className="text-gray-600 hover:text-gray-900 mr-4 font-medium"
                      >
                        View Slots
                      </button>
                      <Link
                        to={`/stations/edit/${station.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeactivateModal(station)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <SlotsModal
        isOpen={!!slotsModalStation}
        onClose={handleCloseSlotsModal}
        station={slotsModalStation}
      />

      <ConfirmationModal
        isOpen={!!deactivationTarget}
        onClose={closeDeactivateModal}
        onConfirm={confirmDeactivation}
        title="Deactivate Station"
        message={`Are you sure you want to deactivate "${deactivationTarget?.name}"? This will mark the station as inactive.`}
        confirmText="Deactivate"
        isLoading={loading}
      />
      </div>
    </div>
  );
};

export default StationsPage;
