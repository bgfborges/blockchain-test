import { useContext, useEffect } from "react"
import { FileContext } from "../contexts/uploadFiles"

export default function Gallery() {
    const { storedImages } = useContext(FileContext)

    console.log(storedImages)
    
    return (
        <ul>
            { storedImages && storedImages.map( (file, i) => <li key={i}>{file['filename']}<img src={file['data']} alt="" /></li> ) }
        </ul>
    )
}