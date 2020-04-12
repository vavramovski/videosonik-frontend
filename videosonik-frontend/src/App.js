import React, {Component} from 'react';
import './App.css';
import {Container} from "react-bootstrap/";
import './bootstrap/bootstrap.min.css';
import './bootstrap/bootstrap-grid.min.css'
import Row from "react-bootstrap/Row";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Products from './products/productGroup';
import Header from "./header/header";
import Repository from "./repository/repository";
import ProductsNavigator from "./header/navigator";
import CartGroup from "./cart/cartGroup";
import Login from "./login/Login";
import WishlistGroup from "./wishlist/WishlistGroup";
import SingleProduct from "./products/SingleProduct";
import jwt from 'jwt-decode';
import Logout from "./login/Logout";
import Contact from "./contact/Contact";
import ContactGroup from "./contact/ContactGroup";

// import { browserHistory } from './react-router';


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            admin: false
        }
    }

    componentDidMount() {
        let token = null;
        if (localStorage.getItem("token") != null) {
            token = jwt(localStorage.getItem("token"));
        }
        console.log(token);
        if (token != null)
            Repository.getAllProducts().then(x => {
                let isadmin = false;
                if (token.ROLE.includes("ADMIN"))
                    isadmin = true;
                this.setState({
                    products: x,
                    admin: isadmin
                });
                console.log(x);
            });
    }


    render() {
        return (
            <div style={{background: "#F9F9F9", width: "100%", height: "100%"}}>
                <Router>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                    <Header/>
                    <Route path={"/"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: "1rem"}}>
                                <Products products={this.state.products}/>
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/login"} exact>
                        <Login/>
                    </Route>
                    <Route path={"/logout"} exact>
                        <Logout/>
                    </Route>
                    <Route path={"/product/:productId"} exact>
                        <SingleProduct/>
                    </Route>
                    <Route path={"/computers"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: 0}}>
                                <Products products={this.state.products.filter(function (x) {
                                    return x.category === 'Computers'
                                })}/>
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/led"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: 0}}>
                                <Products products={this.state.products.filter(function (x) {
                                    return x.category === 'LED'
                                })}/>
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/plumbing"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: 0}}>
                                <Products products={this.state.products.filter(function (x) {
                                    return x.category === 'Plumbing'
                                })}/>
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/wishlist"}>
                        <WishlistGroup/>
                    </Route>
                    <Route path={"/cart"} exact>
                        <CartGroup/>
                    </Route>
                    <Route path={"/contact"}>
                        <Contact/>
                    </Route>
                    <Route path={"/admin/contacts"}>
                        <ContactGroup/>
                    </Route>
                </Router>
            </div>

        );
    }
}

export default App;