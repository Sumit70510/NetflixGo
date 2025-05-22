import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {Search, LogOut , Menu} from 'lucide-react';
import { useAuthStore } from '../store/AuthUser';
import { ContentStore } from "../store/Content.js";
const Navbar=()=> 
{
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
  const toggleMobileMenu=()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
   }
  const {contentType,setContentType}=ContentStore();

  const {user,logout}=useAuthStore();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 z-50'>
        <div className='flex items-center gap-10 z-50'>
          <Link to='/'>
           <img src='/netflix-logo.png' alt='Netflix_Logo' className='w-32 sm:w-40'/>
          </Link>
          <div className='hidden sm:flex gap-3 items-center'>
            <Link to='/' className='hover:underline' onClick={()=>setContentType('Movie')}>
             Movies{" "}
            </Link> 
            <Link to='/' className='hover:underline' onClick={()=>setContentType('TV')}>
             TV Shows{" "}
            </Link> 
            <Link to='/history' className='hover:underline'>
             {" "}Search History
            </Link> 
          </div>
          </div>
          <div className='flex gap-3 items-center ml-auto z-50'>
            <Link to={'/search'}>
             <Search className='size-6 cursor-pointer'/>
            </Link>
            <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer' aria-label='Log Out' onClick={logout}/>
            <div className='sm:hidden z-50'>
              <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} aria-label='Toggle Mobile Menu'/>
            </div>
          </div>
          {/* Mobile View */}
          {isMobileMenuOpen&&(
            <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                <Link to={'/'}
                 className='block hover:underline p-2'
                 onClick={toggleMobileMenu}
                >
                Movies
                </Link>
                <Link to={'/'}
                 className='block hover:underline p-2'
                 onClick={toggleMobileMenu}
                >
                TV Shows
                </Link>
                <Link to={'/history'}
                 className='block hover:underline p-2'
                 onClick={toggleMobileMenu}
                >
                Search History
                </Link>
            </div>    
          )}
    </header>
  )
}
export default Navbar;
