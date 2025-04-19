import React from 'react'
import '../css/banner.css'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa'


const Banner = () => {
    return (
        <section className="banner-social" id="about">
            <div className="banner-inner">
                <div className="banner-text">
                    <h2>Conectá con nosotros</h2>
                    <p>Seguinos en nuestras redes sociales y descubrí más sobre nuestros proyectos y servicios.</p>
                </div>

                <div className="banner-media">
                    <div className="social-icons-vertical">
                        <a 
                        href="https://www.facebook.com/profile.php?id=61565154660636"
                        target="_blank"><FaFacebookF /></a>
                        <a 
                        href="https://www.instagram.com/gio.estudio.arq/"
                        target="_blank"><FaInstagram /></a>
                        <a 
                        href="https://www.tiktok.com/@gio.arquitectura"
                        target="_blank"><FaTiktok /></a>
                    </div>

                    <div className="banner-logo">
                        <img src="/GIO MAS TIRA.png" alt="Logo" />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Banner

