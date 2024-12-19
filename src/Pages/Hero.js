import { Link } from 'react-router-dom';

import illustrationIntro from '../assets/hero.jpg';

const Hero = () => {
  return (
    <section id='hero'>
      {/* Flex Container */}
      <div className='container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row'>
        {/* Left Item */}
        <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
          <h1 className='max-w-md text-4xl font-bold text-center md:text-5xl md:text-left'>
          Welcome to the ClipNest !
          </h1>
          <p className='max-w-sm text-center font-semibold text-darkGrayishBlue md:text-left'>
          Share Your Stories, Your Moments, Your Videos
          </p>
          <p className='max-w-sm text-center text-darkGrayishBlue md:text-left'>
            At the Video Upload Portal, we believe that everyone has a story to tell, and the best way to tell it is through video. Whether it’s a tutorial, a travel vlog, a funny moment, or your latest creative project, our platform makes it easy to share your videos with the world.</p>
          <div className='flex justify-center md:justify-start'>
            <Link
              to='#'
              className='p-3 px-6 pt-2 text-white bg-pink rounded-full baseline hover:bg-pinkHover'
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className='md:w-1/2'>
          <img src={illustrationIntro} alt='' />
        </div>
      </div>
    </section>
  );
};

export default Hero;