import { createContext, ReactNode, useEffect, useState } from 'react'

interface FileContextData {
    images: object[];
    setLocalStorageImage: (file: File) => void;
}

export const FileContext = createContext<FileContextData>(
    {} as FileContextData // it's a hack in the most part of documentations for the initial state on this format
)

interface filesProviderProps {
    children: ReactNode;
}

export const FilesProvider = ({children}: filesProviderProps) => {

    const [storedImages, setStoredImages] = useState<object[]>([])
    
    useEffect(() => {
        var images = (JSON.parse( localStorage.getItem('images')) || "[]") as object[]  // If it's empty (because never stored anything), return an empty array
        setStoredImages(images)
    }, [])

    // With the purpose of further improvements, the name of this function should be more generic, to declare the action and nothing more (as long as the process may be different someday)
    // But on the purpose of this test, it's more clearly and easy to understand defining the name with the action it will have
    function setLocalStorageImage(file: File) {
        // Set the new image to the old array in local state
        const localStorageImages = JSON.parse( localStorage.getItem('images') || "[]" )
        // Set the new storage with the new image
        
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            // Check if the result is a string and not an ArrayBuffer
            if(typeof reader.result === 'string'){
                // convert image file to base64 string and save to localStorage
                localStorageImages.push({
                    filename: file.name,
                    size: file.size,
                    data: reader.result
                })
                localStorage.setItem('images',  JSON.stringify( localStorageImages ))
            }
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    return (
        <FileContext.Provider value={{ images: storedImages , setLocalStorageImage }}>
            {children}
        </FileContext.Provider>
    )
}