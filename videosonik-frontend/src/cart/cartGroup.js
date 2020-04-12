import React, {Component} from "react";
import Repository from "../repository/repository";
import Row from "react-bootstrap/Row";
import Cart from "./cart";
import {Container} from "react-bootstrap";
import '../bootstrap/bootstrap.min.css';
import Typography from "@material-ui/core/Typography/Typography";
import {CardHeader, PropTypes} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button/Button";
import '../bootstrap/bootstrap.min.css';

class CartGroup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        Repository.getCartProducts().then(x => {
            console.log(x);
            this.setState({
                products: x
            });
        });
    }

    CartsPerRow() {
        const rows = [];
        let perRow = 3;

        // ako e mal ekranot po 2 u red
        if (window.innerWidth < 1200)
            perRow = 2;

        // Generate the columns for thumbnails
        const products = this.state.products.map((product) => {
            return (
                <Cart value={product} key={product.productid.productid}/>
            )
        });
        // Push a new row for every set of three thumbnails
        for (let row = 0; row < Math.ceil(this.state.products.length / perRow); row += 1) {
            rows.push(
                <Row style={{marginTop: '2rem'}} key={row}>
                    {
                        products.slice(row * perRow, row * perRow + perRow)
                    }
                </Row>
            );
        }
        // give back an array of our rows composed of columns
        return rows;
    }

    render() {
        return (
            <Container>
                    <Card className={"align-center"} style={{textAlign: 'center', marginTop:'1rem'}}>
                        <Typography variant="h3" component="h3">
                            Your cart
                        </Typography>
                    </Card>

                {this.CartsPerRow()}
                <Button variant="contained" style={{alignItems: "col-md-12"}}>Default</Button>
            </Container>
        );
    }


};

export default CartGroup;