// Function separated for not duplicate for now, and for further implementation where it could become more complex

export const checkFileType = (file: File) => {

    if(file['type'] === 'image/png'){
        return 'png'
    } else if(file['type'] === 'text/csv') {
        return 'csv'
    } else {
        // Error Page
        
    }
}