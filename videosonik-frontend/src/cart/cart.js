import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import '../App.css';
import '../bootstrap/bootstrap.min.css';
// import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
// import CardContent from "@material-ui/core/CardContent/CardContent";
// import Typography from "@material-ui/core/Typography/Typography";
// import CardActions from "@material-ui/core/CardActions/CardActions";
// import CardMedia from "@material-ui/core/CardMedia/CardMedia";
// import Card from "@material-ui/core/Card/Card";
import 'rc-input-number/assets/index.css';
import {Link} from "react-router-dom";
import Product from "../products/product";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: 'url',
            quantity: 0
        };
    }

    componentDidMount() {
        const byteCharacters = atob(this.props.value.productid.image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let image = new Blob([byteArray], {type: 'image/jpeg'});
        let imageUrl = URL.createObjectURL(image);
        let quantity = this.props.value.quantity;
        this.setState({image: imageUrl, quantity: quantity});
    }

    decrease = (e) => {
        e.preventDefault();
        this.setState({quantity: this.state.quantity - 1});
        this.editQuantityUpwards(this.state.quantity-1);
    };

    increase = (e) => {
        e.preventDefault();
        this.setState({quantity: this.state.quantity + 1});
        this.editQuantityUpwards(this.state.quantity+1);

    };

    setQuantity = (e) => {
        this.setState({quantity: e.target.value});
        // pass changes to parent
        this.editQuantityUpwards(e.target.value);
    };

    editQuantityUpwards(quantity){
        let item = this.props.value;
        item.quantity=quantity;
        this.props.onQuantityChange(item);
    }


    render() {
        return (

            <React.Fragment>
                <Card className={"likiclass"} style={{height: '100%'}} key={this.props.value.productid.productid + "1"}>
                    <Card.Header>{this.props.value.productid.productid}</Card.Header>
                    <div style={{width: "100%", height: "70%"}}>
                        <Card.Body>
                            <Link to={"product/" + this.props.value.productid.productid}>
                                <Image src={`data:image/jpeg;base64,${this.props.value.productid.image}`}
                                       style={{width: "205px", height: "205px"}}
                                       alt={this.props.value.productid.productid}
                                />
                            </Link>
                            <button className="btn pmd-btn-fab pmd-ripple-effect btn-outline-danger showme"
                                    type="button"
                                    style={{position: "absolute", top: "205px", right: "10px"}}
                                    onClick={() => Product.addToWishlist(this.props.value.productid.productid)}>
                                <i className="material-icons pmd-sm ">favorite_border</i></button>

                            {this.props.value.productid.description.substring(0, 55)}
                        </Card.Body>
                    </div>
                    <Card.Body as={'h5'}>
                        {this.props.value.productid.price} MKD
                    </Card.Body>
                    <Card.Footer style={{overflow: "autp"}} className={"d-flex"}>
                        <Button style={{marginRight: '1rem', display: "inline-block"}} variant={'danger'}
                                onClick={() => this.props.onDelete(this.props.value.productid.productid)}>
                            Remove from cart
                        </Button>
                        <div className="list-group def-number-input number-input" style={{display: "inline-block"}}>
                            <button onClick={this.increase} className="plus list-group-item text-center"/>
                            <input className="quantity list-group-item" name="quantity"
                                   value={this.state.quantity}
                                   onChange={this.setQuantity}
                                   type="number"/>
                            <button onClick={this.decrease} className="minus list-group-item"/>
                        </div>
                    </Card.Footer>
                </Card>

            </React.Fragment>


        )
            ;
    }


}

export default Cart;


// {/*<Col className="col-lg-4 col-md-6 mb-4  ">*/}
//     {/*<Card border={'info'} className={"likiclass"}>*/}
//         {/*<Card.Header>{this.props.value.productid.productid}</Card.Header>*/}
//         {/*<Card.Body as={'h5'}>*/}
//             {/*{this.props.value.productid.price} MKD<br/>*/}
//             {/*{this.props.value.quantity}*/}
//         {/*</Card.Body>*/}
//         {/*<Card.Footer>*/}
//             {/*<Button variant={'warning'} onClick={() => Cart.editQuantity(this.props.value.productid.productid)}>*/}
//                 {/*Change quantity*/}
//             {/*</Button>*/}
//             {/*<Button variant={'danger'} onClick={() => Cart.editQuantity(this.props.value.productid.productid)}>*/}
//                 {/*Delete from cart*/}
//             {/*</Button>*/}
//         {/*</Card.Footer>*/}
//     {/*</Card>*/}
// {/*</Col>*/}