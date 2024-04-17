import React from 'react'
import ChatInterface from '../../components/shared/ChatInterface'
import RightSideBard from '../../components/shared/RightSideBard'
import ChatListItem from '../../components/shared/ChatListItem'
import { useUserContext } from '../../context/AuthContext'
import MainLoader from '../../components/shared/MainLoader'
import { Models } from 'appwrite'
import { useGetInbox, useGetInbox2 } from '../../lib/react-query/queriesAndMutations'
import { useNavigate, useParams } from 'react-router-dom'

const Chat = () => {

  const navigate= useNavigate();
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const recId = params.get('id');
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const { data: friends2} = useGetInbox2(user.id);
  const { data: friends } =  useGetInbox(user.id);

  document.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      navigate("/chat");
    }
  });
  
  return (
    <div className='flex w-full bg-stone-100'>
      <div className="right-container border-r border-stone-300 bg-white">
          <div className="flex flex-col overflow-hidden m-7">
            {/* <input type='text' className='p-4 shad-input mb-5' placeholder='Search...'/> */}
            {isUserLoading ? (
              <div></div>
              ):(
              <ul className="border-b">
                {friends?.documents.map((query: Models.Document)=>(
                  <ChatListItem query={query} key={query.$id}/>
                ))}
                {friends2?.documents.map((query: Models.Document)=>(
                  <ChatListItem query={query} key={query.$id}/>
                ))}
              </ul>
            )}
      </div></div>
      <div className='w-full'>
      {recId && <ChatInterface />}
      </div>
    </div>
  )
}

export default Chat