import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../contexts/uploadFile";
import FileCard from "../FileCard";

export default function FilesSection(){
    const { csvFiles } = useContext(FileContext)
    const [ storedCsvFiles, setStoredCsvFiles ] = useState<object[]>(csvFiles)

    useEffect(() => {
        setStoredCsvFiles(csvFiles)
    }, [csvFiles])


    return(
        <section className="overflow-hidden text-gray-700 ">
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    { storedCsvFiles && storedCsvFiles.map((csv, i) => <FileCard key={i} />) }
                </div>
            </div>
        </section>
    )
}