import { Models } from "appwrite";
import MainLoader from "../../components/shared/MainLoader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import QueryCard from "../../components/shared/QueryCard";
import { useUserContext } from "../../context/AuthContext";
import RightSideBard from "../../components/shared/RightSideBard";
import { Link } from "react-router-dom";

const Home = () => {
 
  const { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetRecentPosts(); 
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();


  sessionStorage.setItem('user', user.id);
      console.log(sessionStorage.getItem('user'));

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="overflow-hidden">
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
      <div className="right-container">
          <div className="overflow-hidden">
            {/* <Link to={`/profile/${user.id}`} className='flex gap-3 justify-center my-10'>
              <img src={user.imageUrl || 'assets/icons/profile-placeholder.svg  '} className='h-14 w-14 rounded-full'/>
              <div className='flex flex-col'> 
              <p className='body-bold'>{user.name}</p>
              <p className='small-regular text-slate-600'>@{user.username}</p>
              </div>
            </Link> */}
            <div className="w-full text-center uppercase small-medium pt-5">Suggested For You</div>
            <RightSideBard/>
      </div></div>
    </div>
  )
}

export default Home