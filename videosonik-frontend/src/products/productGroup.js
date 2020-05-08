import React, {Component} from "react";
import Repository from "../repository/repository";
import Product from "./product";
import Row from "react-bootstrap/Row";
import ReactPaginate from 'react-paginate';

class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    Products = () => {
        let arr = [];
        // debugger;
        for (let i = 0; i < this.props.products.length; i++) {
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                    <Product value={this.props.products[i]} key={this.props.products[i].productid}/>
                </div>
            );
        }
        return arr;
    };

    render() {
        let pageCount=Math.ceil(this.props.products.length/this.props.pageSize);

        return (

            <Row>
                {this.Products()}
            </Row>


        );
    }


};

export default Products;