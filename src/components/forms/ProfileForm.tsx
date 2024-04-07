import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfile } from '../../lib/appwrite/api';


const ProfileForm = () => {

    
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUserContext();
    const userId = id ? id : "";
    if (id!=user.id){
        navigate('/');
    }

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(event: Event) {

    try {

        let name= (document.getElementById("name") as HTMLInputElement).value;
        let bio= (document.getElementById("bio") as HTMLInputElement).value;
        let institute= (document.getElementById("institute") as HTMLInputElement).value;

        if (name.trim().length==0){
          name=user.name;
        }

        if (institute.trim().length==0 && user.institute.length!=0){
          institute=user.institute;
        }

        const updatedProfile = await updateProfile(
          name,
          bio,
          institute,
          userId
        );
        if(!updatedProfile){
          console.log("Error updating details");
        }
        else{
          navigate('/profile/'+user.id);
        }
    } catch (error) {
        console.error('Validation error:', error instanceof z.ZodError ? error.errors : error);
    }
}

  return (
    <form className="mt-6 flex flex-col gap-9 w-80 md:w-[26rem]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-end">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
      <input type="text" id="name" name="name"
        className="mt-1 sm:ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500" placeholder={user.name} />
      </div>

      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-end">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
        <input type="text" id="bio" name="bio" readOnly={user.bio !== null}
          className={`mt-1 sm:ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 ${user.bio !== null ? 'bg-gray-100 text-gray-800' : ''}`} value={user.bio}/>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-end">
        <label htmlFor="institute" className="block text-sm font-medium text-gray-700">Institute:</label>
        <input type="text" id="institute" name="institute"
          className="mt-1 sm:ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500" placeholder={user.institute} />
      </div>

      <div className="flex justify-center items-center gap-6">
      <button type="button" className="syn-button-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className=" syn-button">Update</button>
      </div>
</form>




  )
}

export default ProfileForm