import React from "react";
import "../css/contact.css";

const Contact = () => {
    return (
        <section id="contact" className="contact-section container">
            <h2 className="text-center contact-title">Contacto</h2>

            <div className="contact-row">
                <div className="contact-left">
                    <form className="contact-form">
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="José Martinez"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea
                                className="form-control textarea"
                                id="message"
                                rows="4"
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
                        </div>

                        <button type="button" className="btn btn-outline-dark w-100 mt-2">
                            Enviar
                        </button>
                    </form>
                </div>

                <div className="contact-right">
                    <div className="contact-right-inner">
                        <div className="contact-info">
                            <h5><strong>Email:</strong> gio.arquitectura.d@gmail.com</h5>
                            <h5><strong>Teléfono:</strong> +54 3814199809</h5>
                        </div>
                        <div className="image-container">
                            <img
                                src="/contacto.jpg"
                                alt="Contacto"
                                className="img-logo shadow-sm img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;




