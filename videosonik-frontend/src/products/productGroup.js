import React, {Component} from "react";
import Repository from "../repository/repository";
import Product from "./product";
import Row from "react-bootstrap/Row";

class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        Repository.getAllProducts().then(x => {
            this.setState({
                products: x
            });
        });
        // debugger;
    }

    Products=()=>{
        let arr=[];
        // debugger;
        for(let i =0;i<this.state.products.length;i++){
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                <Product value={this.state.products[i]} key={this.state.products[i].productid}/>
                </div>
            );
        }
        return arr;
    };

    render() {
        return (
            <Row>
                {this.Products()}
              {/*  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />*/}
            </Row>

        );
    }


};

export default Products;