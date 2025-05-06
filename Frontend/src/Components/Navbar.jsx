import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {Search, LogOut} from 'lucide-react';
import { useAuthStore } from '../store/AuthUser';
const Navbar=()=> 
 {
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
  const toggleMoblieMenu=()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
   }
  const {user,logout}=useAuthStore();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 z-50'>
        <div className='flex items-center gap-10 z-50'>
          <Link to='/'>
           <img src='netflix-logo.png' alt='Netflix_Logo' className='w-32 sm:w-40'/>
          </Link>

          <div className='hidden sm:flex gap-3 items-center'>
            <Link to='/' className='hover:underline'>
             Movies{" "}
            </Link> 
            <Link to='/' className='hover:underline'>
             TV Shows{" "}
            </Link> 
            <Link to='/history' className='hover:underline'>
             {" "}Search History
            </Link> 
          </div>
          </div>
          <div className='flex gap-3 items-center ml-auto z-50'>
            <Link to={'/search'}>
             <Search className='size-6 coursor-pointer'/>
            </Link>
            <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>
            <div className='sm:hidden'>
              <menu className='size-6 cursor-pointer' onClick={toggleMoblieMenu}/>
            </div>
          </div>

          {/* Mobile View */}
          {isMobileMenuOpen&&(
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                <Link to={'/'}
                 className='block hover:underline p-2'
                 onClick={toggleMoblieMenu}
                >
                Movies
                </Link>
                <Link to={'/'}
                 className='block hover:underline p-2'
                 onClick={toggleMoblieMenu}
                >
                TV Shows
                </Link>
                <Link to={'/history'}
                 className='block hover:underline p-2'
                 onClick={toggleMoblieMenu}
                >
                Search History
                </Link>
            </div>    
          )}
    </header>
  )
}

export default Navbar