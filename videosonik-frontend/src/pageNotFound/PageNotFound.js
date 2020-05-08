import jwt from "jwt-decode";
import {Container, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import Row from "react-bootstrap/Row";

const PageNotFound = (props) => {

    return(
        <Container className={"d-flex justify-content-center"} style={{marginTop: "5rem"}}>
            <Row>
                <h1 className={"col-lg-12"}>
                    404
                </h1>
                <h1 className={""}>
                    Page Not Found!
                </h1>
            </Row>
        </Container>
    )
};

export default PageNotFound

