import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import avatarAnisha from '../assets/profile.jpg';
import avatarAli from '../assets/avatar-ali.png';
import avatarRichard from '../assets/avatar-richard.png';

const testimonials = [
  {
    image: avatarAnisha,
    name: 'Mohan Sarady',
    role: 'Software Developer - Prop. Clipnest',
    feedback:
      '“Manage has supercharged our team\'s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”',
  },
  {
    image: avatarAli,
    name: 'Ali Bravo',
    feedback:
      '“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”',
  },
  {
    image: avatarRichard,
    name: 'Richard Watts',
    feedback:
      '“Manage has supercharged our team\'s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”',
  },
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <section id='testimonials'>
      <div className='max-w-6xl px-5 mx-auto mt-32 text-center'>
        <h2 className='text-4xl font-bold text-center mb-8'>
          What's Different About Manage?
        </h2>

        {/* Single Slide Wrapper */}
        <div className='relative'>
          <div
            className='transition-transform duration-700 flex'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='w-full flex-shrink-0 flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray'
              >
                <img
                  src={testimonial.image}
                  className='w-16 -mt-14 rounded-full'
                  alt={testimonial.name}
                />
                <h5 className='text-lg font-bold'>{testimonial.name}</h5>
                {testimonial.role && (
                  <h3 className='text-lg font-semibold'>{testimonial.role}</h3>
                )}
                <p className='text-sm text-darkGrayishBlue'>
                  {testimonial.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Navigation Dots */}
        <div className='flex justify-center mt-8 space-x-4'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? 'bg-pink' : 'bg-gray-400'
              }`}
            ></button>
          ))}
        </div>

        {/* Get Started Button */}
        <div className='my-16'>
          <Link
            to='/upload'
            className='p-3 px-6 pt-2 text-white bg-pink rounded-full baseline hover:bg-pinkHover'
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
