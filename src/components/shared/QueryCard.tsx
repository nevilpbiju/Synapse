 import React from 'react'
import { Link } from 'react-router-dom'
import { dateConverter } from '../../lib/utils'

 
 const QueryCard = ({query}) => {
    const user = sessionStorage.getItem('user')?.toString();
   return (
     <div className='post-card'>
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${query.UserID}`}>
                    <img src='/assets/icons/profile-placeholder.svg' className='rounded-full w-12 lg:h-12'/>
                </Link>
                <div className="flex flex-col">
                    <p className='base-medium lg:body-bold '>
                        Name <span className='text-xs text-slate-500'>({query.UserID})</span>
                    </p>
                    <div className='gap-2'>
                        <p className='text-xs text-slate-500'>
                            {dateConverter(query.$createdAt)}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/edit-query/${query.$id}`} className={`${user!= query.UserID && "hidden"}`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={24} height={24}/>
            </Link>
        </div>
        <Link to={`/query/${query.$id}`}>
            <div className="small-medium lg:base-medium py-5">
                <p>{query.content}</p>
            </div>
            {/* If an image URL available */}
            {/* <img src='/public/assets/images/Sample-img.jpg' className='rounded-lg'/> */}
        </Link>
        <div>
            <button className='flex gap-2 text-sm items-center'><img src='/assets/icons/up.svg' width={18} height={18}/>{query.votes} Up votes</button>
        </div>
     </div>
   )
 }
 
 export default QueryCard