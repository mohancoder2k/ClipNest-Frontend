import React from 'react';

const Features = () => {
  return (
    <section id='features'>
      {/* Flex Container */}
      <div className='container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row'>
        {/* What's Different */}
        <div className='flex flex-col space-y-12 md:w-1/2'>
          <h2 className='max-w-md text-4xl font-bold text-center md:text-left'>
            What's different about Manage?
          </h2>
          <p className='max-w-sm text-center text-darkGrayishBlue md:text-left'>
            Manage provides all the functionality your team needs, without the
            complexity. Our software is tailor-made for modern digital product
            teams.
          </p>
        </div>

        {/* Numbered List */}
        <div className='flex flex-col space-y-8 md:w-1/2'>
          {/* List Item 1 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-brightRedSupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-pink'>
                  01
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                Seamless Video Uploads
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
                Track company-wide progress
              </h3>
              <p className='text-darkGrayishBlue'>
              Easily upload and share your favorite videos with just a few clicks. Our platform supports a wide range of video formats, and your content is securely stored on our cloud storage, ready to be accessed anytime.
              </p>
            </div>
          </div>

          {/* List Item 2 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-brightRedSupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-pink'>
                  02
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                Create Your Personal Profile
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
              Create Your Personal Profile
              </h3>
              <p className='text-darkGrayishBlue'>
              Sign up today and start building your video library. 
              Customize your profile, upload videos, and share your content with others.
               All your videos will be accessible from your personalized dashboard.
              </p>
            </div>
          </div>

          {/* List Item 3 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-brightRedSupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-pink'>
                  03
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                Responsive Design for Any Device
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
              Responsive Design for Any Device
              </h3>
              <p className='text-darkGrayishBlue'>
              Our platform is designed to work perfectly on desktops, tablets, and smartphones, 
              giving you access to your favorite videos wherever you go
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;