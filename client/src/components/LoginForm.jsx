import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../slices/userSlice';

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid Email');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('userId', response.data.userId)
        dispatch(login(response.data.token))
        navigate('/home');
      } else {
        // Handle other status codes
        toast.error(response.data.error);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error messages from backend
        toast.error(error.response.data.error);
      } else {
        // Handle general error messages
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-amber-500 text-center mb-8">Sign in to Your Account</h2>
      <form onSubmit={loginHandler}>
        <div className="mb-6 relative">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
