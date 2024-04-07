import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { QueryValidation } from "../../lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "../../lib/react-query/queriesAndMutations"
import { useState } from "react"

 

type PostFormProps={
  post?: Models.Document;
  action: 'Create' | 'Update';
}


const QueryForm = ({post, action}: PostFormProps) => {

  const {mutateAsync: createQuery, isPending: isLoadingCreate} = useCreatePost();
  const {mutateAsync: updateQuery, isPending: isLoadingUpdate} = useUpdatePost();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userI = sessionStorage.getItem('user').toString();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof QueryValidation>>({
    resolver: zodResolver(QueryValidation),
    defaultValues: {
      UserID: "",
      content: "",
      domain: "",
      timestamp: "",
    },
  });
  async function onSubmit(values: z.infer<typeof QueryValidation>) {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
  
    setIsSubmitting(true); // Disable the submit button
    
    try {
      if (post && action === "Update") {
        const updatedQuery = await updateQuery({
          ...values,
          queryId: post.$id,
        });
        if (!updatedQuery) {
          console.log("Failed to update");
          return;
        }
        navigate(`/query/${post.$id}`);
      } else {
        console.log(values);
        const newQuery = await createQuery({
          ...values,
          UserID: userI,
        });
        if (!newQuery) {
          console.log("Error adding question");
          return;
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button after form submission
    }
  }
  

  return (
    <div>
    <form className="mt-6 flex flex-col gap-9 w-80 md:w-[26rem]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Query*</label>
          <textarea id="content" className="mt-1 p-2 shad-textarea custom-scrollbar" {...register('content', { required: true, minLength: 20 })} defaultValue={post && post.caption}></textarea>
          {errors.content && <p className="text-red-500 text-xs">Question must be at least 20 characters long</p>}
        </div>

            {/* Make image uploads */}
          {/* <FileUploader/> */}
          

        <div className="flex flex-col">
          <label className="text-sm font-medium">Add Tag(s)* (separated by comma ",")</label>
          <input type="text" id="domain" placeholder="studytips, edtech, csstudents" 
          value={post && post.tags} 
          className={post? "mt-1 p-2 w-full border rounded-md shad-input pointer-events-none bg-stone-50":"mt-1 p-2 w-full border rounded-md shad-input"} {...register('domain', { required: true, validate: value => value.trim().length > 0 })}/>
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