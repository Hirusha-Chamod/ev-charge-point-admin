import React, { useState, useEffect } from "react";
import { useStationContext } from "../../hooks/useStationContext";
import { Clock, Search } from "lucide-react";
import showToast from "../../utils/toastNotification";

const SlotsModal = ({ isOpen, onClose, station }) => {
  const { checkSlotAvailability } = useStationContext();

  const getInitialStartTime = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = minutes < 30 ? 30 : 60;
    if (roundedMinutes === 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0, 0, 0);
    } else {
      now.setMinutes(roundedMinutes, 0, 0);
    }
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60 * 1000);
    return localTime.toISOString().slice(0, 16);
  };

  const getEndTime = (startTimeString) => {
    const end = new Date(startTimeString);
    end.setHours(end.getHours() + 1);
    return end.toISOString().slice(0, 16);
  };

  const [startTime, setStartTime] = useState(getInitialStartTime());
  const [endTime, setEndTime] = useState(() => getEndTime(startTime));
  const [minDateTime, setMinDateTime] = useState(getInitialStartTime());

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    const newEndTime = getEndTime(newStartTime);

    if (new Date(newEndTime) > new Date(endTime)) {
      setEndTime(newEndTime);
    }
  };

  const handleCheckAvailability = async () => {
    if (!station) return;
    setHasChecked(true);
    setIsLoading(true);
    const desiredStartTime = new Date(startTime);
    const desiredEndTime = new Date(endTime);

    if (desiredStartTime >= desiredEndTime) {
      showToast("error", "End time must be after start time.");
      setIsLoading(false);
      return;
    }

    const result = await checkSlotAvailability(station.id, {
      desiredStartTime,
      desiredEndTime,
    });

    if (result.success) {
      setAvailableSlots(result.availableSlots);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setHasChecked(false);
      setAvailableSlots([]);
      const newStartTime = getInitialStartTime();
      setStartTime(newStartTime);
      setEndTime(getEndTime(newStartTime));
    }
  }, [isOpen]);

  if (!isOpen || !station) {
    return null;
  }

  const allSlots = station.slots || [];

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Slot Availability
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          For Station:{" "}
          <span className="font-medium text-indigo-600">{station.name}</span>
        </p>

        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                min={minDateTime}
                onChange={handleStartTimeChange}
                className="w-full mt-1 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                min={startTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-1 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleCheckAvailability}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Checking..." : "Check Availability"}
          </button>
        </div>

        {hasChecked && !isLoading && (
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-2">Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {allSlots.length > 0 ? (
                allSlots.map((slot) => {
                  const isAvailable = availableSlots.includes(slot.slotId);
                  return (
                    <div
                      key={slot.slotId}
                      className={`p-4 rounded-lg border text-center ${
                        isAvailable
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <p className="font-bold text-lg text-gray-700">
                        Slot {slot.slotId}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          isAvailable ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {isAvailable ? "Available" : "Booked"}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-full text-sm text-gray-500">
                  This station has no slots configured.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotsModal;
