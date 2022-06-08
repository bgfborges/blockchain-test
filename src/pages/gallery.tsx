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

export default function Gallery() {
    const { images } = useContext(FileContext)
    const [renderedImages, setRenderedImages] = useState<object[]>(images)

    useEffect(() => {
        setRenderedImages(images)
    }, [images])
    
    return (
        <>
        <Hero {...headerInfo} />
        {renderedImages && <GallerySection images={renderedImages.map(image => ({
            data: image['data'],
            filename: image['filename']
        }) )}  />}
        </>
    )
}