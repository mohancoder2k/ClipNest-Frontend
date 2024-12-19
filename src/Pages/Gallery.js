import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import ApiKey from "../config/ApiKey"; // Assuming ApiKey is properly set up

const Gallery = () => {
  const [userVideos, setUserVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const { videoService } = ApiKey(); // Destructuring to get videoService

    const fetchUserVideos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      setIsLoading(true);

      try {
        // Fetch the user videos using the videoService from ApiKey
        const response = await videoService.get("/videos/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort videos based on upload date
        const sortedVideos = response.data.sort(
          (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
        );

        setUserVideos(sortedVideos);
      } catch (error) {
        console.error("Error fetching user videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    videoRef.current.currentTime += 5; // Forward by 5 seconds
  };

  const handleBackward = () => {
    videoRef.current.currentTime -= 5; // Backward by 5 seconds
  };

  const handleNextVideo = () => {
    const currentIndex = userVideos.findIndex(
      (video) => video.id === selectedVideo.id
    );
    if (currentIndex < userVideos.length - 1) {
      setSelectedVideo(userVideos[currentIndex + 1]);
      setIsPlaying(false);
    }
  };

  const handlePreviousVideo = () => {
    const currentIndex = userVideos.findIndex(
      (video) => video.id === selectedVideo.id
    );
    if (currentIndex > 0) {
      setSelectedVideo(userVideos[currentIndex - 1]);
      setIsPlaying(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold text-center mb-4">Video Gallery</h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
          {/* Video Player Section */}
          <div className="lg:col-span-2 flex flex-col items-center">
            {selectedVideo ? (
              <>
                <video
                  key={selectedVideo.id}
                  ref={videoRef}
                  controls
                  style={{ width: "640px", height: "360px" }}
                  className="border border-pink rounded-lg mb-4"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source
                    src={`data:video/mp4;base64,${selectedVideo.videoData}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="flex justify-around w-full max-w-md mt-4">
                  <button
                    onClick={handlePreviousVideo}
                    className="text-pink hover:text-pinkHover"
                  >
                    <FaStepBackward size={24} />
                  </button>
                  <button
                    onClick={handleBackward}
                    className="text-pink hover:text-pinkHover"
                  >
                    <FaBackward size={24} />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="text-pink hover:text-pinkHover"
                  >
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                  </button>
                  <button
                    onClick={handleForward}
                    className="text-pink hover:text-pinkHover"
                  >
                    <FaForward size={24} />
                  </button>
                  <button
                    onClick={handleNextVideo}
                    className="text-pink hover:text-pinkHover"
                  >
                    <FaStepForward size={24} />
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-medium">{selectedVideo.title}</h3>
              </>
            ) : (
              <p className="text-center text-gray-500">Select a video to play</p>
            )}
          </div>

          {/* Video List Section */}
          <div className="lg:col-span-1 flex flex-col mt-4 lg:mt-0">
            <h2 className="text-lg font-semibold mb-2">Select a Video</h2>
            <div className="space-y-2 overflow-y-auto max-h-96">
              {userVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="cursor-pointer p-2 border border-gray-200 rounded hover:bg-gray-100"
                >
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Description Section */}
          <div className="col-span-3 lg:col-span-2">
            {selectedVideo ? (
              <p className="text-gray-700 mt-4 lg:mt-0">{selectedVideo.description}</p>
            ) : (
              <p className="text-gray-500">Select a video to see its description</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
