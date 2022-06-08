import FilesSection from "../components/FilesSection";
import Hero from "../components/Hero";

const headerInfo = {
    titleOne: 'Store CSVs',
    titleTwo: 'and list whenever necessary',
    description: '100% private. Easily stored in your own browser.',
    image: '/images/hero-background.png',
}

export default function Sheets(){
    return(
        <>
            <Hero 
            {...headerInfo} 
            />
            <FilesSection />
        </>
    )
}