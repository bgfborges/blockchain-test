interface ImageCardProps {
    src: string;
}

export default function ImageCard({ src }: ImageCardProps){
    return(
        <div className="flex flex-wrap w-1/3">
            <div className="w-full p-1 md:p-2">
            <img alt="gallery-item" className="block object-cover object-center w-full h-full rounded-lg" src={ src } />
            </div>
        </div>
    )
}