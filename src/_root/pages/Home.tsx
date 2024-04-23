import { Models } from "appwrite";
import MainLoader from "../../components/shared/MainLoader";
import { useGetRecommendedPosts } from "../../lib/react-query/queriesAndMutations";
import QueryCard from "../../components/shared/QueryCard";
import { useUserContext } from "../../context/AuthContext";
import RightSideBard from "../../components/shared/RightSideBard";
import { Link } from "react-router-dom";
import { removeDuplicates } from "../../lib/utils";

const Home = () => {
 
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();
  const { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetRecommendedPosts(user.bio);

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
              {removeDuplicates(querys)?.map((query: Models.Document)=>(
                <QueryCard query={query} key={query.$id}/>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
      <div className="right-container">
          <div className="overflow-hidden">
            <RightSideBard/>
      </div></div>
    </div>
  )
}

export default Home