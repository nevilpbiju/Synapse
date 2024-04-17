import React from 'react'
import { useUserContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ChatListItem = ({query}) => {

  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const navigate= useNavigate();

  function openChatInterface() {
    if(query?.users1.$id==user.id){
      localStorage.setItem("data", query?.$id);
      navigate(`/chat/?id=${query?.users2.$id}`);
    }else{
      localStorage.setItem("data", query?.$id);
      navigate(`/chat/?id=${query?.users1.$id}`);
    }
  }

  // console.log(query);
  return (
    <div>
      {query?.users1.$id==user.id?(
        <button onClick={openChatInterface} className='chat-list-item'>
            <img src={query?.users2.imageUrl} className='h-14 w-14 rounded-full'/>
            <div className='overflow-hidden whitespace-nowrap'>{query?.users2.name}</div>
        </button>
      ):(
        <button onClick={openChatInterface} className='chat-list-item'>
            <img src={query?.users1.imageUrl} className='h-14 w-14 rounded-full'/>
            <div className='overflow-hidden whitespace-nowrap'>{query?.users1.name}</div>
        </button>
      )}
    </div>
  )
}

export default ChatListItem