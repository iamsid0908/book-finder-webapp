import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Context/authContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = { email, password };
  const { handleGoogleLogin, currentUser, initializeUser, fetchUser } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/primary");
    }
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`${import.meta.env.VITE_BACKEND_BASE_URL}`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      await fetchUser();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Success!");
      navigate("/primary");
    } catch (error) {
      console.error(
        "Error registration user:",
        error.response?.data || error.message
      );
      initializeUser(null);
      toast.error(`${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    await handleGoogleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Toaster />

      <div className="w-full max-w-md transform transition-all">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl px-4 py-3 border border-gray-200 shadow-sm transition duration-200 group"
          >
            <div className="p-1">
              <svg className="w-5" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <span>Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm font-medium text-[#4F46E5] hover:text-[#4338CA]"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl transition duration-200"
            >
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>{" "}
            <Link
              to="/register"
              className="font-medium text-[#4F46E5] hover:text-[#4338CA]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
