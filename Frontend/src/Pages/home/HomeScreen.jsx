import { useAuthStore } from '../../store/AuthUser';
import React from 'react';
import { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Info, Play } from 'lucide-react';
import {Link} from 'react-router-dom';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_SHOW_CATEGORIES } from '../../Utils/Constants';
import MovieSlider from '../../Components/MovieSlider';
import { ContentStore } from '../../store/Content';
const HomeScreen=()=>
 {
  const {trendingContent}=useGetTrendingContent();
  const {contentType}=ContentStore(); 
  const [imgLoading,setImgLoading]=useState(true);
   if(!trendingContent)
   {
    return(
     <div className='h-screen text-white relative'>
      <Navbar/>
      <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'/>
     </div>
    );
   }

  return(
    <>

     <div className='relative h-screen text-white'>
       <Navbar/>
       {imgLoading&&(
    <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'/>     
       )}
       <img src={ORIGINAL_IMG_BASE_URL+trendingContent?.backdrop_path} alt='hero-image' 
       className='absolute top-0 left-0 w-full h-full object-cover ' 
       onLoad={()=>{setImgLoading(false)}} />
       <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
       
       <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 z-10'/>
        <div className='max-w-2xl z-20'>
         <h1 className='mt-4 text-6xl front-extrabold text-balance'>
          {trendingContent?.title||trendingContent?.name}
         </h1>
         <p className='mt-2 text-lg'>
          {"  "} 
          {trendingContent?.release_date?.split('-')[0]||
           trendingContent?.first_air_date?.split('-')[0]}{" "} |
           {" "}
           {trendingContent?.adult?"18+":"PG-13"}
         </p>
         <p className='mt-4 text-lg'>
          {trendingContent?.overview?.slice(0,200)+"..."}
         </p>
       </div>
       <div className='flex mt-8 z-20'>
        <Link to={`/watch/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
           <Play className='size-6 inline-block fill-black mr-2 '/>
           Play
        </Link>
        <Link to={`/watch/${trendingContent?.id}`} className='bg-gray-500/70 hover:bg-gray-600 transition-colors duration-200 text-white py-2 px-4 rounded mr-4 flex items-center'>
           <Info className='size-6 mr-2 '/>
           More Info
        </Link>
       </div>

       </div>
     </div>  

     <div className="flex flex-col gap-10 bg-black py-10 relative mb-20">
       {contentType==="Movie"?(MOVIE_CATEGORIES.map((category)=><MovieSlider
      key={category} category={category} />)):(TV_SHOW_CATEGORIES.map((category)=><MovieSlider
      key={category} category={category} />))}
     </div>

    </>
   );
 };
export default HomeScreen;