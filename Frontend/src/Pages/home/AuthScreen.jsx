import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
const AuthScreen=()=>{
  const [email,setEmail]=useState("");
  return(
  
    <div className='hero-bg relative'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 md:w-52'/>
        <Link to={"/login"} className='text-white bg-red-600 py-1 px-2 rounded'>
         SignIn
        </Link>
      </header>
      {/* heroSection */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited Movies, TV Shows and More</h1>
        <p className='text-lg mb-4'>
         Watch anywhere,Cancel anytime.
        </p>
        <p className='mb-4'>
         Ready to Watch ? Enter your Email to Create or Restart Your MemberShip.
        </p>
        <form className='flex flex-col md:flex-row gap-4 w-1/2'>
          <input type="email" placeholder='Email Address' className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
             Get Started
             <ChevronRight className='size-8 md:size-10'/>
          </button>  
        </form>
      </div>
        {/* seperator  */}
      <div className='h-2 w-full bg-[#232323]'/>

        {/* 1st Section */}
        <div className='py-10  bg-black text-white'>
         <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
            <div className='flex-1 text-center md:text-left'>
             <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
             <p className='text-lg md:text-xl'> 
              Watch On Smart TVs , PlayStation , X Box , ChromeCast , Apple TV , Blue-ray Player and More</p>   
            </div>
            <div className='flex-1 relative'>
              <img src="/tv.png" alt='TV image' className='mt-4 z-20 relative'/>
              <video playsInline muted autoPlay={true} loop className='absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1/2 z-10'>
                <source src='/hero-vid.m4v' type='video/mp4'/>
              </video>
            </div>
         </div>
        </div> 
          {/* seperator  */}
       <div className='h-2 w-full bg-[#232323]'/> 

         {/* 2nd Section */}
         <div className='py-10  bg-black text-white'>
         <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
            <div className='flex-1 text-center md:text-left'>
             <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
             <p className='text-lg md:text-xl'> 
              Watch On Smart TVs , PlayStation , X Box , ChromeCast , Apple TV , Blue-ray Player and More</p>   
            </div>
            <div className='flex-1 relative'>
              <img src="/tv.png" alt='TV image' className='mt-4 z-20 relative'/>
              <video playsInline muted autoPlay={true} loop className='absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1/2 z-10'>
                <source src='/hero-vid.m4v' type='video/mp4'/>
              </video>
            </div>
         </div>
        </div>  

    </div>
  );
 };
export default AuthScreen;
