import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import axios from '../axios/custom-axios';
import '../App.css';
// import '../bootstrap/bootstrap.min.css';
import {Link} from "react-router-dom";

class AdminProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            //lg={3} md={6} sm={9} xs={12}  className="col-lg-3 col-md-6 mb-4"
            <React.Fragment>
                <Card className={"likiclass"} style={{height: '100%'}} key={this.props.value.productid}>
                    <Card.Header>{this.props.value.productid}</Card.Header>
                    <div style={{width: "100%", height: "70%"}}>
                        <Card.Body>
                            <Link to={"/product/"+this.props.value.productid}>
                                <Image src={`data:image/jpeg;base64,${this.props.value.image}`}
                                       // width={"90%"}
                                       // height={"70%"}
                                       style={{width: "205px", height: "205px"}}
                                       alt={this.props.value.productid}
                                />
                            </Link>
                            {this.props.value.description.substring(0, 55)}
                        </Card.Body>
                    </div>
                    <Card.Body as={'h5'}>
                        {this.props.value.price} MKD
                    </Card.Body>
                    <Card.Footer className={"d-flex"}>
                        <Button style={{marginRight: '1rem', padding:"0.7rem"}} variant={'danger'}
                                onClick={() => this.props.onDelete(this.props.value.productid)}
                        >
                            Remove Product
                        </Button>
                        <Link className="btn btn-yellow"
                                type="button"
                                style={{padding:"0.7rem"}}
                              to={'editproduct/'+this.props.value.productid}
                              >
                            Edit Product
                        </Link>

                    </Card.Footer>
                </Card>
            </React.Fragment>
        );
    }


}

export default AdminProduct;
