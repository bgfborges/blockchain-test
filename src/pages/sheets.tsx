import FilesSection from "../components/FilesSection";
import Hero from "../components/Hero";
import { useContext, useEffect, useState } from "react";
import { FileContext } from "../contexts/uploadFile";

const headerInfo = {
    titleOne: 'Store CSVs',
    titleTwo: 'and list whenever necessary',
    description: '100% private. Easily stored in your own browser.',
    image: '/images/hero-background.png',
}

type CsvProps = {
    data: string;
    filename: string;
    amountRows: string;
}

export default function Sheets(){
    const { csvFiles } = useContext(FileContext)
    const [ storedCsvFiles, setStoredCsvFiles ] = useState<CsvProps[] | false>([])

    const formatCsvs = (data: object[]) => {
            
        if(data && data.length > 0 && data.map){
            let newData = data.map(csv => ({
                data: csv['data'],
                filename: csv['filename'],
                amountRows: 'Document with amount of ' + csv['amountRows'] + ' rows'
            }))

            return newData
        } else {
            return false
        }

    }

    useEffect(() => {
        setStoredCsvFiles(formatCsvs(csvFiles))
    }, [csvFiles])

    return(
        <>
            <Hero 
            {...headerInfo} 
            />
            { storedCsvFiles && <FilesSection csvFiles={storedCsvFiles} /> }
        </>
    )
}