import React, {Component} from "react";
import '../App.css';
import '../bootstrap/bootstrap.min.css';
import Repository from "../repository/repository";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import Container from "react-bootstrap/Container";
import 'mdbreact/dist/css/mdb.css';


class SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: 0,
            image: 0
        };
    }

    componentDidMount() {
        let id = window.location.href.split("/")[window.location.href.split("/").length - 1];

        Repository.getSingleProduct(id).then(x => {
            const byteCharacters = atob(x.image);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++)
                byteNumbers[i] = byteCharacters.charCodeAt(i);

            const byteArray = new Uint8Array(byteNumbers);

            let image = new Blob([byteArray], {type: 'image/jpeg'});
            let imageUrl = URL.createObjectURL(image);


            this.setState({
                product: x,
                image: imageUrl
            });
        });
    }

    render() {
        console.log(this.state);
        return (
            <section className="my-5" style={{background:"#FFFFFF"}}>
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Why is it so great?
                </h2>
                {/*<p className="lead grey-text w-responsive text-center mx-auto mb-5">*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
                    {/*eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim*/}
                    {/*ad minim veniam.*/}
                {/*</p>*/}

                <Container >
                    <MDBRow>
                        <MDBCol lg="5" className="text-center text-lg-left">
                            <img
                                className="img-fluid"
                                src={`data:image/jpeg;base64,${this.state.product.image}`}
                                alt={`${this.state.product.productid}`}
                                style={{height:"80%"}}
                            />
                        </MDBCol>
                        <MDBCol lg="7">
                            <MDBRow className="mb-3">
                                <MDBCol size="1">
                                    <MDBIcon icon="share" size="lg" className="indigo-text"/>
                                </MDBCol>
                                <MDBCol xl="10" md="11" size="10">
                                    <h5 className="font-weight-bold mb-3">Description 1</h5>
                                    <p className="grey-text">
                                        {this.state.product.description}
                                    </p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol size="1">
                                    <MDBIcon icon="share" size="lg" className="indigo-text"/>
                                </MDBCol>
                                <MDBCol xl="10" md="11" size="10">
                                    <h5 className="font-weight-bold mb-3">Description 2</h5>
                                    <p className="grey-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                        enim ad minima veniam, quis nostrum exercitationem ullam.
                                        Reprehenderit maiores aperiam assumenda deleniti hic.
                                    </p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol size="1">
                                    <MDBIcon icon="share" size="lg" className="indigo-text"/>
                                </MDBCol>
                                <MDBCol xl="10" md="11" size="10">
                                    <h5 className="font-weight-bold mb-3">Price</h5>
                                    <p className="grey-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                        enim ad minima veniam, quis nostrum exercitationem ullam.
                                        Reprehenderit maiores aperiam assumenda deleniti hic.
                                    </p>
                                </MDBCol>

                                <MDBCol>
                                    <MDBBtn color="success">Add to cart</MDBBtn>
                                    <MDBBtn color="amber">Wishlist</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </Container>
            </section>
        );
    }


}

export default SingleProduct;

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