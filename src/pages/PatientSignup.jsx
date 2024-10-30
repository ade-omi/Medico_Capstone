// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
const PatientSignupSection = () => {
    return ( 
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg w-full max-w-6xl flex flex-wrap md:flex-nowrap">
        <div className="bg-white rounded-md shadow-lg w-full max-w-lg overflow-hidden md:w-1/2">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Create account</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name*</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password*</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign up
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link to="/patient-login" className="text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src=".././src/assets/image3.jpeg"
            alt="Person holding a tablet"
            className="w-full h-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
    );
}

export default function PatientSignup(){
    return (
        <>
        <PatientSignupSection />
        </> 
    );
}
