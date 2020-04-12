import React, {Component} from "react";
import Repository from "../repository/repository";
import Row from "react-bootstrap/Row";
import WishlistItem from "./WishlistItem";
import axios from "../axios/custom-axios";
import "../bootstrap/bootstrap.min.css";

class WishlistGroup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            wishlist: []
        }
    }

    componentDidMount() {
        Repository.getWishlist().then(x => {
            this.setState({
                wishlist: x
            });
        });
    }

    deleteWishlistItem = (productId) => {
        console.log(this.state);
        axios({
            method: 'post',
            url: '/wishlist/remove/' + productId,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
        const arr = this.state.wishlist.filter((x) => {
            return x.productid != productId;
        });
        this.setState({
            wishlist: arr
        });


    }

    ProductsPerRow() {
        let arr = [];
        for (let i = 0; i < this.state.wishlist.length; i++) {
            arr.push(
                <div className={"col-lg-4 col-md-4 mb-4"}>
                    <WishlistItem value={this.state.wishlist[i]} key={this.state.wishlist[i].id}/>
                </div>
            );
        }
        return arr;
    }

    render() {
        console.log(this.state);

        return (
            <div className={"container"} style={{paddingTop:"1rem"}}>
                <Row>
                    {this.ProductsPerRow()}
                </Row>
            </div>
        );
    }


};

export default WishlistGroup;