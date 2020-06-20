import '../bootstrap/bootstrap.min.css';
import React from "react";
import Container from "react-bootstrap/Container";
import Repository from "../repository/repository";

const Contact = (props) => {


    const onFormSubmit = (e) => {
        e.preventDefault();
        let data = {
            sender: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            content: e.target.content.value,
            dateLong:Date.now()
        };
        Repository.postContact(data);
        window.location="/contact";
    };

    return (
        <Container>
            <div className="row">
                <section>

                    <h2 className="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
                    <p className="text-center w-responsive mx-auto pb-5">Lorem ipsum dolor sit amet, consectetur
                        adipisicing
                        elit.
                        Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
                    </p>
                    <div className="row">
                        <div className="col-lg-5 mb-lg-0 mb-4">

                            <form onSubmit={onFormSubmit}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-header accent-1">
                                            <h3 className="mt-2">Write to us:</h3>
                                        </div>
                                        <div className="md-form">
                                            <input type="text" id="form-name" className="form-control" name="name"
                                                   placeholder={"Your name"}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <input type="text" id="form-email" className="form-control" name="email"
                                                   required
                                                   placeholder={"e-mail"}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <input type="text" id="form-Subject" className="form-control" name="subject"
                                                   placeholder={"Subject"}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <textarea id="form-text" className="form-control md-textarea" rows="3"
                                                      name="content" required
                                                      placeholder={"Content"}
                                            />
                                        </div>
                                        <br/>
                                        <div className="text-center">
                                            <button className="btn btn-success">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div className="col-lg-7">

                            <div id="map-container-section" className="z-depth-1-half map-container-section mb-4"
                                 style={{height: "400px"}}>
                                <iframe
                                    src="https://maps.google.com/maps?q=videosonik&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    style={{border: "0", width: "100%", height: "100%"}} allowFullScreen/>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <a className="btn-floating blue accent-1">
                                    </a>
                                    <p>Mon - Fri, 9:30-20:00</p>
                                    <p className="mb-md-0">Macedonia, Skopje</p>
                                </div>
                                <div className="col-md-4">
                                    <a className="btn-floating blue accent-1">
                                    </a>
                                    <p>Sat 9:00-15:00</p>
                                    <p className="mb-md-0">078 219 828</p>
                                </div>
                                <div className="col-md-4">
                                    <a className="btn-floating blue accent-1">
                                    </a>
                                    <p>zocky@t.mk</p>
                                    <p className="mb-0">videosonik@t.mk</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>
            </div>

        </Container>
    )
};
export default Contact;



