 import { Button } from '@nextui-org/button'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations'
 
 const Topbar = () => {
  const {mutate: SignOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(()=> {
    if(isSuccess) navigate(0);
  }, [isSuccess ])

   return (
      <section className='topbar'>
        <div className='flex-between py-4 px-5'>
          <Link to="/" className='flex gap-3 items-center'>
            <img src="/assets/images/logo.svg" alt="logo" className='object-scale-down h-14'/>
          </Link>
          <div className="flex gap-4">
            <Button  className="outline-none" onClick={()=> SignOut()} >
              <img src='/public/assets/icons/logout.svg' alt='logout'/>
            </Button>
          </div>
        </div>
      </section>
   )
 }
 
 export default Topbar