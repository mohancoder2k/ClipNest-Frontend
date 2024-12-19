import axios from "axios";

function ApiKey() {
  const userProfile = axios.create({
    baseURL: "http://192.168.1.6:8080", // User service
  });

  const videoService = axios.create({
    baseURL: "http://192.168.1.6:8081", // Video service
  });

  const chatService = axios.create({
    baseURL: "http://192.168.1.7:8083", // Chat service (newly added)
  });

  return { userProfile, videoService, chatService }; 
}

export default ApiKey;
