import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { FiSend } from "react-icons/fi";
import ApiKey from "../config/ApiKey";

function Chat() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePhoto: "",
  });
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chattingWith, setChattingWith] = useState(null); // Track who the user is chatting with
  const [chats, setChats] = useState([]); // List of all conversations

  // Initialize API instance from ApiKey
  const { userProfile, chatService } = ApiKey();

  // Fetch logged-in user data
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await userProfile.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userProfile]);

  // Fetch chat history between two users
  const fetchChatHistory = async (senderId, receiverId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await chatService.get("/chats/between", {
        params: { senderId, receiverId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast.warning("Please enter a message.");
      return;
    }

    if (!chattingWith) {
      toast.warning("Please select a friend to chat.");
      return;
    }

    const token = localStorage.getItem("token");
    const messageData = {
      senderId: userData.username, // Send username as senderId
      receiverId: chattingWith.username, // Send username as receiverId
      message: newMessage,
    };

    try {
      const response = await chatService.post("/chats/send", messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages([...messages, response.data]); // Append the sent message
      setNewMessage(""); // Clear the input field

      // Fetch chat history to include the new message
      fetchChatHistory(userData.username, chattingWith.username);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle search for a friend by username
  const handleSearch = async () => {
    if (!searchUsername.trim()) {
      toast.warning("Please enter a username to search.");
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
      toast.success("User found!");
    } catch (error) {
      toast.error("User not found.");
      setSearchResult(null);
    }
  };

  // Handle starting a chat with a user
  const startChat = (friend) => {
    // Check if the chat already exists
    const existingChat = chats.find(
      (chat) =>
        (chat.username === friend.username && chat.senderId === userData.username) ||
        (chat.username === userData.username && chat.senderId === friend.username)
    );

    if (existingChat) {
      toast.warning("You are already chatting with this user.");
    } else {
      // Create a new chat
      setChattingWith(friend);
      fetchChatHistory(userData.username, friend.username); // Load chat history with this friend

      // Add the new chat to the chat list for both users
      const newChat = { ...friend, profilePhoto: friend.profilePhoto }; // Customize chat object as needed
      setChats([...chats, newChat]);
      toast.success("Chat started successfully!");

      // Close search result after starting chat
      setSearchResult(null);
    }
  };

  // Fetch all previous chats (optional, could be for a sidebar)
  const fetchChats = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await chatService.get("/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(response.data); // Update the chats state with the fetched chats
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [chatService]);

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component is mounted
    fetchChats();    // Fetch all chats on mount to populate chat list
  }, [fetchUserData, fetchChats]);

  return (
    <div className="flex h-screen">
      {/* Sidebar with chat list */}
      <div className="w-1/3 p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="space-y-4">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => startChat(chat)}
            >
              <div className="flex items-center">
                {chat.profilePhoto && (
                  <img
                    src={`data:image/jpeg;base64,${chat.profilePhoto}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                )}
                <span className="text-lg font-semibold">{chat.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 p-6">
        {chattingWith && (
          <>
            <h2 className="text-2xl font-bold mb-4">Chat with {chattingWith.username}</h2>
            <div className="h-[70vh] overflow-y-auto bg-gray-100 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-3 ${
                    msg.senderId === userData.username ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.senderId === userData.username
                        ? "bg-pink-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    <strong>{msg.senderId}: </strong>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="mt-4 flex">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="ml-4 p-3 bg-gray-800 text-white rounded-lg flex items-center"
              >
                <FiSend />
                Send
              </button>
            </div>
          </>
        )}

        {/* Search for a friend */}
        <div className="mt-6">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Search by username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="mt-2 p-3 bg-gray-800 text-white rounded-lg w-full"
          >
            Search
          </button>
        </div>

        {/* Display found user */}
        {searchResult && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">{searchResult.username}</h3>
            <div className="flex items-center">
              {searchResult.profilePhoto && (
                <img
                  src={`data:image/jpeg;base64,${searchResult.profilePhoto}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <button
                onClick={() => startChat(searchResult)}
                className="p-2 bg-gray-800 text-white rounded-lg"
              >
                Start Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
