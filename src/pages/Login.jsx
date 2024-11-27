import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = { email, password };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          localStorage.setItem("Bearer", data.data.token);
          localStorage.setItem("user_id", data.data.id);
          toast(data.message);
          navigate("/primary");
        } else {
          toast("Something went wrong!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("Failed to register. Please try again." + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-150"
            onClick={handleLogin}
          >
            Submit
          </Button>
          <Link to="/register">
            <Button className="my-2 w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-150">
              SignUP
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
