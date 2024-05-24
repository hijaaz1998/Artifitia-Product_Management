import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axionEndPoint/axiosEndPoint';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !cpassword.trim()) {
      toast.error('All Fields Are Required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid Email');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (password !== cpassword) {
      toast.error('Passwords Do Not Match');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
        setName('');
        setPassword('')
        setEmail('')
        setCpassword('')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Registration Failed');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-amber-500 text-center mb-8">Create Account</h2>
      <form onSubmit={registerHandler}>
        <div className="mb-6 relative">
          <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="name"
            name="name"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-6 relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-amber-500 hover:bg-white border-2 border-transparent hover:border-amber-500 rounded-3xl hover:text-amber-500 text-white font-bold py-2 px-20 focus:outline-none focus:shadow-outline transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
