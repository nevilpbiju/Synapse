import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import FileUploader from "../shared/FileUploader"
import { QueryValidation } from "../../lib/validation"
import { Models } from "appwrite"
import { useCreatePost } from "../../lib/react-query/queriesAndMutations"

 

type PostFormProps={
  post?: Models.Document;
}


const QueryForm = ({post}: PostFormProps) => {

  const {mutateAsync: createQuery, isPending: isLoadingCreate} = useCreatePost();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const userI = sessionStorage.getItem('user').toString();

  const form = useForm<z.infer<typeof QueryValidation>>({
    resolver: zodResolver(QueryValidation),
    defaultValues: {
      UserID: "",
      content: "",
      domain: "",
      timestamp: "",
    },
  })
  async function onSubmit(values: z.infer<typeof QueryValidation>) {
    console.log("in onSubmit");
        console.log(values);
        const newQuery = await createQuery({
          ...values,
          UserID: userI,
        })
        if(!newQuery){
          console.log("Error adding question");
        }else{
          navigate('/');
        }
    }

  return (
    <div>
    <form className="mt-6 flex flex-col gap-9 w-80 md:w-[26rem]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Query*</label>
          <textarea id="content" className="mt-1 p-2 shad-textarea custom-scrollbar" {...register('content', { required: true, minLength: 20 })}></textarea>
          {errors.content && <p className="text-red-500 text-xs">Question must be at least 20 characters long</p>}
        </div>

            {/* Make image uploads */}
          {/* <FileUploader/> */}
          

        <div className="flex flex-col">
          <label className="text-sm font-medium">Add Tag(s)* (separated by comma ",")</label>
          <input type="text" id="domain" placeholder="studytips, edtech, csstudents" className="mt-1 p-2 w-full border rounded-md shad-input" {...register('domain', { required: true, validate: value => value.trim().length > 0 })}/>
          {errors.domain && <p className="text-red-500 text-xs">At least one tag is required</p>}
        </div>

        <div className="flex justify-center items-center gap-6">
          <button type="button" className="syn-button-2" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="syn-button">Submit</button>
        </div>
    </form>
    </div>
  )
}

export default QueryForm