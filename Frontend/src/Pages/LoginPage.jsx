import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthUser';
const LoginPage=()=>
 {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login,isLoggingIn}=useAuthStore();

    const handleLogin=(e)=>
      {
        e.preventDefault();
        login({email,password});
      }
    return(
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={'/'}>
          <img src='/netflix-logo.png' alt='logo' className='w-52'/>
        </Link>
      </header>
      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/75 rounded-lg shadow-md' >
          <h1 className='text-center text-white text-2xl font-bold mb-4'>LogIn</h1>
          <form className='space-y-4' onSubmit={handleLogin}>
             <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300'>Email</label>
              <input tpye='email' className='w-full px-3 py-2 int-1 border border-gray-700 rounded-md 
               bg-transparent text-white focus:outline-none focus-ring'
               placeholder='you@gmail.com' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
             </div>
             <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300'>Password</label>
              <input tpye='password' className='w-full px-3 py-2 int-1 border border-gray-700 rounded-md 
               bg-transparent text-white focus:outline-none focus-ring'
               placeholder='******' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
             </div>
             <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
               {!isLoggingIn?"Loading...":"Log In"}
             </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't Have Account ? {" "}
            <Link to={'/signup'} className='text-red-500 hover:underline'>
            SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
 };
export default LoginPage;