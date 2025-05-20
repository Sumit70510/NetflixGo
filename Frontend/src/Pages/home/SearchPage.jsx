import Navbar from "../../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { ContentStore } from "../../store/Content";
import { Search } from "lucide-react";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../../Utils/Constants";
import { Link } from "react-router-dom";

const SearchPage=()=>
 {
   const [activeTab,setActiveTab]=useState('movie');
   const [searchTerm,setSearchTerm]=useState('');
   const [result,setResult]=useState([]);
   const {setContentType}=ContentStore();
   const handleTabClick=(tab)=>
    {
      setActiveTab(tab);
      tab==='Movie'?setContentType('Movie'):setContentType('TV');
      setResult([]);
    }
  
   const handleSearch= async (e)=>{
        e.preventDefault();
        try {
           const res= await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`); 
           setResult(res.data.content);
        }
        catch(error)
         {
           if(error.response.status===404)
            {
              toast.error("Nothing found , make Sure You are Searching Under the Right Category");
            }
           else
            {
              toast.error('An Error Occurred,Please Try Again Later');  
            } 
         }
   } 

   return <div className="bg-black min-h-screen text-white">
     <Navbar/>
     <div className="container mx-auto p-4 py-8">
       <div className="flex justify-center gap-3 mb-4">
        <button className={`px-4 py-2 rounded ${activeTab==='Movie'?'bg-red-600':'bg-gray-800'}
           hover:bg-red-700`} onClick={()=>handleTabClick("Movie")}>
          Movies
        </button>
        <button className={`px-4 py-2 rounded ${activeTab==='TV'?'bg-red-600':'bg-gray-800'}
           hover:bg-red-700`} onClick={()=>handleTabClick("TV")} >
          TV Shows
        </button>
        <button className={`px-4 py-2 rounded ${activeTab==='Person'?'bg-red-600':'bg-gray-800'}
           hover:bg-red-700`} onClick={()=>handleTabClick("Person")}>
          Person
        </button>
       </div>
       <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
         <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder={"Search for a "+activeTab}
          className="w-full p-2 rounded bg-gray-800 text-white"/>
         <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6"/>
         </button>
       </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            result.map((result)=>{
               if((!result?.poster_path)&&!result.profile_path) return null;
               return(
                <div key={result.id} className="bg-gray-800 p-4 rounded">
                  { activeTab==='person'?(
                      <div className='flex flex-col items-center'>
                         <img src={ORIGINAL_IMG_BASE_URL+result.profile_path} alt={result.name}
                           className="max-h-96 rounded mx-auto"/>
                         <h2 className='mt-2 text-xl font-bold'>
                            {result.name}
                         </h2>  
                      </div> ) 
                     :(
                     
                     <Link to={`/watch/`+result.id} onClick={()=>setContentType(activeTab)}>
                        <img src={ORIGINAL_IMG_BASE_URL+result.poster_path} alt={result?.title||result?.name}
                          className="w-full h-auto rounded "/>
                        <h2 className="mt-2 text-xl font-bold">
                           {result?.title||result?.name} 
                        </h2>  
                     </Link> 
                    
                    )
                  }
                </div>   
               ) 
            })}
        </div>
     </div>
   </div>
 }
 export default SearchPage;
