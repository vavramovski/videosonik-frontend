import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import axios from '../axios/custom-axios';
import '../App.css';
import '../bootstrap/bootstrap.min.css';
import {Link, NavLink} from "react-router-dom";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static addToCart(productid) {
        //document.getElementById()
        // var quantity =5;
        axios({
            method: 'put',
            url: '/products/cart/' + productid + "?quantity=" + 1,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
    };

    static addToWishlist(productid) {
        axios({
            method: 'post',
            url: '/wishlist/add/' + productid,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
    }

    render() {
        return (
            //lg={3} md={6} sm={9} xs={12}  className="col-lg-3 col-md-6 mb-4"
            <React.Fragment>
                <Card className={"likiclass"} style={{height: '100%'}}>
                    <Card.Header>{this.props.value.productid}</Card.Header>
                    <div style={{width: "100%", height: "70%"}}>
                        <Card.Body>
                            <Link to={"product/"+this.props.value.productid}>
                                <Image src={`data:image/jpeg;base64,${this.props.value.image}`}
                                       style={{width: "205px", height: "205px"}}
                                       alt={this.props.value.productid}
                                />
                            </Link>
                            <button className="btn pmd-btn-fab pmd-ripple-effect btn-outline-danger showme"
                                    type="button"
                                    style={{position: "absolute", top: "205px", right: "10px"}}
                                    onClick={() => Product.addToWishlist(this.props.value.productid)}>
                                <i className="material-icons pmd-sm ">favorite_border</i></button>

                            {this.props.value.description.substring(0, 55)}
                        </Card.Body>
                    </div>
                    <Card.Body as={'h5'}>
                        {this.props.value.price} MKD
                    </Card.Body>
                    <Card.Footer>
                        <Button style={{marginRight: '1rem'}} variant={'success'}
                                onClick={() => Product.addToCart(this.props.value.productid)}>
                            Add to cart!
                        </Button>

                        {/*<Button style={{marginLeft: '1rem'}} variant={'success'} size={"md"}*/}
                        {/*onClick={() => Product.addToWishlist(this.props.value.productid)}>*/}
                        {/*Wishlist!*/}
                        {/*</Button>*/}
                    </Card.Footer>
                </Card>
            </React.Fragment>
        );
    }


}

export default Product;

//
// <Card className={classes.root}>
//     <CardActionArea>
//         <CardMedia
//             className={classes.media}
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="Contemplative Reptile"
//         />
//         <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//                 Lizard
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//                 across all continents except Antarctica
//             </Typography>
//         </CardContent>
//     </CardActionArea>
//     <CardActions>
//         <Button size="small" color="primary">
//             Share
//         </Button>
//         <Button size="small" color="primary">
//             Learn More
//         </Button>
//     </CardActions>
// </Card>