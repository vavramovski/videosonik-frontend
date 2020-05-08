import React, {Component} from "react";
import jwt from "jwt-decode";
import Repository from "../repository/repository";
import {Button, Container} from "react-bootstrap";
import "../bootstrap/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import PageNotFound from "../pageNotFound/PageNotFound";
import axios from "../axios/custom-axios";
import AdminProduct from "./AdminProduct";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

class AdminPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            admin: false
        }
    }

    componentDidMount() {

        if ((localStorage.getItem("token") != null) && jwt(localStorage.getItem("token")).ROLE.includes("ADMIN"))
            this.setState({admin: true});

        Repository.getAllProducts().then(x =>
            this.setState({
                products: x
            })
        );
    }

    Products = () => {
        let arr = [];
        // debugger;
        for (let i = 0; i < this.state.products.length; i++) {
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                    <AdminProduct value={this.state.products[i]} key={this.state.products[i].productid}
                                  onDelete={this.deleteProduct}/>
                </div>
            );
        }
        return arr;
    };

    deleteProduct = (passedProductId) => {
        axios({
            method: 'delete',
            url: '/products/' + passedProductId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
        const arr = this.state.products.filter((x) => {
            return x.productid != passedProductId;
        });
        this.setState({
            products: arr
        });
    };

    render() {
        if (this.state.admin)
            return (
                <Row>
                    <Col className={"col-lg-2 "}>
                        <Link to={"newproduct"} style={{marginTop: "5rem"}} className={"btn btn-success"}>
                            Add new product
                        </Link>
                    </Col>

                    <Col className={"col-lg-9"}>
                        <Container style={{marginTop: "2rem"}} >
                            <Row>
                                {this.Products()}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            );
        else
            return (
                <PageNotFound/>
            )
    }
}

export default AdminPanel;
