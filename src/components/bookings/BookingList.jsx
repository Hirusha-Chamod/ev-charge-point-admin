import React from 'react';

const BookingList = () => {
  const mockBookings = [
    {
      id: 1,
      user: 'John Doe',
      station: 'Station A',
      startTime: '2024-10-08 09:00',
      endTime: '2024-10-08 10:00',
      status: 'Active'
    },
    {
      id: 2,
      user: 'Jane Smith',
      station: 'Station B',
      startTime: '2024-10-08 11:00',
      endTime: '2024-10-08 12:30',
      status: 'Completed'
    },
    {
      id: 3,
      user: 'Bob Wilson',
      station: 'Station C',
      startTime: '2024-10-08 14:00',
      endTime: '2024-10-08 15:00',
      status: 'Pending'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Bookings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.station}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;