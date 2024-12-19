import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyLogo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className='relative container mx-auto px-4 py-4'>
      {/* Flex Container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2'>
          <img src={companyLogo} alt='Company Logo' className="w-24" />
        </div>

        {/* Desktop Menu Items */}
        <div className='hidden md:flex space-x-6'>
          <Link to='/home' className='hover:text-darkGrayishBlue'>
            Home
          </Link>
          <Link to='/account' className='hover:text-darkGrayishBlue'>
            Account
          </Link>
          <Link to='/gallery' className='hover:text-darkGrayishBlue'>
            Your Videos
          </Link>
          <Link to='/upload' className='hover:text-darkGrayishBlue'>
            Upload Videos
          </Link>
          {/* Add your new Chat link here for desktop */}
          <Link to='/chat' className='hover:text-darkGrayishBlue'>
            Connect
          </Link>
        </div>

        {/* Logout Button (Desktop) */}
        <button
          onClick={handleLogout}
          className='hidden md:block p-3 px-6 text-white bg-pink rounded-full hover:bg-pinkHover'>
          Logout
        </button>

        {/* Hamburger Icon (Mobile) */}
        <button
          className='block md:hidden focus:outline-none z-20' // Show only on mobile
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <div className='hamburger space-y-1'>
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${toggleMenu ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${toggleMenu ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${toggleMenu ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${toggleMenu ? 'flex' : 'hidden'} md:hidden`}>
        <div className='absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white w-full left-0 right-0 top-20 drop-shadow-md z-50'>
          <Link to='/home' onClick={() => setToggleMenu(false)} className='hover:text-darkGrayishBlue'>
            Home
          </Link>
          <Link to='/account' onClick={() => setToggleMenu(false)} className='hover:text-darkGrayishBlue'>
            Account
          </Link>
          <Link to='/gallery' onClick={() => setToggleMenu(false)} className='hover:text-darkGrayishBlue'>
            Your Videos
          </Link>
          <Link to='/upload' onClick={() => setToggleMenu(false)} className='hover:text-darkGrayishBlue'>
            Chat
          </Link>
          <Link to='/chat' onClick={() => setToggleMenu(false)} className='hover:text-darkGrayishBlue'>
            Connect
          </Link>
          <button onClick={handleLogout} className='p-3 px-6 text-white bg-pink rounded-full hover:bg-pinkHover'>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
