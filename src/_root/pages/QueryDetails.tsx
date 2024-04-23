import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeletePost, useGetAnswers, useGetPostById } from '../../lib/react-query/queriesAndMutations';
import MainLoader from '../../components/shared/MainLoader';
import { dateConverter, showCaption } from '../../lib/utils';
import { fetchReplies, uploadAnswer } from '../../lib/appwrite/api';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/AuthContext';
import AnswerCard from '../../components/shared/AnswerCard';
import { Models } from 'appwrite';

const QueryDetails = () => {

  const {id} = useParams();
  const { user } = useUserContext();
  const { data: query, isPending } = useGetPostById(id || '');
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePost();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetAnswers(query?.$id); 



  async function onSubmit(event: Event) {
    try{
        const ans = (document.getElementById("reply") as HTMLInputElement).value;
        if(ans.trim().length>0){
            const answer = await uploadAnswer(
                user.id,
                ans,
                query.$id
            );
            if(answer){
                (document.getElementById('reply') as HTMLInputElement).value="";
                console.log("Successfully replied");
            }
        }
    }
    catch(error){
        console.log(error);
    }

  }

//   async function onLoad() {
//       const replies = await fetchReplies(id);
//       console.log(replies);
//       const getContent = (obj: { content: string }) => obj.content;
//       const contentArray: string[] =replies?.map(getContent);
//       console.log(contentArray);
//   }

  const handleDeleteQuery = () => {
    deletePost({ postId: id });
    navigate('/');
  };
  console.log(query);
//   onLoad();
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
            <div className={`${user.id!= query?.creator.$id ? "hidden":"flex flex-row gap-4 md:gap-8"}`}>
            <Link to={`/edit-query/${query.$id}`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={24} height={24}/>
            </Link>
            <button onClick={handleDeleteQuery}><img src='/public/assets/icons/delete.svg' width={24} height={24}/></button>
            </div>
        </div>
            <div className="small-medium lg:base-medium py-5">
                <p>{showCaption(query?.caption)}</p>
                <ul className="flex gap-1 mt-2 text-sm text-slate-700">
                    <span>Tag(s):</span>
                    {query.tags.map((tag: string, index: string) => (
                    <li key={`${tag}${index}`}>
                        #{tag}
                    </li>
                    ))}
                </ul>
            </div>
        <div>
            <button className='flex gap-2 text-sm items-center'><img src='/assets/icons/up.svg' width={18} height={18}/>{query.likes.length || 0}</button>
        </div>




        {/* Answer */}
        <div className='mt-5 border p-2 rounded-lg md:p-5 md:mt-10'>
            <p className='text-sm md:text-base font-bold pb-5'>Answers:</p>
            {isLoading && !querys ? (
                <MainLoader/>
                ):(
                <ul className="flex flex-col flex-1 gap-9">
                    {querys?.documents.map((query: Models.Document)=>(
                    <AnswerCard query={query} key={query.$id}/>
                    ))}
                </ul>
            )}
        </div>
        <form className='flex rounded-lg my-5 gap-3' autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <input type='text' id="reply" className='bg-stone-100 border px-4 py-2 rounded-md w-full' placeholder="Reply..."/>
            <button type='submit' className='syn-button-2'>Send</button>
        </form>
        </div>
      )}
    </div>
  )
}

export default QueryDetails