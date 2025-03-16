import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { googleProvider } from "../../Firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useApiCalls } from "@/api/api";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google-login`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchUser();
      toast.success("Success!");
    } catch (error) {
      initializeUser(null);
      console.error("Google Sign-In Error:", error.message);
      toast.error(`${error.message}`);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_BASE_URL + "/user/get-user",
        {
          withCredentials: true,
        }
      );

      const userData = response.data.data;
      initializeUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthChecked(true);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
      initializeUser(null);
      setAuthChecked(false);
    }
  };

  const value = {
    authChecked,
    handleGoogleLogin,
    fetchUser,
    initializeUser,
    currentUser,
    useApiCalls,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <div>
        <Toaster />
      </div>
    </AuthContext.Provider>
  );
}
