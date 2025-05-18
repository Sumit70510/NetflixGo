import { useEffect,useState } from "react";
import { ContentStore } from "../store/Content.js";
import axios from "axios";
const useGetTrendingContent=()=> 
 {
   const[trendingContent,setTrendingContent]=useState(null);
   const {contentType}=ContentStore();
   useEffect(()=>
    {
      const getTrendingContent=async()=>{
        try{
      const res= await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);}
        catch(error)
         {
          console.log("Error Fetching trending Content : ",error);
         }
      };
      getTrendingContent();
    },[contentType]);
   return {trendingContent};
 }

export default useGetTrendingContent;