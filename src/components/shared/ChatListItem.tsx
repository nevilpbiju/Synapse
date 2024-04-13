import React from 'react'

const ChatListItem = () => {
  return (
    <div>
        <button className='chat-list-item'>
            <img src={'assets/icons/profile-placeholder.svg'} className='h-14 w-14 rounded-full'/>
            <div className='overflow-hidden whitespace-nowrap'>Nevil Biju</div>
        </button>
    </div>
  )
}

export default ChatListItem