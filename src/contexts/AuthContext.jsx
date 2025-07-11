import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/status", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isLoggedIn);
      setUser(response.data.user || null);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/auth/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
