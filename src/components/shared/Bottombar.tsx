import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bottombarLinks } from '../../constants';

const Bottombar = () => {
  const {pathname} =useLocation();
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link)=>{
        const isActive = pathname === link.route;
        return(
          <Link 
          to={link.route} 
          key={link.label} 
          className={`${isActive && "bg-black rounded-[10px]"} flex-center  flex-col gap-1 p-2 transition`}
          >
            <img 
            src={link.imgURL} 
            alt={link.label} 
            className={`${isActive && "invert-white"} h-5`}
            />
            <p className={`${isActive && "invert-white"} tiny-medium`}>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar