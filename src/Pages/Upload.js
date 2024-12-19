import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';  // Added ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Required for styling
import Header from './Header';
import bannerImg from '../assets/upload_banner.png'; 
import ApiKey from '../config/ApiKey';

const Upload = () => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {videoService} = ApiKey()
    const handleVideoUpload = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        if (!videoTitle || !videoFile) {
            toast.error('Both title and file must be provided!');
            return;
        }

        formData.append('title', videoTitle);
        formData.append('videoFile', videoFile);

        setIsLoading(true);
        const loadingToastId = toast.loading('Uploading...');

        try {
            await videoService.post('/videos/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Uploaded successfully!');
            setVideoTitle('');
            setVideoFile(null);
        } catch (error) {
            toast.error('Error uploading video.');
            console.error('Error uploading video: ', error); // Log the error
        } finally {
            toast.dismiss(loadingToastId);
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            {/* Banner Section */}
            <div className="relative">
                <img
                    src={bannerImg}
                    alt="Upload your moments"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-4xl font-bold">Share Your Moments</h1>
                    <p className="mt-2 text-lg">
                        Upload your favorite videos to our platform and share them with the world!
                    </p>
                </div>
            </div>

            {/* Centered content */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Upload Your Video</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Your video can reach a larger audience. Ensure the file format is supported.
                    </p>

                    <form onSubmit={handleVideoUpload} className="space-y-4">
                        {/* Video Title Input */}
                        <div>
                            <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700">
                                Video Title
                            </label>
                            <input
                                type="text"
                                id="videoTitle"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter video title"
                            />
                        </div>

                        {/* Drag and Drop Video File Input */}
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">MP4, MOV, AVI, MKV (MAX. 500MB)</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {/* Display selected file name */}
                        {videoFile && (
                            <div className="mt-2 text-center text-gray-700">
                                <p className="text-sm">{videoFile.name}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 px-4 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-pink hover:bg-pinkHover'} focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2`}
                            >
                                {isLoading ? 'Uploading...' : 'Upload Video'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ToastContainer for Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Upload;
