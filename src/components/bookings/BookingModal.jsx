import React from 'react';

const BookingModal = ({ isOpen = true, onClose }) => {
  if (!isOpen) return null;

  const mockBooking = {
    id: 1,
    user: 'John Doe',
    userEmail: 'john@example.com',
    station: 'Station A - Downtown Location',
    startTime: '2024-10-08 09:00',
    endTime: '2024-10-08 10:00',
    status: 'Active',
    duration: '1 hour',
    cost: '$15.00',
    paymentMethod: 'Credit Card',
    vehicleModel: 'Tesla Model 3'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Booking Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Booking Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID:</span>
                <span>#{mockBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  mockBooking.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {mockBooking.status}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2">User Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span>{mockBooking.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>{mockBooking.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span>{mockBooking.vehicleModel}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Station:</span>
                <span>{mockBooking.station}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Start Time:</span>
                <span>{mockBooking.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">End Time:</span>
                <span>{mockBooking.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span>{mockBooking.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cost:</span>
                <span className="text-green-600 font-medium">{mockBooking.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span>{mockBooking.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Edit Booking
          </button>
          <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;