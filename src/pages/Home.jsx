import React from 'react'
import Banner from '../components/Banner'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ProjectsCarousel from '../components/ProjectsCarousel'
import Services from '../components/Services'

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <ProjectsCarousel />
            <Banner />
            <Contact />
            <Footer />
        </>
    )
}

export default Home