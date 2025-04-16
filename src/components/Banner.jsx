import React from 'react'
import '../css/banner.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Banner = () => {
    return (
        <div className="banner-social">
            <div className="banner-inner">
                <div className="banner-text">
                    <h2>Conectá con nosotros</h2>
                    <p>Seguinos en nuestras redes sociales y descubrí más sobre nuestros proyectos y servicios.</p>
                </div>

                <div className="banner-media">
                    <div className="social-icons-vertical">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>

                    <div className="banner-logo">
                        <img src="../public/GIO MAS TIRA.png" alt="Logo" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner

