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

    deleteWishlistItem=(productId)=>{
        console.log(this.state);
            axios({
                method: 'post',
                url: '/wishlist/remove/' + productId ,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            });
            const arr = this.state.wishlist.filter((x)=>{
                return x.productid!=productId;
            });
            this.setState({
                wishlist:arr
            });


    }

    ProductsPerRow() {
        const rows = [];
        let  perRow = 3;
        if (window.innerWidth < 1200)
            perRow = 2;
        // Generate the columns for thumbnails
        const products = this.state.wishlist.map((product) => {
            return (
                <WishlistItem value={product} key={product.productid} onDelete={this.deleteWishlistItem}/>
            )
        });
        // Push a new row for every set of three thumbnails
        for (let row = 0; row < Math.ceil(this.state.wishlist.length / perRow); row += 1) {
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
        console.log(this.state);

        return (
            <React.Fragment>
                {this.ProductsPerRow()}
            </React.Fragment>
        );
    }


};

export default WishlistGroup;