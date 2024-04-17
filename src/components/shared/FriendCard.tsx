import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext';
import { Button } from '@nextui-org/button';
import { useCheckInbox } from '../../lib/appwrite/api';

const FriendCard = ({query}) => {
  const navigate = useNavigate();
  console.log(query?.sender.name);
  const { user } = useUserContext();

  async function openChatInterface() {
    if(query.sender.$id==user.id){
      const recId=query.receiver.$id;
      const inbox = await useCheckInbox(user.id, recId);
      localStorage.setItem("data", inbox?.$id);
      navigate(`/chat/?id=${query?.receiver.$id}`);
    }else{
      const recId=query.sender.$id;
      const inbox = await useCheckInbox(user.id, recId);
      localStorage.setItem("data", inbox?.$id);
      navigate(`/chat/?id=${query?.sender.$id}`);
    }
  }

  return (
    <div>
    {query?.sender.$id==user.id?(
      <div className='border px-10 pb-5 pt-8 m-5 w-[230px] h-[370px] rounded-2xl bg-white'>
        <Link to={`/profile/${query?.receiver.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={query?.receiver.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{query?.receiver.name}</div>
            <p className='small-regular text-slate-600'>@{query?.receiver.username}</p>
            <p>{query?.receiver?.institute || 'Unknown'}</p>
            <div>Points: {query?.receiver?.points || -1}</div>
        </Link>
        <button className='syn-button text-center w-full mt-3' onClick={openChatInterface}><img src='../../../public/assets/icons/chat.svg' className='text-center w-full p-1 h-9 invert'/></button>
    </div>
    ):(
      <div className='border px-10 pb-5 pt-8 m-5 w-[230px] h-[370px] rounded-2xl bg-white'>
        <Link to={`/profile/${query?.sender.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={query?.sender.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{query?.sender.name}</div>
            <p className='small-regular text-slate-600'>@{query?.sender.username}</p>
            <p>{query?.sender?.institute || 'Unknown'}</p>
            <div>Points: {query?.sender?.points || -1}</div>
        </Link>
        <button className='syn-button text-center w-full mt-3' onClick={openChatInterface}><img src='../../../public/assets/icons/chat.svg' className='text-center w-full p-1 h-9 invert'/></button>
    </div>
    )}
    </div>
  )
}

export default FriendCard