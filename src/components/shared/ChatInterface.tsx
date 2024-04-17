import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext';
import { useGetChat, useGetUserById } from '../../lib/react-query/queriesAndMutations';
import ChatCard from './ChatCard';
import { Models } from 'appwrite';
import { useForm } from 'react-hook-form';
import { useCheckInbox, userCreateInbox, useSendChat } from '../../lib/appwrite/api';
import { log } from 'console';

const ChatInterface = () => {
  useEffect(()=>{  
    scrollFn();
  },[]);
  const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const recId = params.get('id');
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const { data: currentUser } = useGetUserById(recId || "");
  if(user.id==recId){
    navigate("/chat")
  }
  let inbox = localStorage.getItem("data");
  
  const { data: chats} = useGetChat(inbox);
  // localStorage.removeItem("data");
  function scrollFn(){
    console.log("ScrollFn");
    document.getElementById("stroller-area").scrollTop = document.getElementById("stroller-area")?.scrollHeight;
  }


  // window.addEventListener("DOMContentLoaded", function() {
  //   scrollFn();    
  // });

  const inputField = document.getElementById('msg');
  const submitButton = document.getElementById('submitButton');

  inputField?.addEventListener('input', () => {
    if ((inputField as HTMLInputElement)?.value.trim() !== '') {
      submitButton?.removeAttribute('disabled');
    } else {
      submitButton?.setAttribute('disabled', 'disabled');
    }
  });

  async function checkInboxId() {
    const res = await useCheckInbox(user.id, recId);
    console.log(res);
  }

  async function onSubmit(event: Event) {
    try{
      const message= (document.getElementById("msg") as HTMLInputElement).value;
      if(message.trim().length==0){
        event.preventDefault();
      }else{
        if(inbox=='undefined'){
          inbox = (await userCreateInbox(user.id, recId)).$id;
          localStorage.setItem("data", inbox);
        }
        console.log(message);
        const chatStat= await useSendChat(
          message,
          user.id,
          recId,
          inbox
        );
        if(chatStat){
          (document.getElementById('msg') as HTMLInputElement).value="";
          console.log("Sss");
          window.location.reload();
        }
      }
    }catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className='overflow-hidden chat-interface md:h-full h-[89%] bg-white'>
      <div className='chat-info-bar h-24'>
        <Link to={`/profile/${currentUser?.$id}`} className='flex gap-3 items-center w-full'>
        <img src={currentUser?.imageUrl || 'assets/icons/profile-placeholder.svg  '} className='h-14 w-14 rounded-full'/>
          <div className='flex flex-col w-full'> 
          <p className='body-bold'>{currentUser?.name}</p>
          <p className='small-regular text-slate-600'>{currentUser?.username}</p>
          </div>
        </Link>
      </div>
      <div className='overflow-scroll hidden-scroll h-[70%] md:h-[76%]' id='stroller-area'>
      <div className='chat-container overflow-hidden'>
        {chats?.documents.map((query: Models.Document)=>(
          <ChatCard query={query} key={query.$id}/>
        ))}
      </div>
      </div>
      <form className='chat-input h-24' autoComplete='off' onSubmit={handleSubmit(onSubmit)} id="myForm">
        <input type='text' className='p-3 shad-input-2 w-full' id="msg" placeholder='Message...'/>
        <button type='submit' id="submitButton" disabled>
          <img
            src={"/assets/icons/send.svg"}
            alt="edit"
            width={30}
            height={30}
            />
        </button>
      </form>
    </div>
  )
}

export default ChatInterface