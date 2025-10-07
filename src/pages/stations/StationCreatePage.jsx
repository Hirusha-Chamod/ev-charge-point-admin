import React from 'react';
import StationDropdown from '../../components/stations/StationDropdown';

const StationCreatePage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Station</h1>
        <p className="text-sm text-gray-600">Add a new charging station to the network</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Station Name</label>
              <input className="mt-1 block w-full rounded border-gray-200" placeholder="e.g. Station D - University" />
            </div>

            <div>
              <label className="text-sm text-gray-700">Location</label>
              <input className="mt-1 block w-full rounded border-gray-200" placeholder="e.g. Campus North" />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-700">Available Chargers</label>
              <input type="number" className="mt-1 block w-40 rounded border-gray-200" defaultValue={2} min={0} />
            </div>

            <div className="col-span-2">
              <button type="button" className="bg-black text-white py-2 px-4 rounded">Create Station</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationCreatePage;
