import toast from "react-hot-toast";
import axios from "axios";
import {create} from 'zustand';
export const useAuthStore=create((set)=>
    ({
      user          :null,
      isSignUp      :false,
      isCheckingAuth:true,
      isLoggingOut  :false,
      isLoggingIn   :true,
      signup:async(Credentials)=>
       {
        set({isSignUp:true});
        try 
         {
            const response= await axios.post('/api/v1/auth/signup',Credentials);
            set({user:response.data.user,isSignUp:false});
            toast.success("Account Created Successfully"); 
         } 
        catch(error)
         {
            set({isSignUp:false,user:null});
            toast.error(error.response?.data?.message||"An Error Occured");
         }
       },
      login :async(Credentials)=>
       {
        set({isLoggingIn:true});
        try 
         {
           const response = await axios.post('/api/v1/auth/login',Credentials);
           set({user:response.data.user,isLoggingIn:false});
           toast.success( "LoggedIn Successfully" ); 
         } 
        catch(error)
         {
           set({isLoggingIn:false,user:null});
           toast.error( error.response?.data?.message || "Login Failed..." );
         }
       },
      logout:async()=>
        {
         set({isLoggingOut:true});
          try 
           {
            await axios.post('/api/v1/auth/logout');
            set({user:null,isLoggingOut:false});
            console.log('Here Working');
            toast.success("LoggedOut Successfully");
           }  
        catch(error)
           {
            set({isLoggingOut:false});
            console.log('Here in Error');
            toast.error( error.response?.data?.message || "Logged Out Failed" );
           }
        },
      authCheck:async()=>
       {
          set({isCheckingAuth:true});
          try 
           {
             const response=await axios.get("/api/v1/auth/authCheck");
             set({user:response.data.user,isCheckingAuth:false}); 
           }
          catch(error)
           {
             set({isCheckingAuth:false,user:null});
            //  toast.error(error.response?.data?.message||"An Error Occured");
           }
       }     
     })
);