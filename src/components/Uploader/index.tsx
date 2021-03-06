import { useRouter } from "next/router"
import { ChangeEvent, useContext, useRef, useState } from "react"
import { FileContext } from "../../contexts/uploadFile"
import { checkFileType } from "../../services/uploadUtils"

export default function Uploader(){

    const route = useRouter()

    // Local URL path to the file
    const [inputFile, setInputFile] = useState<File>()

    // Get the Upload Context
    const { setLocalStorageImage, setLocalStorateCsv } = useContext(FileContext)

    // Create a Ref to Input
    const imageInputRef = useRef<HTMLInputElement>()

    // Get the current file local path
    const handleUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputFile(e.target.files[0])
    }

    // Use the window to redirect because, as long as the data is in localStorage and updating the page will permit access the data
    const redirectAfterUpload = (route: string) => {
        return window.location.href = route
    }
    
    // Handle the functionalities to save the path when submited
    const handleFormSubmit = async (e: any) => {
        e.preventDefault()
            if(!inputFile){
                alert('You cant upload without a file in input')
                return
            }
            const fileType = checkFileType(inputFile)
            if( fileType === 'png' ){
                setLocalStorageImage(inputFile)
                redirectAfterUpload('/gallery')
            } else if( fileType === 'csv' ){
                const responseSetLocalCsv = await setLocalStorateCsv(inputFile)
                if(responseSetLocalCsv){
                    redirectAfterUpload('/sheets')
                }
            }
    }

    // Handle the input change when the user cancel this file
    const handleUploadInputCancel = () => {
        const imageInput = imageInputRef.current
        setInputFile(null)
        imageInput.value = ''
    }

    return(
        <div className="flex justify-center mt-8">
            <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
                <form action="" className="p-4 lg:p-6" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="inline-block mb-2 text-gray-500">Upload Files (png, CSV - comma delimited)</label>
                        <div className="flex items-center justify-center w-full">
                            <label className={`flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 ${inputFile ? 'bg-green-200' : ''}`}>
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd" />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        {inputFile?.name ? inputFile.name : 'Select a File' }
                                    </p>
                                </div>
                                <input aria-label="input-file" ref={imageInputRef} type="file" accept=".png,.csv" className="opacity-0" onChange={handleUploadInputChange} />
                            </label>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button className="px-4 py-2 text-white bg-red-500 rounded shadow-xl" type="reset" onClick={handleUploadInputCancel}>Clear</button>
                        <button className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}