import React from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const LoginForm = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-amber-500 text-center mb-8">Sign in to <br/> Your Account</h2>
      <form>
        <div className="mb-6 relative">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none" 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="mb-6 relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none" 
            placeholder="Password" 
            required 
          />
        </div>
        <div className="mb-4 text-center">
          <a href="#" className="text-md text-black hover:underline">Forgot Password?</a>
        </div>
        <div className="text-center">
          <button 
            type="submit" 
            className="bg-amber-500 hover:bg-white border-2 border-transparent hover:border-amber-500 rounded-3xl hover:text-amber-500 text-white font-semibold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
