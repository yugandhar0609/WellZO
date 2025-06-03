import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedTokens = localStorage.getItem('tokens');
      
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      if (storedTokens) {
        setTokens(JSON.parse(storedTokens));
      }
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
      // Clear potentially corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    try {
      // TODO: Call backend logout endpoint if it exists to invalidate refresh token
      // For now, client-side only:
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
      localStorage.removeItem('isProfileComplete'); // Also clear profile status
      setCurrentUser(null);
      setTokens(null);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigate]);
  
  // Function to update user (e.g., after profile update)
  // Not strictly part of auth but often managed alongside
  const updateUserAuthData = useCallback((newUserData) => {
    try {
      localStorage.setItem('user', JSON.stringify(newUserData));
      setCurrentUser(newUserData);
    } catch (error) {
      console.error("Error updating user data in localStorage:", error);
    }
  }, []);


  return { currentUser, tokens, logout, updateUserAuthData, isLoading };
};

