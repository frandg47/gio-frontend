import React, { useState } from "react";
import "../css/contact.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FORM_SCHEMA } from '../helpers/validationsSchemas';
import Swal from "sweetalert2";
import { axiosInstance } from "../config/axiosInstance";

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(FORM_SCHEMA)
    });

    const [isSubmitting, setIsSubmitting] = useState(false); 

    const onSubmit = async (data) => {
        setIsSubmitting(true); 
        try {
            await axiosInstance.post("/enviar/formulario", data);
            Swal.fire({
                icon: "success",
                title: "Mensaje enviado correctamente",
                text: "¡Pronto nos pondremos en contacto!"
            });
            reset();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error",
                text: error.response?.data?.mensaje || "Intenta nuevamente más tarde"
            });
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        <section id="contact" className="contact-section container">
            <h2 className="text-center contact-title">Contacto</h2>

            <div className="contact-row">
                <div className="contact-left">
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-1">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="José Martinez"
                                {...register("name")}
                            />
                            <p className="text-danger mt-1">{errors.name?.message}</p>
                        </div>

                        <div className="mb-1">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                                {...register("email")}
                            />
                            <p className="text-danger mt-1">{errors.email?.message}</p>
                        </div>

                        <div className="mb-1">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea
                                className="form-control textarea"
                                id="message"
                                rows="4"
                                placeholder="Escribe tu mensaje aquí..."
                                {...register("message")}
                            ></textarea>
                            <p className="text-danger mt-1">{errors.message?.message}</p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-dark w-100 mt-2 d-flex justify-content-center align-items-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            )}
                            {isSubmitting ? "Enviando..." : "Enviar"}
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





