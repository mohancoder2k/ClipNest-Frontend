import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import ApiKey from '../config/ApiKey';
import videoFile from "../assets/background.mp4";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login System - LogIn Page";
  }, []);

  const api = ApiKey();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.warning("All Fields are Required");
      return;
    }

    try {
      const res = await api.userProfile.post("/auth/login", { username, password });

      if (res.status === 200 && res.data.token) {
        const token = res.data.token;

        // Store the token and authentication status
        localStorage.setItem("token", token);
        sessionStorage.setItem("isAuthenticated", "true"); // Track login status

        setUsername("");
        setPassword("");

        toast.success("LogIn Successful, Redirecting...");
        navigate("/home"); // Redirect immediately after login
      } else {
        toast.error("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error Logging User: ", error);
      const errorMessage = error.response?.data?.message || "Network Error";
      toast.error(`Error Logging User: ${errorMessage}`);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoFile}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Form Container */}
      <div className="flex justify-center items-center h-full z-20 relative px-4">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-6 sm:p-8 shadow-lg"
          onSubmit={handleLogin}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <div className="flex flex-col text-gray-800 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-gray-800 py-2">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-gray-800 py-2 text-sm">
            <label className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </label>
            <p className="hover:text-teal-500 cursor-pointer">Forgot Password?</p>
          </div>

          <button
            type="submit"
            className="w-full my-5 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>

          <Link
            to="/register"
            className="text-gray-800 block text-center mt-4 hover:text-teal-500"
          >
            Don’t have an Account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}
