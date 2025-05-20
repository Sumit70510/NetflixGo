import { Link } from "react-router-dom";
const NotFoundPage= ()=>
 {
   return(
     <div className='h-screen overflow-hidden relative bg-cover bg-center flex flex-col justify-center items-center
       text-white' style={{
    backgroundImage: "url('/404.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }}>
      <header className='absolute top-0 left-0 p-4 bg-black w-full'>
        <Link to={'/'}>
         <img src='/netflix-logo.png' alt='Netflix' className='h-8'/>
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className='text-7xl font-semibold mt-4'>
          Lost Your Way ?
        </h1>
        <p className='mb-6 text-xl'>
          Sorry , We Can't Find That Page. You Will Find Lots
          to Explore on the Home Page
        </p>    
        <Link to={'/'} className="bg-white text-black py-2 px-4 rounded">
          Netflix Home
        </Link>
      </main>
     </div>
   );
 }
export default NotFoundPage; 