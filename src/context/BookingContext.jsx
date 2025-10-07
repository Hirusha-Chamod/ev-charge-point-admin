import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      user: 'John Doe',
      userEmail: 'john@example.com',
      station: 'Station A - Downtown',
      startTime: '2024-10-08T09:00:00',
      endTime: '2024-10-08T10:00:00',
      status: 'Active',
      duration: '1 hour',
      cost: 15.00,
      paymentMethod: 'Credit Card',
      vehicleModel: 'Tesla Model 3'
    },
    {
      id: 2,
      user: 'Jane Smith',
      userEmail: 'jane@example.com',
      station: 'Station B - Mall',
      startTime: '2024-10-08T11:00:00',
      endTime: '2024-10-08T12:30:00',
      status: 'Completed',
      duration: '1.5 hours',
      cost: 22.50,
      paymentMethod: 'Debit Card',
      vehicleModel: 'Nissan Leaf'
    },
    {
      id: 3,
      user: 'Bob Wilson',
      userEmail: 'bob@example.com',
      station: 'Station C - Airport',
      startTime: '2024-10-08T14:00:00',
      endTime: '2024-10-08T15:00:00',
      status: 'Pending',
      duration: '1 hour',
      cost: 15.00,
      paymentMethod: 'Credit Card',
      vehicleModel: 'BMW i3'
    }
  ];

  useEffect(() => {
    // Simulate fetching bookings
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(mockBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      
      // Mock create booking
      const newBooking = {
        ...bookingData,
        id: bookings.length + 1,
        status: 'Pending',
        cost: 15.00, // Mock calculation
        duration: '1 hour' // Mock calculation
      };
      
      setBookings(prev => [...prev, newBooking]);
      return { success: true, booking: newBooking };
    } catch (error) {
      return { success: false, error: 'Failed to create booking' };
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (bookingId, updateData) => {
    try {
      setLoading(true);
      
      // Mock update booking
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, ...updateData }
            : booking
        )
      );
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update booking' };
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      setLoading(true);
      
      // Mock delete booking
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete booking' };
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === parseInt(bookingId));
  };

  const value = {
    bookings,
    loading,
    selectedBooking,
    setSelectedBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingById
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};