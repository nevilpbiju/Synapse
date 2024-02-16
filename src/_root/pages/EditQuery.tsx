import React from 'react'
import QueryForm from '../../components/forms/QueryForm'
import { useParams } from 'react-router-dom'
import { useGetPostById } from '../../lib/react-query/queriesAndMutations';
import MainLoader from '../../components/shared/MainLoader';

const EditQuery = () => {
  const { id } = useParams();
  const {data: query, isPending } = useGetPostById(id || '');

  if(isPending) return <MainLoader/>
  return (
    <div className='flex flex-1 bg-stone-50'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src='/assets/icons/add-post.svg'
          width={36}
          height={36}
          alt='add'/>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit</h2>
        </div>
        <QueryForm action="Update" post={query} />
      </div>
    </div>
  )
}

export default EditQuery 