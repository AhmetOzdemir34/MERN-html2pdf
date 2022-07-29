import React, { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import {CgClose} from 'react-icons/cg'
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [btn,setBtn] = useState(false);
  const [path, setPath] = useState(null);
  
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  if(path){
  return (
    <div className='bg-primary sticky top-0 z-10 text-final font-bold'>
        <div className='container p-5 mx-auto'>
            <div className='flex flex-nowrap flex-row justify-between items-center'>
                <div>{"Convert HTML-to-PDF"}</div>
                <ul style={{listStyle:"none"}} className='md:block hidden m-0'>
                    <li className='inline-block mx-2'><Link to={path==="/profile"?"/profile/dashboard":"/profile"} className='text-final'>
                        {path==="/profile"?"DASHBOARD":"PROFILE"}</Link></li>
                </ul>
                <div className='md:hidden block cursor-pointer' onClick={()=>setBtn(!btn)}>
                    {btn ? <CgClose size={24} className='inline' /> : <FiMenu size={24} className='inline' />}
                </div>
            </div>
        </div>
        {btn && 
            <div className='md:hidden block cursor-pointer py-2 text-center'>
                <ul className='w-full h-full'>
                    <li className='my-3 w-full h-full text-center'>
                        <Link to={path==="/profile"?"/profile/dashboard":"/profile"} className='text-final'>
                            {path==="/profile"?"DASHBOARD":"PROFILE"}
                        </Link>
                    </li>
                </ul>
                </div>
            }
    </div>
  )
}
}

export default Navbar