import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../css/contact.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";


const Contact = () => {

    return (
        <section id="contact" className="contact-section container">



            <div className="row">
                <div className="col-lg-4 col-12 d-grid align-items-center">
                    {/* 
                        <Form onSubmit={""} className="d-flex flex-column gap-3 align-items-center justify-content-center w-100">

                            <Row className="">
                                <Form.Control
                                    placeholder="Nombre"
                                    name="name" />
                                <p className="text-danger my-1">
                                    {/* {errors.name?.message} 
                                </p>
                            {/* </Row>
                            <Row>
                                <Form.Control
                                    type="email"
                                    placeholder="E-mail"
                                    name="username" />
                                <p className="text-danger my-1">
                                    {/* {errors.username?.message} 
                                </p>
                            {/* </Row>
                            <Row>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Escriba su mensaje"
                                    style={{ height: "100px" }}
                                    className="textarea"
                                    name="description"
                                />
                                <p className="text-danger my-1">
                                    {/* {errors.description?.message} 
                                </p> 
                            {/* </Row>
                            <Row>
                                <button type="submit" className="btn btn-outline">Enviar</button>
                            </Row>
                        </Form> */}
                    <div className="">
                        <label
                            for="name"
                            className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="José Martinez" />
                    </div>
                    <div className="">
                        <label
                            for="email"
                            className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="nombre@ejemplo.com" />
                    </div>
                    <div className="">
                        <label
                            for="message"
                            class="form-label">
                            Mensaje
                        </label>
                        <textarea
                            className="form-control textarea"
                            id="message"
                            rows="3">
                        </textarea>
                    </div>
                    <button type="button" className="btn btn-outline-dark">Enviar</button>
                </div>

                <div className="col-8 d-grid align-items-center">

                    <h2 className="text-center">
                        Contacto
                    </h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.118032695636!2d-65.20965262546022!3d-26.83619789000945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1697069770424!5m2!1ses-419!2sar" className="img-fluid w-100" style={{ height: 350 }} ></iframe>
                </div>
            </div>


        </section>
    );
};

export default Contact;