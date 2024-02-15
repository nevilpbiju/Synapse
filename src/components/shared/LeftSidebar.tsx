import { Button } from '@nextui-org/button'
import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../context/AuthContext' 
import { sidebarLinks } from '../../constants'
import { link } from 'fs'
import { INavLink } from '../../types'

const LeftSidebar = () => {
  const {mutate: signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate(); 
  const { user, setIsAuthenticated } = useUserContext();

  const {pathname} = useLocation();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  useEffect(()=> {
    if(isSuccess) navigate(0);
  }, [isSuccess ])
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        {/* Center it */}
        <Link to="/" className='items-center'>
          <img src="/assets/images/banner.svg" alt="logo" className='object-scale-down h-12'/>
        </Link> 
        <Link to={'/profile/${user.id}'} className='flex gap-3 items-center'>
          <img src={user.imageUrl || 'assets/icons/profile-placeholder.svg  '} className='h-14 w-14 rounded-full'/>
          <div className='flex flex-col'> 
          <p className='body-bold'>{user.name}</p>
          <p className='small-regular text-slate-600'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink)=>{

            const isActive = pathname === link.route;
            return(
              <li
                key={link.label}
                className={`leftSidebar-link ${
                  isActive && "bg-stone-100 border border-stone-300"
                }`}>
                <NavLink to={link.route} className="flex gap-4 items-center p-3">
                  <img src={link.imgURL} alt={link.label} className='sidebar-link-img'/>
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button
          variant="ghost"
          className="shad-button_ghost p-4 rounded-lg hover:bg-stone-100 small-regular"
          onClick={(e) => handleSignOut(e)}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className='lg:base-medium'>Log out</p>
        </Button>
    </nav>
  )
}

export default LeftSidebar