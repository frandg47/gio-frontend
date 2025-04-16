


import Banner from './components/Banner'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Navbar from './components/navbar'
import ProjectsCarousel from './components/ProjectsCarousel'
import Services from './components/Services'
import './css/index.css'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <ProjectsCarousel />
      <Banner />
      <Contact />
    </>
  )
}

export default App
