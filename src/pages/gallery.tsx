import { useContext, useEffect, useState } from "react"
import { FileContext } from "../contexts/uploadFile"
import GallerySection from "../components/GallerySection"
import Hero from "../components/Hero"

const headerInfo = {
    titleOne: 'Image Gallery',
    titleTwo: 'Private and Secure',
    description: '100% private. Easily stored in your own browser.',
    image: '/images/hero-background.png',
}

type ImageProps = {
    filename: string;
    data: string;
}

export default function Gallery() {
    const { images } = useContext(FileContext)
    const [renderedImages, setRenderedImages] = useState<ImageProps[] | false>([])

    const formatImages = (data: object[]) => {
            
        if(data && data.length > 0 && data.map){
            let newData = data.map(image => ({
                data: image['data'],
                filename: image['filename']
            }))

            return newData
        } else {
            return false
        }

    }

    useEffect(() => {
        setRenderedImages(formatImages(images))
    }, [images])
    
    return (
        <>
        <Hero {...headerInfo} />
        {renderedImages && <GallerySection images={renderedImages} /> }
        </>
    )
}