import FileCard from "../FileCard";

interface FileSectionProps {
    storedCsvFiles: object[];
}

export default function FilesSection({ storedCsvFiles }: FileSectionProps){
    return(
        <section className="overflow-hidden text-gray-700 ">
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    { storedCsvFiles && storedCsvFiles.map((csv, i) => <FileCard key={i} filename={csv['filename']} amountRows={csv['amountRows']} />) }
                </div>
            </div>
        </section>
    )
}