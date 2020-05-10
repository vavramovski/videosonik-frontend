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
import AdminPanel from "./admin/AdminPanel";
import EditAddProduct from "./admin/EditAddProduct";
import ReactPaginate from 'react-paginate';
import Spinner from "react-bootstrap/Spinner";
import AuthService from "./auth/AuthService";

// @provideHooks({
//     fetch:
// })

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            admin: false,
            pageNumber: 0,
            pageSize: 3,
            isLoaded: false
        }
    }

    async componentDidMount() {
        let isAdmin = false;
        let token = null;
        if(AuthService.isTokenExpired(localStorage.getItem("token")))
            localStorage.removeItem("token");

        const isExpired = AuthService.isTokenExpired(localStorage.getItem("token"));
        if (localStorage.getItem("token") != null) {
            token = jwt(localStorage.getItem("token"));
        }



        const response = await Repository.getAllProducts();

        if (token != null && token.ROLE.includes("ADMIN"))
            isAdmin = true;
        this.setState({
            products: response.data,
            admin: isAdmin,
            isLoaded: true
        });
        console.log("componentDidMount    APP")
        console.log(this.state.products)
    }


    render() {
        console.log("PAGED PRODUCTS");
        console.log(this.state.pagedProducts);
        return (
            <div style={{background: "#F9F9F9", width: "100%", height: "100%"}}>
                <Router>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                    <Header/>
                    <Route path={"/"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: "1rem"}}>
                                {!this.state.isLoaded ? (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>) : (
                                    <Products products={this.state.products}/>
                                )}
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
                    <Route path={"/led"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>

                            <Container style={{padding: 0, marginLeft: 0}}>
                                {!this.state.isLoaded ? (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>) : (
                                    <Products products={this.state.products.filter(function (x) {
                                        return x.category === "LED"
                                    })}/>
                                )}
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/computers"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: 0}}>
                                {!this.state.isLoaded ? (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>) : (
                                    <Products products={this.state.products.filter(function (x) {
                                        return x.category === "Computers"
                                    })}/>
                                )}
                            </Container>
                        </Row>
                    </Route>
                    <Route path={"/plumbing"} exact>
                        <Row style={{marginTop: '2rem'}}>
                            <ProductsNavigator/>
                            <Container style={{padding: 0, marginLeft: 0}}>
                                {!this.state.isLoaded ? (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>) : (
                                    <Products products={this.state.products.filter(function (x) {
                                        return x.category === "Plumbing"
                                    })}/>
                                )}
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
                    <Route path={"/admin/panel"}>
                        <AdminPanel/>
                    </Route>
                    <Route path={"/admin/newproduct"}>
                        {/*Add product*/}
                        <EditAddProduct edit={false}/>
                    </Route>
                    <Route path={"/admin/editproduct/:productId"}>
                        <EditAddProduct edit={true}/>
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