import Hero from "../components/Hero"
import UploadSection from "../components/UploadSection"

const headerInfo = {
  titleOne: 'Blockchain Manager',
  titleTwo: 'save and read files',
  description: 'One place where you can save your gallery and read your CSV files easily and for free',
  image: '/images/hero-background.png',
  buttonOne: {
    label: 'Get started',
    link: '#'
  },
  buttonTwo: {
    label: 'Github Project',
    link: '#'
  }
}

export default function Home() {
  return (
    <>
      <Hero {...headerInfo} />
      <UploadSection />
    </>
  )
}