 import React from 'react'
import { Link } from 'react-router-dom'
import { dateConverter, showCaption } from '../../lib/utils'
import { useUserContext } from '../../context/AuthContext';
import { useGetUserById } from '../../lib/react-query/queriesAndMutations';
import { useUpdatePoints, useUpdateVotes } from '../../lib/appwrite/api';

 
 const QueryCard = ({query}) => {
  
    // const user = sessionStorage.getItem('user')?.toString();
    const { user} = useUserContext();
    const { data: currentUser } = useGetUserById(user.id || "");
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
            curVotes.push(currentUser);
            const res2 = await useUpdatePoints(query.creator.$id, (query.creator.points as unknown as number)+1);
            console.log(res2);
        }else{
            console.log(k);
            curVotes.splice(k, 1);
            console.log(curVotes);
            const res2 = await useUpdatePoints(query.creator.$id, (query.creator.points as unknown as number)-1);
            console.log(res2);
        }
        const res = await useUpdateVotes(query.$id, curVotes);
        console.log(res);
    }

    

   return (
     <div className='post-card'>
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${query.creator.$id}`}>
                    <img src={query.creator.imageUrl} className='rounded-full w-12 lg:h-12'/>
                </Link>
                <div className="flex flex-col">
                    <p className='base-medium lg:body-bold '>
                        {query.creator.name} <span className='text-xs text-slate-500 lowercase'>({query.creator.username})</span>
                    </p>
                    <div className='gap-2'>
                        <p className='text-xs text-slate-500'>
                            {dateConverter(query.$createdAt)}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/edit-query/${query.$id}`} className={`${user.id!= query.creator.$id && "hidden"}`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={24} height={24}/>
            </Link>
        </div>
        <Link to={`/query/${query.$id}`}>
            <div className="small-medium lg:base-medium py-5">
                <p>{showCaption(query.caption)}</p>
            </div>
            {/* If an image URL available */}
            {/* <img src='/public/assets/images/Sample-img.jpg' className='rounded-lg'/> */}
        </Link>
        <div>
            <button className='flex gap-2 text-sm items-center bg-stone-400 rounded-lg p-3' onClick={upVote}><div className='gap-3 flex invert'><img src='/assets/icons/up.svg' width={18} height={18}/>{query.likes.length}</div></button>
        </div>
     </div>
   )
 }
 
 export default QueryCard