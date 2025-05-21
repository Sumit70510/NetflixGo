import {useEffect ,useState,useRef,useMemo} from 'react';
import { ContentStore } from '../store/Content.js';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {SMALL_IMG_BASE_URL} from '../Utils/Constants';
import { ChevronLeft ,ChevronRight} from 'lucide-react';
const MovieSlider=({category})=> 
  {
    const {contentType}=ContentStore(); 
    const [content,setContent]=useState([]);
    const [showArrows,setShowArrows]=useState(false);
    const slideRef=useRef(null);
     const formattedContentType = useMemo(
    () => (contentType === 'Movie' ? 'Movies' : 'TV Shows'),
    [contentType]
  );
    const scrollLeft=()=>{
      if(slideRef.current)
      {
        slideRef.current.scrollBy({left:-slideRef.current.offsetWidth,behavior:'smooth'});
      }
    }
    const scrollRight=()=>{
      slideRef.current.scrollBy({left:slideRef.current.offsetWidth,behavior:'smooth'});
    }

    useEffect(()=>{
          const getContent= async ()=>{
          const res= await axios.get(`http://localhost:5000/api/v1/${contentType}/${category}`)
          setContent(res.data.content);
        }
        getContent();
      },[contentType,category]);

    const safeCategory = category || '';
    const formattedCategoryName = safeCategory.replaceAll('_', " ")[0]?.toUpperCase() + safeCategory.replaceAll('_', " ").slice(1);

  return(
      <div className='bg-black text-white relative px-5 md:px-20' 
       onMouseEnter={()=>setShowArrows(true)} onMouseLeave={()=>setShowArrows(false)}>
       <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentType}
       </h2>
       <div className='flex space-x-4 overflow-scroll scrollbar-hide' ref={slideRef}>
        {content.filter(item=>item.backdrop_path).map((item)=>(
          <Link to={`/watch/${item?.id}`} key={item.id} className='relative min-w-[250px] group'>
           <div className='rounded-lg overflow-hidden'>
            <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt={item.title||item.name} 
            className='transition-transform duration-300 ease-in-out group-hover:scale-125'/>
           </div>
           <p className='mt-2 text-center'>
             {item.title||item.name} 
           </p>
          </Link>)
         )}
        {
          showArrows&&(
            <>
            <button className='absolute top-1/2 left-4 -translate-y-1/2 md:left-20 flex items-center justify-center size-12
             rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
             onClick={scrollLeft}>
              <ChevronLeft size={24}/>
            </button>
            <button className='absolute top-1/2 right-4 -translate-y-1/2 md:right-20 flex items-center justify-center size-12
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

export default MovieSlider;