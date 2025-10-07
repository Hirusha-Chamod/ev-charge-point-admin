import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: null
  };

  useEffect(() => {
    // Simulate checking for existing auth token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, you would validate the token with your API
          setUser(mockUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Mock login logic - login with any email, no password required
      if (credentials.email && credentials.email.trim() !== '') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        
        // Update mock user with provided email
        const userWithEmail = {
          ...mockUser,
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'Admin User'
        };
        
        setUser(userWithEmail);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Please enter an email address' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};