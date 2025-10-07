import React from 'react';

const StationDropdown = ({ onSelect, selectedStation }) => {
  const mockStations = [
    { id: 1, name: 'Station A - Downtown', location: 'Main Street', available: true },
    { id: 2, name: 'Station B - Mall', location: 'Shopping Center', available: true },
    { id: 3, name: 'Station C - Airport', location: 'Terminal 1', available: false },
    { id: 4, name: 'Station D - University', location: 'Campus North', available: true },
  ];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Charging Station
      </label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedStation || ''}
        onChange={(e) => onSelect && onSelect(e.target.value)}
      >
        <option value="">Choose a station...</option>
        {mockStations.map((station) => (
          <option 
            key={station.id} 
            value={station.id}
            disabled={!station.available}
          >
            {station.name} - {station.location} 
            {!station.available && ' (Unavailable)'}
          </option>
        ))}
      </select>
      
      <div className="mt-2 space-y-1">
        <p className="text-xs text-gray-500">Available Stations:</p>
        {mockStations
          .filter(station => station.available)
          .map((station) => (
            <div key={station.id} className="flex items-center text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>{station.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StationDropdown;