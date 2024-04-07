import React from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
  const { id } = useParams();
  return (
    <div className='flex flex-1 bg-stone-50'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src='/assets/icons/people.svg'
          width={36}
          height={36}
          alt='add'/>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>
        <div className="md:hidden flex justify-start">ID: {id?.toUpperCase()}</div>
        <ProfileForm/>
      </div>
    </div>
  )
}

export default UpdateProfile