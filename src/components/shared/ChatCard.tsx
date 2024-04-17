import React from 'react'
import { useUserContext } from '../../context/AuthContext';

const ChatCard = ({query}) => {
  const {user} = useUserContext();
  return (
    <div>
        {query.senderId==user.id?(
            <div className='output-msg'>{query?.message}</div>
        ):(
            <div className='input-msg'>{query?.message}</div>
        )}
    </div>
  )
}

export default ChatCard