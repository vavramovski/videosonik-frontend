// import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Button, Col, Image} from "react-bootstrap";
import '../App.css';
import '../bootstrap/bootstrap.min.css';
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import 'rc-input-number/assets/index.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: 'url',
            quantity:0
        };
    }

    static editQuantity(productid) {
        //
        console.log(productid);
    };

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
        this.setState({image: imageUrl, quantity:quantity});
    }

    decrease = (e) => {
        console.log(this.state.quantity);
        e.preventDefault();
        this.setState({quantity: this.state.quantity - 1});
    };

    increase = (e) => {
        console.log(this.state.quantity);
        e.preventDefault();
        this.setState({quantity: this.state.quantity + 1});
    };

    render() {

        return (
            //lg={3} md={6} sm={9} xs={12}
            <Col className="col-lg-4 col-md-6 mb-4  ">
                <Card className={"rootclass likiclass"} style={{height: '100%', position:'relative'}}>
                    <CardActionArea>
                        <CardMedia className={"mediaclass imgcenter"} style={{height: "100%"}}>
                            <Image src={`data:image/jpeg;base64,${this.props.value.productid.image}`}
                                   style={{width: "80%", height: "120%"}}
                                   alt={this.props.value.productid.productid}
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.value.productid.productid}<br/>
                                {this.props.value.productid.price} MKD
                            </Typography>
                            <Typography variant="body2" component="strong">
                                {this.props.value.productid.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={"align-bottom"}>
                        <Button size="small" variant={'warning'}>
                            Edit quantity
                        </Button>
                        <Button size="small" variant={'danger'}>
                            Delete product
                        </Button>
                        <div className="list-group def-number-input number-input">
                            <button onClick={this.increase} className="plus list-group-item"/>
                            <input className="quantity list-group-item" name="quantity"
                                   value={this.state.quantity}
                                   type="number"/>
                            <button onClick={this.decrease} className="minus list-group-item"/>
                        </div>
                    </CardActions>
                </Card>
            </Col>

        );
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