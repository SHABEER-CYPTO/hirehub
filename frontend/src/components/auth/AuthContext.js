import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // 🔐 Login Function with JWT Support
  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost/hirehub-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Needed for cookies/session
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Invalid JSON response:", jsonError);
        return { success: false, message: "Invalid server response. Please try again." };
      }

      if (response.ok && data.success) {
        const { user, access_token, refresh_token } = data;

        // ✅ Save user & tokens
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        return { success: true, user };
      } else {
        return {
          success: false,
          message: data.message || "Login failed. Please check credentials.",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Network error. Please check your backend or internet connection.",
      };
    }
  };

  // 🔓 Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // 📦 Get access token when needed
  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  // Optional: Add refreshToken() function if needed later

  return (
    <AuthContext.Provider value={{ user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
