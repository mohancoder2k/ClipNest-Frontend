**ClipNest - Video Vault 🚀**

ClipNest is a full-stack web application that allows users to securely upload, store, and watch videos. Built with ReactJS, Spring Boot, and MongoDB, the application follows a microservices architecture for scalability and modularity.

**Key Features 🌟**
1) User Authentication 🔑: Secure user registration and login with JWT-based authentication.
2) Video Upload 🎥: Upload and store video files.
3) Video Playback ▶️: Watch uploaded videos directly on the platform.
4) Profile Management 🧑‍💻: Users can update and manage their profiles.
5) Microservices Architecture ⚙️: Separate services for user and video management for better scalability.
6) MongoDB Integration 🗃️: User and video metadata stored in MongoDB.

**Technologies Used 🛠️**

**Frontend (ReactJS) 💻**

ReactJS 🔥: JavaScript library for building interactive UIs.
Tailwind  CSS 🎨: CSS framework for responsive design.
React Router 🔄: Navigate between pages and components.
Axios 📡: For making HTTP requests to the backend services.

**Backend (Spring Boot) ⚙️**

Spring Boot 🌱: For building robust and scalable backend services.
JWT Authentication 🔐: Secure login and token-based authentication.
MongoDB 🗃️: NoSQL database to store user data and video metadata.
Spring Security 🛡️: For securing the backend and APIs.
Spring Data MongoDB 🔗: To interact with MongoDB.
Microservices ⚙️: Separated services for better modularity.


**Microservices Architecture 🏗️**

ClipNest follows a microservices architecture with two main services:

UserService 👤: Manages user authentication, profiles, and data.
VideoService 🎥: Handles video uploads, metadata, and playback.
These services communicate via REST API 🔗 for smooth interaction.


**JWT Authentication 🔐**

JWT tokens are used to authenticate users:
After login, the backend sends a JWT token to the frontend.
The token is stored in localStorage 🔒 and sent with each subsequent request for authenticated actions.

**Database 🗃️**
MongoDB 🗄️: Used for storing user data and video metadata.
Ensure MongoDB is running locally or on the cloud.


**Contact 📬**
For any questions, reach out to:

Email: mohansarady@gmail.com 📧
GitHub: mohancoder2k 👨‍💻


