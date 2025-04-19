import React from 'react'
import '../css/footer.css'

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} - GIO Construcción & Diseño - Todos los derechos reservados</p>
            </div>
        </footer>
    )
}

export default Footer