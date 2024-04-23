import { Link } from "react-router-dom"

const RecommendationCard = ({query}) => {
  console.log(query);

  return (
    <div><div className='border px-10 py-5 m-5 w-[230px] h-[360px] rounded-2xl bg-white' id={query?.$id}>
    <Link to={`/profile/${query?.$id}`} className='flex flex-col justify-center items-center text-center gap-2'>
        <img src={query?.imageUrl} className='rounded-full w-14 lg:w-28'/>
        <div className='body-bold'>{query?.name}</div>
        <p className='small-regular text-slate-600'>@{query?.username}</p>
        <p>{query?.institute || 'Unknown'}</p>
        <div>Points: {query?.points || 0}</div>
    </Link>
</div></div>
  )
}

export default RecommendationCard