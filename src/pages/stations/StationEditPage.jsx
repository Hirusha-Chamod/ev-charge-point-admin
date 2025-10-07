import React from 'react';
import { useParams } from 'react-router-dom';

const StationEditPage = () => {
  const { id } = useParams();
  const mockStation = { id, name: `Station ${id} - Mock`, location: 'Unknown', available: true };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Station</h1>
        <p className="text-sm text-gray-600">Update station details</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Station Name</label>
              <input defaultValue={mockStation.name} className="mt-1 block w-full rounded border-gray-200" />
            </div>

            <div>
              <label className="text-sm text-gray-700">Location</label>
              <input defaultValue={mockStation.location} className="mt-1 block w-full rounded border-gray-200" />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-700">Status</label>
              <select defaultValue={mockStation.available ? 'available' : 'offline'} className="mt-1 block w-40 rounded border-gray-200">
                <option value="available">Available</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="col-span-2">
              <button type="button" className="bg-black text-white py-2 px-4 rounded">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationEditPage;
