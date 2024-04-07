import React from 'react'
import MainLoader from '../../components/shared/MainLoader'
import { useUserContext } from '../../context/AuthContext';
import FriendCard from '../../components/shared/FriendCard';

const Friends = () => {

  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();


  sessionStorage.setItem('user', user.id);
      console.log(sessionStorage.getItem('user'));
  return (
    <div className="flex flex-1">
      <div className="home-container-2">
        <div className="home-posts">
          <div className="flex overflow-hidden justify-between">
            {/* <MainLoader/> */}
            <div>
            <div className='body-bold text-center py-5'>REQUESTS</div>
            <div className="section-center border-b">
              <FriendCard/>
              <FriendCard/>
            </div>
            <div className='body-bold text-center py-5'>FRIENDS</div>
            <div className="section-center">
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
              <FriendCard/>
            </div>
            </div>
            <div className="section-right border-l position-fixed right-0 overflow-hidden">
              <div className='body-bold text-center py-5'>RECOMMENDATIONS</div>
              <FriendCard/>
              <FriendCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friends