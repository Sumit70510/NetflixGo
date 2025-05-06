import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Footer from '../../Components/Footer';

const AuthScreen=()=>{
  
  const [email,setEmail]=useState("");
  const navigate=useNavigate();
  const handleFormSubmit=(e)=>
   {
     e.preventDefault();
     navigate('/signup?email='+email);
   } 

  return(
  
    <div className='hero-bg relative'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 md:w-52'/>
        <Link to={"/login"} className='text-white bg-red-600 py-1 px-2 rounded'>
         SignIn
        </Link>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited Movies, TV Shows and More</h1>
        <p className='text-lg mb-4'>
         Watch anywhere,Cancel anytime.
        </p>
        <p className='mb-4'>
         Ready to Watch ? Enter your Email to Create or Restart Your MemberShip.
        </p>
        <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
          <input type="email" placeholder='Email Address' className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
             Get Started
             <ChevronRight className='size-8 md:size-10'/>
          </button>  
        </form>
      </div>

      <div className='h-2 w-full bg-[#232323]'/>
  
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

        <div className='h-2 w-full bg-[#232323]'/> 

         <div className='py-10  bg-black text-white'>
          <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
            <div className='flex-1'>
             <div className='relative'>
             <img src="/stranger-things-lg.png" alt='Stranger Things image' className='mt-4'/>
             <div className='flex items-center gap-0 absolute bottom-5 left-1/2 -translate-x-1/2
                        bg-black h-20 w-3/4 lg:w-1/2 border border-slate-500 rounded-md px-2'>
                <img src='/stranger-things-sm.png' alt='image' className='h-full'/>
                <div className='flex justify-between items-center'>
                 <div className='flex flex-col gap-0'>
                  <span className='text-md lg:text-lg font-bold px-2'>Stranger Things</span>
                  <span className='text-sm text-blue-500 px-3'>Downloading......</span>
                 </div>   
                 <img src='/download-icon.gif' alt='' className='h-12'/> 
                </div>
               </div>
             </div>
            </div>        

             <div className='flex-1 md:text-left tect-center'>
               <h2 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
                Download Your Shows To Watch Offline
               </h2>
               <p className='text-lg md:text-xl'>
                Save your Favourites easily and always have something to Watch
               </p>
             </div>
          </div>
        </div>         

      <div className='h-2 w-full bg-[#232323]'/> 
      
      <div className='py-10  bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
           <div className='flex-1 text-center md:text-left'>
             <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch Every Where</h2>
             <p className='text-lg md:text-xl'> 
              Stream Unlimited Movies & TV Shows on your Phone, Tablet, Laptop and TV. 
             </p>   
           </div>
           <div className='flex-1 relative overflow-hidden'>
              <img src="/device-pile.png" alt='Device image' className='mt-4 z-20 relative'/>
              <video playsInline muted autoPlay={true} loop className='absolute top-2 left-1/2 -translate-x-1/2 max-w-[63%] h-4/6 z-10'>
                <source src='/video-devices.m4v' type='video/mp4'/>
              </video>
           </div>
       </div>
      </div> 
      <div className='h-2 w-full bg-[#232323]'/> 
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center flex-col-reverse md:flex-row px-4 md:px-2'>
          <div className='flex-1 relative'>
             <img src='/kids.png' alt='Enjoy on your TV' className='mt-4'/>
          </div>          
          <div className='flex-1 text-center md:text-left'>
             <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Create Profiles For Kids
             </h2>
             <p className='text-lg md:text-xl'>
Send Kids on Adventure with their Favourite Characters in a space made Just for Them - Free with your Membership.             
             </p>
          </div>          
        </div>
      </div>
       <Footer/>
    </div>
  );
 };
export default AuthScreen;
