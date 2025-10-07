import React from 'react';

const StationsPage = () => {
  const mockStations = [
    { id: 1, name: 'Station A - Downtown', location: 'Main Street', available: true },
    { id: 2, name: 'Station B - Mall', location: 'Shopping Center', available: true },
    { id: 3, name: 'Station C - Airport', location: 'Terminal 1', available: false }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Stations</h1>
          <p className="text-sm text-gray-600">Manage charging stations</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockStations.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{s.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{s.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Offline</span>}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <a href={`/stations/edit/${s.id}`} className="text-blue-600 hover:underline mr-3">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationsPage;
