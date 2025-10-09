import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Download, 
  Filter, 
  Search,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  MoreHorizontal
} from 'lucide-react';
import BookingList from '../../components/bookings/BookingList';
import BookingCard from '../../components/bookings/BookingCard';
import { useBookingContext } from '../../context/BookingContext';

const BookingsPage = () => {
  const { bookings, loading, error, fetchBookings } = useBookingContext();
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      // Get booking properties with fallbacks
      const id = booking.id || booking._id || '';
      const evOwnerNic = booking.evOwnerNic || booking.EvOwnerNic || booking.evOwner || '';
      const stationId = booking.stationId || booking.StationId || booking.station || '';
      const status = booking.status || booking.Status || '';
      const reservationDate = booking.reservationDateTime || booking.ReservationDateTime || booking.reservation || booking.reservationDate;
      
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        String(id).toLowerCase().includes(searchLower) ||
        evOwnerNic.toLowerCase().includes(searchLower) ||
        String(stationId).toLowerCase().includes(searchLower) ||
        status.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = selectedStatus === 'all' || 
        status.toLowerCase() === selectedStatus.toLowerCase();

      // Date filter
      const matchesDate = !selectedDate || 
        (reservationDate && new Date(reservationDate).toDateString() === new Date(selectedDate).toDateString());

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchTerm, selectedStatus, selectedDate]);

  // Calculate statistics from real data
  const statistics = useMemo(() => {
    const total = bookings.length;
    const active = bookings.filter(b => (b.status || b.Status || '').toLowerCase() === 'active').length;
    const completed = bookings.filter(b => (b.status || b.Status || '').toLowerCase() === 'completed').length;
    const pending = bookings.filter(b => (b.status || b.Status || '').toLowerCase() === 'pending').length;
    const approved = bookings.filter(b => (b.status || b.Status || '').toLowerCase() === 'approved').length;
    const rejected = bookings.filter(b => (b.status || b.Status || '').toLowerCase() === 'rejected').length;

    return { total, active, completed, pending, approved, rejected };
  }, [bookings]);

  // Get unique status values from the data
  const availableStatuses = useMemo(() => {
    const statuses = [...new Set(bookings.map(b => b.status || b.Status || '').filter(Boolean))];
    return statuses.sort();
  }, [bookings]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedDate('');
  };

  // Export filtered bookings to CSV
  const exportToCSV = () => {
    if (filteredBookings.length === 0) return;
    
    const headers = ['ID', 'EV Owner NIC', 'Station ID', 'Slot', 'Reservation Time', 'Status', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(booking => {
        const id = booking.id || booking._id || '';
        const evOwnerNic = booking.evOwnerNic || booking.EvOwnerNic || booking.evOwner || '';
        const stationId = booking.stationId || booking.StationId || booking.station || '';
        const slotId = booking.slotId ?? booking.SlotId ?? booking.slot ?? '';
        const reservation = booking.reservationDateTime || booking.ReservationDateTime || booking.reservation || booking.reservationDate || '';
        const status = booking.status || booking.Status || '';
        const createdAt = booking.createdAt || booking.CreatedAt || booking.created_at || '';
        
        return [id, evOwnerNic, stationId, slotId, reservation, status, createdAt].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage all charging station bookings</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportToCSV}
            disabled={filteredBookings.length === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={filteredBookings.length === 0 ? 'No data to export' : `Export ${filteredBookings.length} bookings`}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <Link 
            to="/bookings/create"
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-decoration-none"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Booking</span>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-12"></div>
                ) : (
                  statistics.total
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-emerald-600">
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                ) : (
                  statistics.approved
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                ) : (
                  statistics.completed
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                ) : (
                  statistics.pending
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="space-y-4">
          {/* Top row - Search and Clear button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by ID, NIC, Station ID, or Status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            {/* Clear Filters Button */}
            {(searchTerm || selectedStatus !== 'all' || selectedDate) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Bottom row - Filters and Results counter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2 lg:gap-3">
              <div className="min-w-[120px]">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  {availableStatuses.map(status => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="min-w-[120px]">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  title="Filter by reservation date"
                />
              </div>
            </div>

            {/* Results counter */}
            {(searchTerm || selectedStatus !== 'all' || selectedDate) && (
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Showing <span className="font-medium text-gray-900">{filteredBookings.length}</span> of <span className="font-medium text-gray-900">{bookings.length}</span> bookings
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-w-0 overflow-hidden">
          <BookingList filteredBookings={filteredBookings} />
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
