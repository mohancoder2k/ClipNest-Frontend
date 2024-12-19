import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import PrivateRoute from "./PrivateRoute";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import Gallery from "./Pages/Gallery";
import Chat from './Pages/Chat';
//Uppuvelur Ellai MuthuMariamman thunai 
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Toaster duration={2000} position="top-center" richColors closeButton />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/gallery" element={<PrivateRoute><Gallery /></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/*

{
    "appsail": [
      {
        "source": "D:\\Java Full Stack\\deploy",
        "name": "hostingbackend"
      }
    ]
  } 
    

{
	"command": "java -jar backend-0.0.1-SNAPSHOT.jar",
	"buildPath": "D:\\Java Full Stack\\deploy",
	"stack": "java17",
	"env_variables": {},
	"memory": 256,
	"scripts": {},
	"platform": "javase"
}


  */