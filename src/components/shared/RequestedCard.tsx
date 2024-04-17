import React from 'react'
import { Link } from 'react-router-dom'
import { useAcceptFriend } from '../../lib/appwrite/api';
import { useUserContext } from '../../context/AuthContext';

const FriendCard = ({query}) => {
  console.log(query?.sender.name);
  
  async function acceptRequest(){
    const result = await useAcceptFriend(query?.$id);
    if(result){
      console.log(query?.sender.$id);
      document.getElementById(query?.sender.$id).style.display="none";
    }
  }


  return (
    <div className='border px-10 py-5 m-5 w-[230px] h-[360px] rounded-2xl bg-white' id={query?.sender.$id}>
        <Link to={`/profile/${query?.sender.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={query?.sender.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{query?.sender.name}</div>
            <p className='small-regular text-slate-600'>@{query?.sender.username}</p>
            <p>{query?.sender?.institute || 'Unknown'}</p>
            <div>Points: {query?.sender?.points || 0}</div>
        </Link>
            <button type="button" className="syn-button-2 px-8 mt-5 w-full" onClick={acceptRequest}>
                Accept
            </button>
    </div>
  )
}

export default FriendCard