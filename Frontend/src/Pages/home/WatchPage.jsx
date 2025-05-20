import React, { useState , useEffect ,useRef} from "react";
import { ContentStore } from "../../store/Content";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../../Utils/Constants";
import { formatReleaseDate } from "../../Utils/DateFunction.js";
import WatchPageSkeleton from "../../Components/Skeletons/WatchPageSkeleton.jsx";
const WatchPage=()=> 
 {
  const {id}=useParams();
  const [trailers,setTrailers]=useState([]);
  const [currentTrailerIdx,setCurrentTrailerIdx]=useState(0);
  const [loading,setLoading]=useState(true);
  const [content,setContent]=useState({});
  const [similarContent,setSimilarContent]=useState([]);
  const {contentType}=ContentStore();

  const slideRef=useRef(null);
  const scrollLeft=()=>
    {
     if(slideRef.current)
     {slideRef.current.scrollBy({left:-slideRef.current.offsetWidth,behavior:'smooth'});}
    }
  const scrollRight=()=>
    {slideRef.current.scrollBy({left:slideRef.current.offsetWidth,behavior:'smooth'});}

  useEffect(()=>{
      const getTrailers=async()=>
       {
        try
         {
           const res=await axios.get(`/api/v1/${contentType}/${id}/trailer`);
           setTrailers(res.data.trailers);
         }
        catch(error)
         {
           if(error.message.includes('404'))
            {
               setTrailers([]); 
            } 
         } 
       };
       getTrailers();
    },[contentType,id] );

  useEffect(()=>{
      const getSimilarContent=async()=>
       {
        try
         {
           const res=await axios.get(`/api/v1/${contentType}/${id}/similar`);
           setSimilarContent(res.data.similar);
         }
        catch(error)
         {
           if(error.message.includes('404'))
            {
               setSimilarContent([]); 
            } 
         } 
       };
       getSimilarContent();
    },[contentType,id] );

  useEffect( ()=> {
      const getContentDetails=async()=>
       {
         try
          {
           const res=await axios.get(`/api/v1/${contentType}/${id}/details`);
           setContent(res.data.content);
          }
         catch(error)
          {
           if(error.message.includes('404'))
            { setContent(null); } 
          }
         finally{setLoading(false);}  
       };
      getContentDetails();
    } ,[contentType,id] );

    const handlePrev=()=>
    {
      if(currentTrailerIdx>0)
       {
         setCurrentTrailerIdx(currentTrailerIdx-1);
       }
    }

    const handleNext=()=>
    {
        if(currentTrailerIdx<trailers.length-1)
         {
             setCurrentTrailerIdx(currentTrailerIdx+1);
         }
    }
    
    if(loading)
       return (
        <div className="min-h-screen bg-black p-10">
           <WatchPageSkeleton/>
        </div>
      ) 
 
     if(!content)
       return (
        <div className="min-h-screen bg-black p-10">
           <h2 className="text-3xl text-center text-red-600">
             Content Not Found 😒
           </h2>
        </div>
      )

    return <div className="bg-black min-h-screen text-white">
       <div className="mx-auto container px-4 py-8 h-full">
         <Navbar/>
         {trailers.length>0&&(
            <div className="flex justify-between items-center mb-4">
              <button className={` bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx===0?"cursor-not-allowed opacity-50":""}`}
               disabled={currentTrailerIdx===0} onClick={handlePrev}>
               <ChevronLeft size={24}/>
              </button>
              <button className={` bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx===trailers.length-1?"cursor-not-allowed opacity-50":""}`}
               disabled={currentTrailerIdx===trailers.length-1} onClick={handleNext}>
               <ChevronRight size={24}/>
              </button>
            </div>
           )}

         <div className="mb-8 p-2 sm:px-10">
            {trailers.length>0&&(
              <ReactPlayer controls={true} width='100%'
               height={'70vh'} className='aspect-video mx-auto overflow-hidden rounded-lg'
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              />
            )}

            {trailers?.length===0&&(
                <h2 className="text-xl text-center mt-5">
                    No Trailers Available for {" "}
                    <span className="font-bold text-red-600">
                        {content?.title||content?.name}
                    </span>
                </h2>
             )}
           </div>

           {/* Movie Details */}
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
            <div className="mb-4 md:mb-0">
               <h2 className="text-5xl font-bold text-balance">
                {content?.title||content?.name}
               </h2>
               <p className="mt-2 text-lg">
                {formatReleaseDate(content?.first_air_date||content?.release_date)}|{" "} 
                {
                  content?.adult?
                      (<span className="text-red-600 font-bold"> 18+ </span>)
                      :(<span className="text-green-600 font-bold">PG-13</span>)
                }
               </p>
               <p className="mt-4 text-lg">
                {content?.overview}
               </p> 
            </div>
            <img src={ORIGINAL_IMG_BASE_URL+content?.poster_path} alt="Poster Image"
              className="max-h-[600px] rounded-md"/> 
          </div>
          {
            similarContent.length>0&&(
              <div className="mt-12 max-w-6xl mx-auto relative">
                <h3 className="text-3xl font-bold mb-4">Similar Content</h3>
                <div className="flex overflow-x-scroll scrollbar-hide gap-4 group pb-4" ref={slideRef}>
                  {similarContent.map((Content)=>
                    {
                    if(Content?.backdrop_path==null||Content?.poster_path==null) return null; 
                    return(
                    <Link to={`/watch/${Content.id}`} key={Content.id} className='flex-none w-52'>
                     <img src={SMALL_IMG_BASE_URL+Content.backdrop_path} alt={Content.title||Content.name} 
                      className='w-full h-auto rounded-md'/>
                     <h4 className='mt-2 text-lg font-semibold'>
                       {Content.title||Content.name} 
                     </h4>
                    </Link>)
                    })
                  }
                 {
                   similarContent.length>5&&(
                     <>
                     <button className='absolute top-1/2 left-2 -translate-y-1/2 md:left-15 flex items-center justify-center size-12
                      rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                      onClick={scrollLeft}>
                       <ChevronLeft size={24}/>
                     </button>
                     <button className='absolute top-1/2 right-2 -translate-y-1/2 md:right-15 flex items-center justify-center size-12
                      rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                     onClick={scrollRight}>
                       <ChevronRight size={24}/>
                     </button>
                     </>
                   )
                 }
               </div>
             </div>
            )
          }
       </div>
    </div>

 }
export default WatchPage;