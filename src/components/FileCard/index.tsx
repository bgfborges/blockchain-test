interface FileCardProps {
    filename: string;
    amountRows: string;
}

export default function FileCard({ filename, amountRows }: FileCardProps){
    return(
        <div className="flex flex-wrap w-1/3">
            <div className="w-full p-1 md:p-2">
                <h2 className="text-xl">{filename}</h2>
                <small>{amountRows}</small>
            </div>
        </div>
    )
}