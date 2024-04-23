import React from 'react'
import FriendCard from './FriendCard'
import RequestedCard from './RequestedCard'
import RecommendationCard from './RecommendationCard'
import { useUserContext } from '../../context/AuthContext'
import { useGetUserRecommendation } from '../../lib/react-query/queriesAndMutations'
import MainLoader from './MainLoader'
import { Models } from 'appwrite'
import { removeDuplicates } from '../../lib/utils'

const RightSideBard = () => {

  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const { data: requests, isPending: isLoading } = useGetUserRecommendation(user.bio);

  
  return (
            <div>
            {!isLoading && requests && (
  <ul className="">
    {removeDuplicates(requests)?.map((query: Models.Document) => (
      <RecommendationCard query={query} key={query.$id}/>
    ))}
  </ul>
)}
            </div>
  )
}

export default RightSideBard