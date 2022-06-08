import '../styles/globals.scss'
import { FilesProvider } from '../contexts/uploadFiles'

function MyApp({ Component, pageProps }) {

  return (
    <FilesProvider>
      <Component {...pageProps} />
    </FilesProvider>
  )
}

export default MyApp
