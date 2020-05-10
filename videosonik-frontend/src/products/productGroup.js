import React, {Component} from "react";
import Product from "./product";
import Row from "react-bootstrap/Row";
import ReactPaginate from 'react-paginate';
import Repository from "../repository/repository";
import {DropdownButton,Dropdown} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";


class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            pageSize: 4,
            pageNumber: 0,
            pagedProducts: props.products.slice(0, 4)
        }
    }

    Products = () => {
        let arr = [];

        for (let i = 0; i < this.state.pagedProducts.length; i++) {
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                    <Product value={this.state.pagedProducts[i]} key={this.state.pagedProducts[i].productid}/>
                </div>
            );
        }
        return arr;
    };

    handlePageClick = (e) => {
        let offset = e.selected * this.state.pageSize;
        let sliced = this.props.products.slice(offset, offset + this.state.pageSize);
        this.setState({
            pagedProducts: sliced,
            pageNumber: e.selected,
        });
    };

    onPageSize=(e)=>{
      if(e.target.text!=null) {
          let offset = e.target.text;
          let sliced = this.props.products.slice(0, offset);

          this.setState({
              pageSize: e.target.text,
              pageNumber:0,
              pagedProducts:sliced
          })
      }
    }

    render() {
        let pageCount = Math.ceil(this.props.products.length / this.state.pageSize);
        return (
            <React.Fragment>
                <DropdownButton
                    as={ButtonGroup}
                    key={"down"}
                    id={`dropdown-button-drop-down`}
                    drop={"down"}
                    variant="dark"
                    title={` Per page `}
                    onClick={this.onPageSize}
                >
                    <Dropdown.Item  eventKey="1">4</Dropdown.Item>
                    <Dropdown.Item  eventKey="2">8</Dropdown.Item>
                    <Dropdown.Item eventKey="3">16</Dropdown.Item>
                    <Dropdown.Item eventKey="4">32</Dropdown.Item>
                    <Dropdown.Item eventKey="5">100</Dropdown.Item>
                </DropdownButton>
                <Row>
                    {this.Products()}
                </Row>
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
            </React.Fragment>
        );
    }
}

export default Products;