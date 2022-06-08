import { useContext, useEffect } from "react"
import { FileContext } from "../contexts/uploadFiles"
import GallerySection from "../components/GallerySection"
import Hero from "../components/Hero"

const headerInfo = {
    titleOne: 'Image Gallery',
    titleTwo: 'Private and Secure',
    description: '100% private. Easily stored in your own browser.',
    image: '/images/hero-background.png',
  }

export default function Gallery() {
    const { storedImages } = useContext(FileContext)
    
    return (
        <>
        <Hero {...headerInfo} />
        <GallerySection images={storedImages.map(image => ({
            data: image['data'],
            filename: image['filename']
        }) )}  />
        </>
    )
}