import React from 'react'
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import MainLoader from '../../components/shared/MainLoader';
import { useUserContext } from '../../context/AuthContext';
import { useGetUserById } from '../../lib/react-query/queriesAndMutations';
import { useAcceptFriend, useAddFriend, useCheckConnection, useDeleteRequest, useUpdatePoints } from '../../lib/appwrite/api';
import Loader from '../../components/shared/Loader';

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold">{value}</p>
    <p className="small-medium lg:base-medium">{label}</p>
  </div>
);

const Profile = () => {

  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  let loaded=false;
  let connectionId: string | undefined;

  const { data: currentUser } = useGetUserById(id || "");
  const { data: me } = useGetUserById(user.id);

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <MainLoader />
      </div>
    );


  function operations() {
    if (document.getElementById("btn").innerHTML=="Accept"){
      acceptFriend();
    }
    else if (document.getElementById("btn").innerHTML=="Add Friend"){
      addFriend();
    }
    else if (document.getElementById("btn").innerHTML=="Requested"){
      deleteRequest();
    }
    else if (document.getElementById("btn").innerHTML=="Review"){
      reviewFriend();
    }
  }

  // Add friend
  async function addFriend(){
    const result = await useAddFriend(id, user.id);
    if(result){
      document.getElementById("btn").innerHTML="Requested";
    }
  }

  // Accept Request
  async function acceptFriend() {
    const result = await useAcceptFriend(connectionId);
    let points
    if(currentUser.points==null){
      points=1;
    }else{
      points = currentUser.points+1;
    }
    await useUpdatePoints(currentUser.$id, points);
    if(me.points==null){
      points=1;
    }else{
      points = me.points+1;
    }
    await useUpdatePoints(me.$id, points);
    if(result){
      document.getElementById("btn").innerHTML="Review";
    }
    console.log("Request Accepted");
  }
  
  // Delete Request
  async function deleteRequest() {
    const result = await useDeleteRequest(connectionId);
    if(result){
      document.getElementById("btn").innerHTML="Add Friend";
    }
    console.log("Request Deleted");
  }

  // Review
  async function reviewFriend() {
    document.getElementById("popup").style.display="inline";
    document.getElementById("profile-container").style.display="none";
  }

  function closePopUp(){
    document.getElementById("popup").style.display="none";
    document.getElementById("report-popup").style.display="none";
    document.getElementById("profile-container").style.display="flex";

  }

  const saveRating = async function name()  {
    const ratingInputs = document.getElementsByName('rate');
    let selectedRating = 0;
    for (let i = 0; i < ratingInputs.length; i++) {
      if (ratingInputs[i].checked) {
        selectedRating = parseInt(ratingInputs[i].value);
        break;
      }
    }
    if(currentUser.points!=null){
      selectedRating+=currentUser.points;
    }
    const res= await useUpdatePoints(currentUser.$id, selectedRating);
    console.log(res);
  };


  // Report
  function openReport(){
    document.getElementById("profile-container").style.display="none";
    document.getElementById("report-popup").style.display="inline";
  }

  // Check if already friend
  async function checkConnection() {
    if(id!=user.id){
      const connection = await useCheckConnection(id, user.id);
      if(connection?.length!=0){
        connectionId = connection?.at(0)?.$id;
        if (!connection?.at(0).Accepted){
          // Pending Request
          if (connection?.at(0).receiverId==user.id){
            document.getElementById("btn").innerHTML="Accept"
          }else{
            document.getElementById("btn").innerHTML="Requested"
          }
        }
        else{
          document.getElementById("btn").innerHTML="Review"
        }
      }else if(connection?.length==0){
        console.log(connection.length);
        console.log("Show add btn");
        document.getElementById("btn").innerHTML="Add Friend"
      }
    }
  }
  if (!loaded){
    checkConnection();
    loaded =true;
  }
  return (
    
    <div className="profile-container bg-stone-50">
      <div className="profile-inner_container bg-white p-8 rounded-xl" id="profile-container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h2-bold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-slate-600 text-center xl:text-left">
                @{currentUser.username}
              </p>
              <div className='py-4'>
                <p className="base-regular text-slate-700 text-center xl:text-left capitalize">Institution: {currentUser.institute ? currentUser.institute : "Unknown"}</p>
                <p className="base-regular text-slate-700 text-center xl:text-left capitalize">Interests: {currentUser.bio ? currentUser.bio : "Unknown"}</p>
              </div>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Queries" />
              {/* <StatBlock value="0" label="Friends" /> */}
              {/* <StatBlock value="0" label="Rating" /> */}
              <StatBlock value={currentUser.points} label="Points" />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-stone-600 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  className='invert'
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <div className='flex gap-6'>
              <button type="button" className="syn-button-2 px-8" id='btn' onClick={operations}>
                <Loader/>
              </button>
              <button type='button' className='tooltip' onClick={openReport}>
                <img src='../../../public/assets/icons/report.svg'
                alt="report"
                width={30}
                height={30}
                />
                <span className='tooltiptext'>Report</span>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div id='popup' className='hidden'>
        <div className='border px-10 pb-5 pt-8 m-5 rounded-2xl bg-white'>
        <div className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={currentUser.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{currentUser.name}</div>
            <p className='small-regular text-slate-600'>@{currentUser.username}</p>
            <p>{currentUser.institute || 'Unknown'}</p>
            <div className="rate">
                <input type="radio" id="star5" name="rate" value="2" />
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="1" />
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="0" />
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="-1" />
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="-2" />
                <label htmlFor="star1" title="text">1 star</label>
            </div>
            <div className='flex gap-5'>
            <button onClick={saveRating} className='syn-button'>Save</button>
            <button id="cls" onClick={closePopUp} className='syn-button-2'>Close</button>
            </div>
        </div>
        </div>
        </div>
        <div id='report-popup' className='hidden'>
        <div className='border px-10 pb-5 pt-8 m-5 rounded-2xl bg-white'>
        <div className='flex flex-col justify-center items-center text-center gap-2'>
            <img src={currentUser.imageUrl} className='rounded-full w-14 lg:w-28'/>
            <div className='body-bold'>{currentUser.name}</div>
            <p className='small-regular text-slate-600'>@{currentUser.username}</p>
            <p className='small-regular'>{currentUser.institute || 'Unknown'}</p>
            <div className="radio-group">
              <span>Choose a reason:</span>
              <input type="radio" id="reason1" name="reason" value="It's spam" />
              <label htmlFor="reason1">It's spam</label>
              <input type="radio" id="reason3" name="reason" value="Nudity or Sexual Activity" />
              <label htmlFor="reason3">Nudity or Sexual Activity</label>
              <input type="radio" id="reason4" name="reason" value="Hate Speech or Symbol" />
              <label htmlFor="reason4">Hate Speech or Symbol</label>
              <input type="radio" id="reason5" name="reason" value="False Information" />
              <label htmlFor="reason5">False Information</label>
              <input type="radio" id="reason6" name="reason" value="Bullying or Harassment" />
              <label htmlFor="reason6">Bullying or Harassment</label>
            </div>

            <div className='flex gap-5'>
            <button className='syn-button-d'>Report</button>
            <button id="cls" onClick={closePopUp} className='syn-button-2'>Close</button>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Profile


