import { Models } from "appwrite";
import MainLoader from "../../components/shared/MainLoader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import QueryCard from "../../components/shared/QueryCard";
import { useUserContext } from "../../context/AuthContext";

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
    </div>
  )
}

export default Home