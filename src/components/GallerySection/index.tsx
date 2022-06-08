import ImageCard from "../ImageCard"

interface GallerySectionProps {
    images: {
        data: string,
        filename: string,
    }[];
}

export default function GallerySection({ images }: GallerySectionProps){
    return(
        <section className="overflow-hidden text-gray-700 ">
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    { images && images.map((img, i) => <ImageCard key={i} src={img.data} />) }
                </div>
            </div>
        </section>
    )
}