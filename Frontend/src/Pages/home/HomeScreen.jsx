import React from 'react';
import { useAuthStore } from '../../store/AuthUser';
import Navbar from '../../Components/Navbar';
import { Info, Play } from 'lucide-react';
import {Link} from 'react-router-dom';
const HomeScreen=()=>
 {
  const resp=()=>
   {
    console.log("Clicked Here");
   }
  return(
    <>
     <div className='relative h-screen text-white'>
       <Navbar/>
       <img src='/extraction.jpg' alt='hero-image' className='absolute top-0 left-0 w-full h-full object-cover '/>
       <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
<div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 z-10'/>
       <div className='max-w-2xl z-20'>
         <h1 className='mt-4 text-6xl front-extrabold text-balance'>
          Extraction
         </h1>
         <p className='mt-2 text-lg'>
          {"  "} 2014 | 18+
         </p>
         <p className='mt-4 text-lg'>
         Chris Hemsworth star in this nonstop action thriller
         with Rudraksh Jaiswal, Randeep Hooda and Golshifteh Farahan
         </p>
       </div>
       <div className='flex mt-8 z-20'>
        <Link to='/watch/123' className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
           <Play className='size-6 inline-block fill-black mr-2 '/>
           Play
        </Link>
        <Link to='/watch/123' onClick={resp} className='bg-gray-500/70 hover:bg-gray-600 transition-colors duration-200 text-white py-2 px-4 rounded mr-4 flex items-center'>
           <Info className='size-6 mr-2 '/>
           More Info
        </Link>
       </div>
       </div>
     </div>     
    </>
   );
 };
export default HomeScreen;
