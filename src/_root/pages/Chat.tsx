import React from 'react'
import ChatInterface from '../../components/shared/ChatInterface'

const Chat = () => {
  return (
    <div className='flex flex-row flex-1 bg-white overflow-hidden'>
      <ul className='flex flex-col gap-6 p-10 border-r'>
        <li>
          <button className="flex items-center">
            <img src="/assets/icons/people.svg" className='sidebar-link-img'/>
            Name
          </button>
        </li>
        <li>
          <button className="flex items-center">
            <img src="/assets/icons/people.svg" className='sidebar-link-img'/>
            Nevil
          </button>
        </li>
        <li>
          <button className="flex items-center">
            <img src="/assets/icons/people.svg" className='sidebar-link-img'/>
            Nevil
          </button>
        </li>

      </ul>
      <div className='flex flex-col flex-1 items-center gap-10'>
        <div className='max-w-5xl w-full'>
          <ChatInterface/>
        </div>
      </div>
    </div>
  )
}

export default Chat