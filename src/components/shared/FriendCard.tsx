import React from 'react'
import { Link } from 'react-router-dom'

const FriendCard = () => {
  return (
    <div className='border px-10 py-5 m-5 w-[250px] h-[360px] rounded-2xl bg-white'>
        <Link to={`/profile/`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src="../../../public/assets/icons/profile-placeholder.svg" className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>Nevil P Biju</div>
            <p className='small-regular text-slate-600'>@nevilpbiju</p>
            <p>VIT</p>
            <div>Points: 0</div>
        </Link>
            <button type="button" className="syn-button-2 px-8 mt-5">
                Add Friend
            </button>
    </div>
  )
}

export default FriendCard