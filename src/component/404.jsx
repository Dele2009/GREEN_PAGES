import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiAlertTriangle } from 'react-icons/fi';

const ERROR_4_0_4 = () => {
     return (
          <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gray-100 p-8">
               <div className="mt-12">
                    <img
                         src="/images/404.svg"
                         alt="Not Found Illustration"
                         className="w-full max-w-md mx-auto"
                    />
               </div>
               <div className="text-center max-w-lg">
                    {/* <FiAlertTriangle className="text-main_color text-6xl mb-4" /> */}
                    <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
                    <p className="mt-4 text-lg text-gray-600">
                         Oops! It seems like the page you are looking for doesn’t exist or has been moved.
                    </p>
                    <p className="mt-2 text-md text-gray-500">
                         Make sure the URL is correct, or go back to our homepage to find what you're looking for.
                    </p>

                    <Link
                         to="/"
                         className="mt-8 inline-flex items-center px-6 py-3 bg-main_color text-white rounded-md font-semibold shadow-md hover:bg-main_color_dark transition duration-200"
                    >
                         <AiOutlineHome className="mr-2 text-2xl" />
                         Back to Home
                    </Link>
               </div>
          </div>
     );
};

export default ERROR_4_0_4;
