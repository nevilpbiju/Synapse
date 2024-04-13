import React from 'react'
import { Link } from 'react-router-dom'

const ChatInterface = () => {
  return (
    <div className='overflow-hidden chat-interface md:h-full h-[89%]'>
      <div className='chat-info-bar h-24'>
        <Link to={`/profile/`} className='flex gap-3 items-center w-full'>
          <img src={'assets/icons/profile-placeholder.svg  '} className='h-14 w-14 rounded-full'/>
          <div className='flex flex-col w-full'> 
          <p className='body-bold'>Nevil Biju</p>
          <p className='small-regular text-slate-600'>@nevilpbiju</p>
          </div>
        </Link>
      </div>
      <div className='overflow-scroll hidden-scroll h-[70%]'>
      <div className='chat-container overflow-hidden'>
        <div className='output-msg'>HaiHaiHaiHaiHaiHai HaiHaiHaiHai HaiHaiHaiHaiHaiHai HaiHaiHaiHaiHaiHaiHaiHaiHaiHaiHaiHaiHai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='input-msg'>Hai</div>
        <div className='output-msg'>Hai</div>
      </div>
      </div>
      <div className='chat-input h-24'>
        <input type='text' className='p-3 shad-input-2 w-full'/>
        <button type='button'>
          <img
            src={"/assets/icons/send.svg"}
            alt="edit"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  )
}

export default ChatInterface