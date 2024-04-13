import React from 'react'
import ChatInterface from '../../components/shared/ChatInterface'
import RightSideBard from '../../components/shared/RightSideBard'
import ChatListItem from '../../components/shared/ChatListItem'

const Chat = () => {
  return (
    <div className='flex w-full'>
      <div className="right-container border-r border-stone-300">
          <div className="flex flex-col overflow-hidden m-7">
            <input type='text' className='p-4 shad-input mb-5' placeholder='Search...'/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
            <ChatListItem/>
      </div></div>
      <div className='w-full'>
        <ChatInterface/>
      </div>
    </div>
  )
}

export default Chat