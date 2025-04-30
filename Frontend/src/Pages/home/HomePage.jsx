import React from 'react';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
const HomePage = () => {
  let user =false;
  return <div className='h-screen w-full hero-bg text-white'>{user ? <HomeScreen /> : <AuthScreen/>}</div>;
};
export default HomePage;
