import React from 'react'

const ChatInterface = () => {
  return (
    <div className='flex flex-col flex-1 gap-3 overflow-hidden p-5 mt-8'>
        <div className="flex gap-3 justify-start w-full">
        <img src='/assets/icons/people.svg'
          width={36}
          height={36}
          alt='add'/>
          <h2 className='h4-bold md:h3-bold text-left w-full'>Nevil Biju</h2>
        </div>
        <div className="chat-container overflow-scroll">
        <div className="input-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="output-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="input-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="output-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="input-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="output-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="input-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        <div className="output-msg">
            <span>Alice</span>
            <div>Hi there!</div>
        </div>
        </div>
        <div className="bottom-container">
            <form className='flex w-full justify-center gap-2'>
                <input type='text' className='p-2 border rounded-md w-dvw'/>
                <button type='submit' className='p-2 border rounded-r-md bg-white'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default ChatInterface