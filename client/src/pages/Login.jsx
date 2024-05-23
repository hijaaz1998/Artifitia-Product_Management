import React from 'react'
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm'
import toast from 'react-hot-toast';

const LoginPage = () => {
    toast.success('hello')
  return (
    <div className="w-full flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-[60%] p-4 flex items-center justify-center">
            <LoginForm />
        </div>
        <div className="w-full md:w-[40%] p-4 flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="text-white text-center space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold">Hello Friend!</h1>
                <p className="text-xl md:text-2xl">Enter your personal details and<br/> start your journey with us</p>
            </div>
            <div className="mt-20">
                <Link to={'/register'}>
                    <button className="px-20 py-3 border border-white text-white rounded-3xl bg-transparent text-lg md:text-xl hover:bg-white hover:text-black transition duration-300">Sign Up</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
