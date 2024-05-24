import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import { useSelector } from 'react-redux'

const RegisterPage = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    
    useEffect(() => {
        if(user) navigate('/home')
    })

  return (
    <div className="w-full flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-[40%] p-4 flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="text-white text-center space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold">Welcome Back!</h1>
                <p className="text-xl md:text-2xl">To keep connected with us, please<br/> login with your personal info</p>
            </div>
            <div className="mt-20">
                <Link to={'/'}>
                    <button className="px-20 py-3 border border-white text-white rounded-3xl bg-transparent text-lg md:text-xl hover:bg-white hover:text-black transition duration-300">Login</button>
                </Link>
            </div>
        </div>
        <div className="w-full md:w-[60%] p-4 flex items-center justify-center">
            <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage