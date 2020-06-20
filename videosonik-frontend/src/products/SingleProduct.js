import React, {Component} from "react";
import '../App.css';
import '../bootstrap/bootstrap.min.css';
import Repository from "../repository/repository";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow} from "mdbreact";
import Container from "react-bootstrap/Container";
import 'mdbreact/dist/css/mdb.css';
import StarRatings from 'react-star-ratings';
import * as jwt from "jsonwebtoken";
import Product from "./product";


class SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: 0,
            image: 0,
            reviews: [],
            rating: 0
        };
    }


    componentWillMount() {
        let id = window.location.href.split("/")[window.location.href.split("/").length - 1];
        if (id.includes("?"))
            id = id.substring(0, id.indexOf("?"));

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
                image: imageUrl,
            });
        });

        Repository.getAllReviewsForProduct(id).then(x => {
            this.setState({
                reviews: x
            });
        });
    }

    changeRating = (newRating) => {
        this.setState({
            rating: Math.floor(newRating)
        });
    };

    postReview=(e)=> {
        let id = window.location.href.split("/")[window.location.href.split("/").length - 1];
        if (id.includes("?"))
            id = id.substring(0, id.indexOf("?"));
        let review = {
            comment: e.target.comment.textContent,
            rate: this.state.rating,
            product: this.state.product,
            dateLong:Date.now()
        };
        Repository.postReview(review);
    };

    render() {
        let reviews = [];
        this.state.reviews.sort(function (a, b) {
            return b.dateLong-a.dateLong;
        });
        for (let i = 0; i < this.state.reviews.length; i++) {
            reviews.push(
                <MDBListGroupItem style={{marginBottom: "1rem", backgroundColor: "#F9F9F9"}} className={"col-lg-12"} key={this.state.reviews[i].id}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.state.reviews[i].user.username}</h5>
                        <small>{new Date(this.state.reviews[i].dateLong).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-1">{this.state.reviews[i].comment}</p>

                    <StarRatings numberOfStars={5}
                                 rating={this.state.reviews[i].rate}
                                 starRatedColor="#ffa000"
                                 starDimension="30px"
                    />
                </MDBListGroupItem>
            );
        }

        let token = localStorage.getItem("token");

        let decodedToken = jwt.decode(token, {complete: true});
        let dateNow = new Date();
        let postCommentForm;
        if (decodedToken != null && !(decodedToken.exp < dateNow.getTime())) {
            postCommentForm =
                <form onSubmit={this.postReview} style={{marginTop:"0px"}}>
                    <div className={"col-lg-7"}
                         style={{backgroundColor: "#F9F9F9", padding: '0px', overflow: "hidden",marginTop:"0px"}}>

                        <MDBInput type="textarea" label="Your review" background
                                  style={{width: "100%", padding: "0px",position:"relative",top:"0px",marginTop:"0px"}} name={"comment"}/>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="#ffa000"
                            starHoverColor="#ffa000"
                            starDimension={"30px"}
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            style={{padding: "1rem", display: "inline-block", justifyContent: "space-between"}}
                        />
                        <MDBBtn color="success" type="submit" style={{
                            display: "inline-block",
                            justifyContent: "space-between",
                            float: "right"
                        }}>Submit</MDBBtn>
                    </div>
                </form>;
        }

        let reviewsGroup =
            <React.Fragment>
                <MDBListGroup className={"col-lg-7"} style={{marginTop: "3rem"}}>
                    {reviews}
                </MDBListGroup>
            </React.Fragment>;

        return (
            <section className="my-5" style={{background: "#FFFFFF"}}>
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Why is it so great?
                </h2>
                <Container>
                    <MDBRow>
                        <MDBCol lg="5" className="text-center text-lg-left">
                            <img
                                className="img-fluid"
                                src={`data:image/jpeg;base64,${this.state.product.image}`}
                                alt={`${this.state.product.productid}`}
                                style={{height: "80%",maxHeight:"600px"}}
                            />
                        </MDBCol>
                        <MDBCol lg="7">
                            <MDBRow className="mb-3">
                                <MDBCol size="1">
                                    <MDBIcon icon="share" size="lg" className="indigo-text"/>
                                </MDBCol>
                                <MDBCol xl="10" md="11" size="10">
                                    <h5 className="font-weight-bold mb-3">Description</h5>
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
                                    <h5 className="font-weight-bold mb-3">Quantity in storage: {this.state.product.countininventory}</h5>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol size="1">
                                    <MDBIcon icon="share" size="lg" className="indigo-text"/>
                                </MDBCol>
                                <MDBCol xl="10" md="11" size="10">
                                    <h5 className="font-weight-bold mb-3">Price: {this.state.product.price} MKD
                                    </h5>
                                    <p className="grey-text">
                                        Keywords:{`\t${this.state.product.keywords}`}
                                    </p>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn color="success"
                                            onClick={()=>Product.addToCart(this.state.product.productid)}>
                                        Add to cart
                                    </MDBBtn>
                                    <MDBBtn color="amber"
                                            onClick={()=>Product.addToWishlist(this.state.product.productid)}>
                                        Wishlist
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    {postCommentForm}
                    {reviewsGroup}
                </Container>
            </section>
        );
    }


}

export default SingleProduct;
