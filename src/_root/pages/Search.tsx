import React from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queriesAndMutations';
import MainLoader from '../../components/shared/MainLoader';
import Loader from '../../components/shared/Loader';
import QueryCard from '../../components/shared/QueryCard';
import { Models } from 'appwrite';
import { useForm } from 'react-hook-form';
import { getResultPosts } from '../../lib/appwrite/api';
import { z } from 'zod';

const Search = () => {
  let { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetRecentPosts(); 
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(event: Event) {
    try {
      
      const key= (document.getElementById("key") as HTMLInputElement).value;
      
      if(key.trim().length>0){
        const res = await getResultPosts(key);
        console.log(key);
          if(!res){
            console.log("Error");
          }else{
            document.getElementById('res').innerHTML =".....";
            querys = res;
          }
        }
    } catch (error) {
        console.error('Validation error:', error instanceof z.ZodError ? error.errors : error);
    }
}

  return (
    <div className="flex flex-1">
      <div className="home-container">
      <form className='flex items-center justify-between gap-3 border rounded-lg p-3 w-80 md:w-[26rem] bg-white' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <input type="text" id="key" placeholder="Search..." className='outline-none'/>
      <button type="submit" className=''><img src='/assets/icons/search.svg'/></button>
      </form>
        <div className="home-posts">
          <div className="overflow-hidden" id='res'>
          {isLoading && !querys ? (
            <MainLoader/>
          ):(
            <ul className="flex flex-col flex-1 gap-9">
              {querys?.documents.map((query: Models.Document)=>(
                <QueryCard query={query} key={query.$id}/>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search