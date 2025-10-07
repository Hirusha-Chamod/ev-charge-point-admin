import React from 'react';

const OwnerDropdown = ({ onSelect, selectedOwner }) => {
  const mockOwners = [
    { id: 1, name: 'John Doe', email: 'john@example.com', vehicleCount: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', vehicleCount: 1 },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', vehicleCount: 3 },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', vehicleCount: 1 },
    { id: 5, name: 'Mike Brown', email: 'mike@example.com', vehicleCount: 2 },
  ];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Vehicle Owner
      </label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedOwner || ''}
        onChange={(e) => onSelect && onSelect(e.target.value)}
      >
        <option value="">Choose an owner...</option>
        {mockOwners.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.name} ({owner.email})
          </option>
        ))}
      </select>
      
      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Recent Owners:</p>
        <div className="space-y-1">
          {mockOwners.slice(0, 3).map((owner) => (
            <div key={owner.id} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <div>
                <span className="font-medium">{owner.name}</span>
                <span className="ml-2 text-gray-400">{owner.email}</span>
              </div>
              <span className="text-blue-600">{owner.vehicleCount} vehicle{owner.vehicleCount > 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDropdown;