import Uploader from "../Uploader";

export default function UploadSection() {
    return(
        <section className="pt-14">
            <h2 className="text-3xl text-center font-bold">Upload your new file now</h2>
            <div className="max-w-7xl mx-auto">
            <Uploader />
            </div>
        </section>
    )
}