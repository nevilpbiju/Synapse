import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeletePost, useGetPostById } from '../../lib/react-query/queriesAndMutations';
import MainLoader from '../../components/shared/MainLoader';
import { dateConverter } from '../../lib/utils';
import { fetchReplies } from '../../lib/appwrite/api';

const QueryDetails = () => {

  const {id} = useParams();
  const user = sessionStorage.getItem('user')?.toString();
  const { data: query, isPending } = useGetPostById(id || '');
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePost();

  async function onLoad() {
      const replies = await fetchReplies(id);
    //   console.log(replies);
      const getContent = (obj: { content: string }) => obj.content;
      const contentArray: string[] =replies?.map(getContent);
      console.log(contentArray);
  }

  const handleDeleteQuery = () => {
    deletePost({ postId: id });
    navigate('/');
  };
  console.log(query);
  onLoad();
  return (
    <div className="post_details-container bg-stone-50">
      {isPending? <MainLoader/> : (
        <div className='border rounded-lg px-5 py-5 md:px-12 bg-white'>
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${query.creator.$id}`}>
                    <img src={query.creator.imageUrl} className='rounded-full w-12 lg:h-12'/>
                </Link>
                <div className="flex flex-col">
                    <p className='base-medium lg:body-bold '>
                        {query.creator.name} <span className='text-xs text-slate-500'>({query.creator.username})</span>
                    </p>
                    <div className='gap-2'>
                        <p className='text-xs text-slate-500'>
                            {dateConverter(query.$createdAt)}
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${user!= query?.creator.$id ? "hidden":"flex flex-row gap-4 md:gap-8"}`}>
            <Link to={`/edit-query/${query.$id}`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={24} height={24}/>
            </Link>
            <button onClick={handleDeleteQuery}><img src='/public/assets/icons/delete.svg' width={24} height={24}/></button>
            </div>
        </div>
            <div className="small-medium lg:base-medium py-5">
                <p>{query?.caption}</p>
                <ul className="flex gap-1 mt-2 text-sm text-slate-700">
                    <span>Tag(s):</span>
                    {query.tags.map((tag: string, index: string) => (
                    <li key={`${tag}${index}`}>
                        #{tag}
                    </li>
                    ))}
                </ul>
            </div>
            {/* If an image URL available */}
            {/* <img src='/public/assets/images/Sample-img.jpg' className='rounded-lg'/> */}
        <div>
            <button className='flex gap-2 text-sm items-center'><img src='/assets/icons/up.svg' width={18} height={18}/>{query.likes} Up votes</button>
        </div>




        {/* Answer */}
        <div className='mt-5 border p-2 rounded-lg md:p-5 md:mt-10'>
            <p className='text-sm md:text-base font-bold pb-5'>Answers:</p>
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/660f948b242a31729747`}>
                    <img src={query.creator.imageUrl} className='rounded-full w-12 lg:h-12'/>
                </Link>
                <div className="flex flex-col">
                    <p className='base-medium lg:body-bold '>
                        User Test <span className='text-xs text-slate-500'>(usertest)</span>
                    </p>
                    <div className='gap-2'>
                        <p className='text-xs text-slate-500'>
                            {/* {dateConverter(query.$createdAt)} */}
                            7 hours ago
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${user!= query?.creator.$id ? "hidden":"flex flex-row gap-4 md:gap-8"}`}>
            {/* <Link to={`/edit-query/${query.$id}`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={24} height={24}/>
            </Link> */}
            {/* <button onClick={handleDeleteQuery}><img src='/public/assets/icons/delete.svg' width={24} height={24}/></button> */}
            </div>
        </div>
            <div className="small-medium lg:base-medium py-5">
                <p>This is a sample reply</p>
            </div>
            {/* If an image URL available */}
            {/* <img src='/public/assets/images/Sample-img.jpg' className='rounded-lg'/> */}
        </div>
        <form className='flex rounded-lg my-5 gap-3'>
            <input type='text' id="reply" className='bg-stone-100 border px-4 py-2 rounded-md w-full' placeholder="Reply..."/>
            <button type='submit' className='syn-button-2'>Send</button>
        </form>
     </div>
      )}
    </div>
  )
}

export default QueryDetails