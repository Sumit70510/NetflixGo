import {user} from '../Models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.services.js';
export async function searchPerson(req,res)
 {
   const {query}=req.params; 
   try 
    {
      const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
      if(response.results.length===0)
       {return res.status(404).send(null);}
      await user.findByIdAndUpdate(req.user._id, {$push :
        {
          searchHistory:
           {
             id:response.results[0].id,
             image:response.results[0].profile_path,
             title:response.results[0].name,
             searchType:"Person",
             createdAt: new Date(),
           }  
        }}
      ) 
      res.status(200).json({success:true,content:response.results}); 
    }
   catch(error)
    {
      console.log("Error in Search Person Controller : ",error.message);
      res.status(500).json({success:false,message:"Internal Server Error"});
    }
 }
export async function searchMovie(req,res)
 {
    const {query}=req.params; 
    try 
     {
       const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
       if(response.results.length===0)
        {return res.status(404).send(null);}
       await user.findByIdAndUpdate(req.user._id, {$push :
         {
           searchHistory:
            {
              id:response.results[0].id,
              image:response.results[0].poster_path,
              title:response.results[0].original_title,
              searchType:"Movie",
              createdAt: new Date(),
            }  
         }}
       ) 
       res.status(200).json({success:true,content:response.results}); 
     }
    catch(error)
     {
       console.log("Error in Search Person Controller : ",error.message);
       res.status(500).json({success:false,message:"Internal Server Error"});
     }
 }
export async function searchTv(req,res)
 {
    const {query}=req.params; 
    try 
     {
       const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
       if(response.results.length===0)
        {return res.status(404).send(null);}
       
       await user.findByIdAndUpdate(req.user._id, {$push :
         {
           searchHistory:
            {
              id:response.results[0].id,
              image:response.results[0].poster_path,
              title:response.results[0].original_name,
              searchType:"TV",
              createdAt: new Date(),
            }  
         }}
       ) 
       res.status(200).json({success:true,content:response.results}); 
     }
    catch(error)
     {
       console.log("Error in Search Person Controller : ",error.message);
       res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
export async function getSearchHistory(req,res)
 {
     try
      {
       res.status(200).json({success:true,content:req.user.searchHistory});
      } 
    catch(error) 
     {
      res.status(500).json({success:false,message:"Internal Server Error"});
     }
 }

export async function removeItemFromSearchHistory(req,res)
{
    let {id}=req.params;
    id=parseInt(id);
    try
     {
        await user.findByIdAndUpdate(req.user._id,{
          $pull:{
            searchHistory:{id:id}
          }  
        })
       res.status(200).json({success:true,message:"Item Removed From Search History"}); 
     }
    catch(error)
     {
      console.log("Error in remove Item from Search History ",error.message);
      res.status(500).json({success:false,message:"Internal Server Error"});   
     }
} 