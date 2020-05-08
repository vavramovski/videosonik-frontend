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

// import { browserHistory } from './react-router';


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            admin: false,
            pageNumber: 0,
            pageSize: 3,
            pagedProducts: [],
            LED: [],
            LEDSliced:[],
            Computers: [],
            Plumbing: []
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
                    products: x.data,
                    admin: isadmin,
                    pagedProducts: x.data.slice(0, this.state.pageSize),
                    LED: x.data.filter(function (x) {
                        return x.category.includes('LED')
                    }),
                    LEDSliced:this.state.LED.slice(0,this.state.pageSize)
                });
                console.log(this.state.LED);
            });
    }


    handlePageClick = (e) => {
        let offset = e.selected * this.state.pageSize;
        let sliced = this.state.products.slice(offset, offset + this.state.pageSize);
        let led = this.state.products.filter(function (x) {
            return x.category.includes('LED')
        });

        this.setState({
            pagedProducts: sliced,
            pageNumber: e.selected,
            // LED:led
        });
        // console.log(`offset ${offset}`);
        // console.log(this.state.pagedProducts)
    };

    paginate = (products) => {
        let pageCount = Math.ceil(products.length / this.state.pageSize);
        console.log("PAGE COUNT");
        console.log(pageCount);
        console.log(products.length)
        console.log(this.state.pageSize)
        return (
            <ReactPaginate previousLabel={"previous"}
                           nextLabel={"next"}
                           breakLabel={<span className="gap">...</span>}
                           breakClassName={"break-me"}
                           pageCount={pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           previousClassName={"page-item"}
                           nextClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextLinkClassName={"page-link"}
                           forcePage={this.state.pageNumber}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination justify-content-center"}
                           activeClassName={"active"}/>
        )
    };


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
                                <Products products={this.state.pagedProducts}/>
                            </Container>
                        </Row>
                        {this.paginate(this.state.products)}
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
                                <Products products={this.state.LEDSliced}/>
                            </Container>
                        </Row>
                        {this.paginate(this.state.LED)}
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