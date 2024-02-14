import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader = (fieldChange, mediaUrl) => {
    const [file, setfile] = useState([]); 
    const [fileUrl, setfileUrl] = useState("");
    const onDrop = useCallback(acceptedFiles => {
        setfile(acceptedFiles);
      }, [])
      const {getRootProps, getInputProps } = useDropzone({onDrop,
        accept:{
            'image/*': ['.png','.jpg','.jpeg']
        }
    }) 

  return (
    <div {...getRootProps()} className='flex flex-center flex-col rounded-xl cursor-pointer bg-white'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ?(
            <div>
                Test
            </div>
        ):(
            <div className='flex-center flex-col p-7 h-80 lg:h-100'>
                <img src='/public/assets/icons/file-upload.svg' width={96} height={77}/>
                <h3 className='font-bold text-dark-3 mb-2 mt-6'>Drag and Drop</h3>
                <p className='small-medium text-gray-400 mb-2'>Select a file or drop one here</p>
                <button className='syn-button-2'>Choose a file</button>
            </div>
        )
      }
    </div>
  )
}

export default FileUploader