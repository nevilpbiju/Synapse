import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import FileUploader from "../shared/FileUploader"
import { fields } from "@hookform/resolvers/zod/src/__tests__/__fixtures__/data.js"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const QueryForm = ({post}) => {

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

  return (
    <div className="max-w-5xl mx-auto">
    <form className="flex flex-col gap-9">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Query*</label>
          <textarea id="caption" name="caption" className="mt-1 p-2 w-full border rounded-md shad-textarea custom-scrollbar"></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Add Photos</label>
          <div className="border rounded-lg">
            {/* Make image uploads */}
          <FileUploader/>
          </div>
          {/* <input type="file" id="file" name="file" className="mt-1 p-2 w-full border rounded-md bg-white" /> */}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Add Tag(s)* (separated by comma ",")</label>
          <input type="text" id="tags" name="tags" placeholder="studytips, edtech, csstudents" className="mt-1 p-2 w-full border rounded-md shad-input" />
        </div>

        <div className="flex justify-center items-center gap-6">
          <button type="button" className="syn-button-2" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="syn-button" disabled>Submit</button>
        </div>
    </form>
    </div>
  )
}

export default QueryForm