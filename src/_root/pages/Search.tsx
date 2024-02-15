import React from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queriesAndMutations';
import MainLoader from '../../components/shared/MainLoader';
import QueryCard from '../../components/shared/QueryCard';
import { Models } from 'appwrite';

const Search = () => {
  const { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetRecentPosts(); 

  return (
    <div className="flex flex-1">
      <div className="home-container">
      <form className='flex items-center justify-between gap-3 border rounded-lg p-3 w-80 md:w-[26rem] bg-white'>
      <input type="text" placeholder="Search..." className='outline-none'/>
      <button type="submit" className=''><img src='/public/assets/icons/search.svg'/></button>
      </form>
        <div className="home-posts">
          <div className="overflow-auto">
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