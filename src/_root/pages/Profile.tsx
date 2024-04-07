import React from 'react'
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import MainLoader from '../../components/shared/MainLoader';
import { useUserContext } from '../../context/AuthContext';
import { useGetUserById } from '../../lib/react-query/queriesAndMutations';
import { useAddFriend, useCheckConnection } from '../../lib/appwrite/api';

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

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <MainLoader />
      </div>
    );

  async function addFriend(){
    const result = await useAddFriend(id, user.id);
    console.log("result");
  }
  // async function checkConnection() {
  //   const connection = await useCheckConnection(id, user.id);
  //   console.log(connection);
  // }
  
  // checkConnection();
  return (
    <div className="profile-container bg-stone-50">
      <div className="profile-inner_container bg-white p-8 rounded-xl">
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
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-slate-600 text-center xl:text-left">
                @{currentUser.username}
              </p>
              <div className='py-4'>
                <p className="small-regular md:small-semibold text-slate-600 text-center xl:text-left">Institution: {currentUser.institute ? currentUser.institute : "Unknown"}</p>
                <p className="small-regular md:small-semibold text-slate-600 text-center xl:text-left">Interests: {currentUser.bio ? currentUser.bio : "Unknown"}</p>
              </div>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value="0" label="Queries" />
              <StatBlock value="0" label="Friends" />
              <StatBlock value="0" label="Points" />
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
              <button type="button" className="syn-button-2 px-8" onClick={addFriend}>
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile


