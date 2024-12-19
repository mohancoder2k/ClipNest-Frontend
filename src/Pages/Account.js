import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiEdit } from "react-icons/fi";
import Header from "./Header";
import ApiKey from "../config/ApiKey";

function Account() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePhoto: "",
  });
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();  // Use useNavigate hook for redirection

  // Initialize API instance from ApiKey
  const { userProfile } = ApiKey();

  // Outside the component
  const fetchUserData = async (setUserData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await userProfile.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  // Inside the component
  useEffect(() => {
    fetchUserData(setUserData); // Pass setUserData as an argument
  }, []); // No warning now

  const handleProfilePictureUpdate = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("profilePhoto", file);

    try {
      await userProfile.put("/auth/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      fetchUserData(); // Refetch user data after updating profile
    } catch (error) {
      toast.error("Error updating profile picture: " + error.message);
      console.error("Error updating profile picture: ", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleProfilePictureUpdate(file);
    }
  };

  const handleSearch = async () => {
    if (!searchUsername.trim()) {
      toast.warning("Please enter a username to search");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await userProfile.get("/auth/searchUser", {
        params: { username: searchUsername },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSearchResult(response.data);
      toast.success("User found");

      setSearchHistory((prevHistory) => [searchUsername, ...prevHistory]);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("You do not have permission to view this profile.");
      } else {
        toast.error("User not found or another error occurred.");
      }
      setSearchResult(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { firstName, lastName, username, email, profilePhoto } = userData;

  return (
    <div className="container mx-auto p-6">
     <Header/>
      <div className="flex flex-col items-center mt-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md ">
          <div className="text-center relative">
            {profilePhoto && (
              <div className="relative inline-block">
                <img
                  src={`data:image/jpeg;base64,${profilePhoto}`}
                  alt="Profile"
                  className="rounded-full mb-4 w-36 h-36 border-4 border-pink cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
                <label htmlFor="profilePhotoInput">
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-pink text-white rounded-full flex items-center justify-center cursor-pointer">
                    <FiEdit className="text-lg" />
                  </div>
                </label>
                <input
                  id="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-blue-700">
              Welcome, {firstName} {lastName}
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Username:</strong> {username}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 p-2 bg-pink-500 text-pink rounded-md hover:bg-pink-600"
            >
              Logout
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center text-gray-800">
              Search for Users
            </h3>
            <div className="flex mt-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-pink text-white rounded-r-md hover:bg-pinkHover"
              >
                Search
              </button>
            </div>
            {searchResult && (
              <div className="text-center mt-4">
                <h4 className="text-lg font-medium text-gray-700">
                  Username: {searchResult.username}
                </h4>
                {searchResult.profilePhoto && (
                  <img
                    src={`data:image/jpeg;base64,${searchResult.profilePhoto}`}
                    alt="Searched User Profile"
                    className="rounded-full mt-2 w-24 h-24 border-2 border-pink"
                  />
                )}
              </div>
            )}

            <div className="mt-6">
              <h5 className="text-lg font-semibold text-gray-700">Search History</h5>
              <ul className="mt-2 bg-gray-50 rounded-md p-4 shadow-inner">
                {searchHistory.map((username, index) => (
                  <li key={index} className="py-1 border-b border-gray-200 last:border-none">
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <img
              src={`data:image/jpeg;base64,${profilePhoto}`}
              alt="Profile"
              className="rounded-full w-96 h-96 object-cover border-8 border-pink"
            />
          </div>
          {/* Chat button now uses navigate directly */}
          <button
            onClick={() => navigate("/chat")}
            className="px-4 bg-pink text-white rounded-r-md hover:bg-pinkHover"
          >
            Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
