import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import axios from '../axios/custom-axios';
import '../App.css';
import '../bootstrap/bootstrap.min.css';

class WishlistItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    addToCart(productid) {
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


    render() {
        return (
            //lg={3} md={6} sm={9} xs={12}

            <Card border={'info'} className={"likiclass"} style={{height: '100%'}}>
                <Card.Header>{this.props.value.productid}</Card.Header>
                <Card.Body>
                    <Image src={`data:image/jpeg;base64,${this.props.value.image}`}
                           style={{width: "100%", height: "75%"}}
                           alt={this.props.value.productid}
                    />
                    {this.props.value.description}
                </Card.Body>
                <Card.Body as={'h5'}>
                    {this.props.value.price} MKD
                </Card.Body>
                <Card.Footer >
                    <div className={"btn-group"}>
                    <Button style={{marginRight: '1rem', float: 'left'}} variant={'success'}
                            onClick={() => this.addToCart(this.props.value.productid)}>
                        Cart!
                    </Button>
                    <Button variant={'warning'} style={{float: 'right'}} 
                            onClick={() => this.props.onDelete(this.props.value.productid)}>
                        Remove from wishlist
                    </Button>
                    </div>
                </Card.Footer>
            </Card>
        );
    }


}

export default WishlistItem;

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