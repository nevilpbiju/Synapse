import { Models } from "appwrite";
import MainLoader from "../../components/shared/MainLoader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import QueryCard from "../../components/shared/QueryCard";

const Home = () => {
 
  const { data: querys, isPending: isLoading, isError: isErrorPosts } = useGetRecentPosts(); 

  return (
    <div className="flex flex-1">
      <div className="home-container">
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

export default Home