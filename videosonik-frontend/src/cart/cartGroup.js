import React, {Component} from "react";
import Repository from "../repository/repository";
import Row from "react-bootstrap/Row";
import Cart from "./cart";
import {Button, Container} from "react-bootstrap";
import '../bootstrap/bootstrap.min.css';
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
// import Button from "@material-ui/core/Button/Button";
import axios from "../axios/custom-axios";
import '../background-color.css'
import {Link} from "react-router-dom";

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
    };

    deleteCartGroupItem = (productId) => {
        axios({
            method: 'delete',
            url: '/products/cart/' + productId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
        const arr = this.state.products.filter((x) => {
            return x.productid.productid != productId;
        });
        this.setState({
            products: arr
        });
    };

    onQuantityChange = (product) => {
        const arr = this.state.products.map((x) => {
            if(x.productid.productid == product.productid){
                return product;
            }
            else return x;
        });
        this.setState({
            products: arr
        });
    };

        Carts = () => {
        let arr = [];
        // debugger;
        for (let i = 0; i < this.state.products.length; i++) {
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                    <Cart value={this.state.products[i]} key={this.state.products[i].productid.productid}
                          onDelete={this.deleteCartGroupItem}
                          onQuantityChange={this.onQuantityChange}
                    />
                </div>
            );
        }
        return arr;
    };

    process = () => {
        Repository.processCart();
        window.location.reload();
    };

    totalPrice = () => {
        let total = 0;
        for (let i = 0; i < this.state.products.length; i++) {
            total += this.state.products[i].quantity*this.state.products[i].productid.price;
        }
        return total;
    };

    render() {
        let processButton =
            <Button variant={"success"}
                    style={{alignItems: "col-md-3", float: "right", fontSize: "1rem"}}
                    onClick={() => this.process()}>
                Go to payment
            </Button>;

        let emptyCart = null;
        if (this.state.products.length === 0) {
            processButton = null;
            emptyCart =
                <div style={{textAlign: "center", alignContent: "center"}}>
                    <h1 style={{}}> Your cart is empty </h1>
                    <img src={process.env.PUBLIC_URL + "/empty-cart.png"}
                         style={{width: "50%", height: "50%"}}/>
                </div>
        }


        return (
            <Row>
                <Container>
                    <Card className={"align-center"} style={{textAlign: 'center', marginTop: '1rem'}}>
                        <Typography variant="h3" component="h3">
                            Your cart
                        </Typography>
                    </Card>
                    <Row style={{marginTop: "2rem"}}>
                        {this.Carts()}
                    </Row>
                    {emptyCart}
                    {/*bottom row */}
                    <div style={{display: "flex", justifyContent: "space-between",marginTop:"3rem",marginBottom:"3rem"}}>
                        <Button variant={"dark"}
                                style={{alignItems: "col-md-3", float: "left", fontSize: "1rem"}}
                                onClick={() => window.location="/"}>
                            Back to products
                        </Button>

                        <h1 className={"col-md-6"}>Total price: {this.totalPrice()} MKD</h1>

                        {processButton}
                    </div>
                </Container>
            </Row>
        );
    }


};

export default CartGroup;
