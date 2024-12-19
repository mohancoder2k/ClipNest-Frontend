import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ApiKey from '../config/ApiKey';
import backgroundVideo from '../assets/background.mp4';

function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login System - SignUp Page";
    }, []);

    const { userProfile } = ApiKey();

    const handleNextStep = () => {
        if (currentStep === 1 && (!username || !email)) {
            toast.warning("Please fill out all fields in Step 1");
            return;
        }
        if (currentStep === 2 && (!password || !firstName || !lastName)) {
            toast.warning("Please fill out all fields in Step 2");
            return;
        }
        toast.success(`Step ${currentStep} completed`);
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!profilePhoto) {
            toast.warning("Profile photo is required");
            return;
        }

        const loadingToastId = toast.loading("Creating your account...");
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("profilePhoto", profilePhoto);

        try {
            const res = await userProfile.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                toast.success("User Created Successfully, Redirecting...");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            console.error("Error Creating User: ", error.response ? error.response.data : error.message);
            toast.error(error.response && error.response.data ? error.response.data : "Error Creating User");
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

            <div className="flex justify-center items-center h-full z-20 relative px-4">
                <form
                    className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-6 sm:p-8 shadow-lg"
                    onSubmit={currentStep === 3 ? handleSignup : (e) => e.preventDefault()}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                        Register
                    </h2>

                    {currentStep === 1 && (
                        <div>
                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <div className="flex flex-col text-gray-800 py-2">
                                <label htmlFor="profilePhoto">Profile Photo</label>
                                <input
                                    id="profilePhoto"
                                    className="rounded-lg bg-gray-200 mt-2 p-2"
                                    type="file"
                                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                                onClick={handlePrevStep}
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button
                                type="button"
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                                onClick={handleNextStep}
                            >
                                Next
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button
                                type="submit"
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                            >
                                Register
                            </button>
                        )}
                    </div>

                    {currentStep === 3 && (
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-teal-500 hover:underline">
                                Already have an Account? Login
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Register;
