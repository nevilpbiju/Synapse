import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext';

const FriendCard = ({query}) => {
  console.log(query?.sender.name);
  const { user } = useUserContext();
  


  return (
    <div>
    {query?.sender.$id==user.id?(
      <div className='border px-10 pb-5 pt-8 m-5 w-[230px] h-[300px] rounded-2xl bg-white'>
        <Link to={`/profile/${query?.receiver.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={query?.receiver.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{query?.receiver.name}</div>
            <p className='small-regular text-slate-600'>@{query?.receiver.username}</p>
            <p>{query?.receiver?.institute || 'Unknown'}</p>
            <div>Points: 0</div>
        </Link>
    </div>
    ):(
      <div className='border px-10 pb-5 pt-8 m-5 w-[230px] h-[300px] rounded-2xl bg-white'>
        <Link to={`/profile/${query?.sender.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={query?.sender.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{query?.sender.name}</div>
            <p className='small-regular text-slate-600'>@{query?.sender.username}</p>
            <p>{query?.sender?.institute || 'Unknown'}</p>
            <div>Points: 0</div>
        </Link>
    </div>
    )}
    </div>
  )
}

export default FriendCard