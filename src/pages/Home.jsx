import React from 'react'
import Banner from '../components/Banner'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import ProjectsCarousel from '../components/ProjectsCarousel'
import Services from '../components/Services'

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {


    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo === "contact") {
            const section = document.getElementById("contact");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <>
            <Hero />
            <Services />
            <ProjectsCarousel />
            <Banner />
            <Contact />
        </>
    )
}

export default Home