import React from 'react'
import MainLoader from '../../components/shared/MainLoader'
import { useUserContext } from '../../context/AuthContext';
import FriendCard from '../../components/shared/FriendCard';
// import { useGetFriendRequests } from '../../lib/appwrite/api';
import { Models } from 'appwrite';
import { useGetFriendRequests, useGetFriends, useGetFriends2 } from '../../lib/react-query/queriesAndMutations';
import RequestedCard from '../../components/shared/RequestedCard';
import RightSideBard from '../../components/shared/RightSideBard';

const Friends = () => {

  // let requests;

  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const { data: requests, isPending: isLoading } = useGetFriendRequests(user.id);
  const { data: friends, isPending: isLoading2 } = useGetFriends(user.id);
  const { data: friends2 } = useGetFriends2(user.id);


  return (
    <div className="md:flex flex-1 overflow-scroll hidden-scroll">
      <div className="home-container-2">
        <div className="home-posts">
          <div className="flex overflow-hidden justify-between">
            {/* <MainLoader/> */}
            <div>
            <div className='flex gap-4 items-center p-3 mt-5'>
            <img src='../../../public/assets/icons/AcceptFriend.svg'
              alt="accept" className='sidebar-link-img'/>
              Requests
              </div>
            {isLoading && !requests ? (
              <MainLoader/>
              ):(
              <ul className="section-center border-b">
                {requests?.documents.map((query: Models.Document)=>(
                  <RequestedCard query={query} key={query.$id}/>
                ))}
              </ul>
            )}
            <div className='flex gap-4 items-center p-3 mt-5'>
              <img src='../../../public/assets/icons/people.svg'
              alt="friends" className='sidebar-link-img'/>
              Friends
              </div>
            {isLoading2 && !friends ? (
              <MainLoader/>
              ):(
              <ul className="section-center border-b">
                {friends?.documents.map((query: Models.Document)=>(
                  <FriendCard query={query} key={query.$id}/>
                ))}
                {friends2?.documents.map((query: Models.Document)=>(
                  <FriendCard query={query} key={query.$id}/>
                ))}
              </ul>
            )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="right-container">
          <div className="overflow-hidden">
            <div className="w-full text-center uppercase small-medium pt-5">Suggested For You</div>
            <RightSideBard/>
      </div></div> */}
    </div>
  )
}

export default Friends