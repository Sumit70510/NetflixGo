const Footer=()=>
  {
    return(
      <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
        <div className='flex flex-col items-center justify-between gap-4 md:h-18 md:flex-row'>
          <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
            Built By {" "}
            <a href='https://github.com/Sumit70510' target='_blank' className='font-medium underline underline-offset-4'>
            Me
            </a>
            {" "}Source Code is Available on {" "}
            <a href='https://github.com/Sumit70510' rel='noreferrer' target='_blank' className='font-medium underline underline-offset-4'>
             Sumit70510
            </a>
          </p>
        </div>
      </footer>
     );
  };

export default Footer;