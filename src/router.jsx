import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import BookingsPage from "./pages/bookings/BookingsPage";
import BookingCreatePage from "./pages/bookings/BookingCreatePage";
import BookingEditPage from "./pages/bookings/BookingEditPage";
import StationsPage from "./pages/stations/StationsPage";
import StationCreatePage from "./pages/stations/StationCreatePage";
import StationEditPage from "./pages/stations/StationEditPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import { StationProvider } from "./context/StationContext";
import { UserProvider } from "./context/UserContext";
import UserPage from "./pages/users/UserPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

// App Router Component
const AppRouter = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <BookingProvider>
            <StationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <BookingsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/bookings/create"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <BookingCreatePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/bookings/edit/:id"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <BookingEditPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Stations Routes */}
                <Route
                  path="/stations"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <StationsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/stations/create"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <StationCreatePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/stations/edit/:id"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <StationEditPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                 <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </StationProvider>
          </BookingProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
