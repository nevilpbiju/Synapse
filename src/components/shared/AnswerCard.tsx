import React from 'react'
import { Link } from 'react-router-dom'
import { dateConverter } from '../../lib/utils'
import { useUserContext } from '../../context/AuthContext';
import { useGetUserById } from '../../lib/react-query/queriesAndMutations';
import { useUpdateAnsVotes } from '../../lib/appwrite/api';

const AnswerCard = ({query}) => {

    const { user} = useUserContext();
    const { data: currentUser } = useGetUserById(user.id || "");

    console.log(query);
    async function upVote() {
        let k=-1;
        let curVotes = query.likes;
        console.log(curVotes);
        for (const key in curVotes) {
            if(curVotes[key].$id==currentUser.$id){
                k=key;
                break;
            }
        }
        if(k==-1){
            // document.getElementById(query.$id).innerHTML=query.likes.length+1 as string;
            // console.log("+1");
            
            curVotes.push(currentUser);
        }else{
            console.log(k);
            curVotes.splice(k, 1);
            // document.getElementById(query.$id).innerHTML=query.likes.length-1 as string;
            // console.log("-1");
        }
        const res = await useUpdateAnsVotes(query.$id, curVotes);
        console.log(res);
    }

  return (
    <div className='border-b'>
    <div className="flex-between">
    <div className="flex items-center gap-3">
        <Link to={`/profile/660f948b242a31729747`}>
            <img src={query?.creator?.imageUrl} className='rounded-full w-12 lg:h-12'/>
        </Link>
        <div className="flex flex-col">
            <p className='base-medium lg:body-bold '>
                {query.creator.name} <span className='text-xs text-slate-500'>(@{query.creator.username})</span>
            </p>
            <div className='gap-2'>
                <p className='text-xs text-slate-500'>
                    {dateConverter(query.$createdAt)}
                </p>
            </div>
        </div>
    </div>
    <div className="flex flex-row gap-4 md:gap-8">
    <button className='flex gap-2 text-sm items-center bg-stone-400 rounded-lg p-3' onClick={upVote}><div className='gap-3 flex invert'><img src='/assets/icons/up.svg' width={18} height={18}/><span id={query.$id}>{query.likes.length}</span></div></button>
    </div>
</div>
<div className="small-medium lg:base-medium py-5">
    <p>{query.content}</p>
</div>
</div>
  )
}

export default AnswerCard