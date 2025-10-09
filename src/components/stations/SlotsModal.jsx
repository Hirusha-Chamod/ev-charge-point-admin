import React from "react";

const SlotsModal = ({ isOpen, onClose, station }) => {
  if (!isOpen || !station) {
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close Button */}
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

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">Slot Status</h2>
        <p className="text-sm text-gray-500 mb-4">
          Station:{" "}
          <span className="font-medium text-indigo-600">{station.name}</span>
        </p>

        {/* Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {station.slots?.map((slot) => (
            <div
              key={slot.slotId}
              className={`p-4 rounded-lg border text-center ${
                slot.isAvailable
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p className="font-bold text-lg text-gray-700">
                Slot {slot.slotId}
              </p>
              <p
                className={`text-sm font-semibold ${
                  slot.isAvailable ? "text-green-700" : "text-red-700"
                }`}
              >
                {slot.isAvailable ? "Available" : "Booked"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotsModal;
