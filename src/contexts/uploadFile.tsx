import { createContext, ReactNode, useEffect, useState } from 'react'

interface FileContextData {
    images: object[];
    csvFiles: object[];
    setLocalStorageImage: (file: File) => void;
    setLocalStorateCsv: (file: File) => void;
}

export const FileContext = createContext<FileContextData>(
    {} as FileContextData // it's a hack in the most part of documentations for the initial state on this format
)

// With the purpose of further improvements, the name of this function should be more generic, to declare the action and nothing more (as long as the process may be different someday)
// But on the purpose of this test, it's more clearly and easy to understand defining the name with the action it will have
function setLocalStorageImage(file: File) {
    // Set the new image to the old array in local state
    const localStorageImages = JSON.parse( localStorage.getItem('images') || "[]" )
    
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

async function getAmountRows(file: File){
    var lines = (await file.text()).split("\n").length;
    return lines    
}

async function setLocalStorateCsv(file: File) {
    // Set the new csv to the old array in local state
    const localStorageCsvs = JSON.parse( localStorage.getItem('csvs') || "[]" )
    
    const reader = new FileReader()

    // Define Amount of Rows of this CSV
    const amountRows = await getAmountRows(file)

    reader.addEventListener('load', () => {
        // Check if the result is a string and not an ArrayBuffer
        if(typeof reader.result === 'string'){
            // convert image file to base64 string and save to localStorage
            localStorageCsvs.push({
                filename: file.name,
                size: file.size,
                data: reader.result,
                amountRows,
            })
            localStorage.setItem('csvs',  JSON.stringify( localStorageCsvs ))
        }
    }, false)

    if (file) {
        reader.readAsDataURL(file)
    }
}

interface filesProviderProps {
    children: ReactNode;
}

export const FilesProvider = ({children}: filesProviderProps) => {

    const [storedImages, setStoredImages] = useState<object[]>([])
    
    const [storedCsvs, setStoredCsvs] = useState<object[]>([])
    
    // Retrieve Images from LocalStorage
    useEffect(() => {
        var images = (JSON.parse( localStorage.getItem('images')) || "[]") as object[]  // If it's empty (because never stored anything), return an empty array
        setStoredImages(images)
    }, [])
    
    // Retrieve CSVs from LocalStorage
    useEffect(() => {
        var csvs = (JSON.parse( localStorage.getItem('csvs')) || "[]") as object[]  // If it's empty (because never stored anything), return an empty array
        setStoredCsvs(csvs)
    }, [])

    return (
        <FileContext.Provider value={{ images: storedImages, csvFiles: storedCsvs, setLocalStorageImage, setLocalStorateCsv }}>
            {children}
        </FileContext.Provider>
    )
}