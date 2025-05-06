import React from 'react';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/AuthUser';
const HomePage = () => {
  const {user}=useAuthStore();
    
  return <div className='h-screen w-full hero-bg text-white'>{user ? <HomeScreen /> : <AuthScreen/>}</div>;
};
export default HomePage;
