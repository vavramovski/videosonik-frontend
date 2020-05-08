import React, {useEffect, useState} from "react";
import '../App.css';
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Repository from "../repository/repository";


const AddEditProduct = (props) => {

    const [product, setProduct] = useState({});
    const [image, setImage] = useState({});


    useEffect(() => {
        let productId = window.location.pathname.split("/")[3];
        if (productId != null) {
            console.log("PRODUCTID")
            console.log(productId)
            Repository.getSingleProduct(productId).then(x => {
                setProduct(x);
                setImage(x.image);
            });
        }
    }, []);

    const handleTermOnChange  = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setProduct({paramName:paramValue});
    }


    async function onFormSubmit(e) {
        e.preventDefault();
        let base64img = document.getElementsByName("imshow")[0].getAttribute("src");
        base64img = base64img.substring(23);
        //data:image/jpeg;base64, - 22 karakteri
        const product = {
            productid: e.target.name.value,
            countininventory: e.target.inventory.value,
            price: e.target.price.value,
            description: e.target.description.value,
            category: e.target.category.value,
            keywords: e.target.keywords.value,
            image: base64img
        };
        let didWork;
        if (!props.edit)
            didWork = await Repository.postProduct(product);
        else didWork = await Repository.patchProduct(product);

        if (didWork)
            window.location = "/admin/panel";
        else
            window.reload();
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function changeImg(e) {
        e.preventDefault();
        const file = document.getElementsByName("img")[0].files[0];
        toBase64(file).then(x => {
            setImage(x.substring(23));
        });
    }

    console.log(product);
    let img;
    if (image != null)
        img = `data:image/jpeg;base64,${image}`;

    let onChangeFunction;
    if(props.edit)
        onChangeFunction = handleTermOnChange;


    return (
        <form onSubmit={onFormSubmit} encType="multipart/form-data" className="md-form">
            <div className="container">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-8 col-lg-6">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <h3 className="login-heading mb-4">New Product</h3>
                                            <div className="form-label-group">
                                                <input type="text" id="name" className="form-control"
                                                       placeholder="Product name"
                                                       name="name" required={!props.edit} autoFocus={true}
                                                       value={product.productid}
                                                       onChange={onChangeFunction}
                                                />
                                            </div>
                                            <div className="form-label-group">
                                                <input type="number" id="inventory" className="form-control"
                                                       placeholder="Inventory count"
                                                       name="inventory" required={!props.edit}
                                                       value={product.countininventory}
                                                       onChange={onChangeFunction}

                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <input type="number" id="price" className="form-control"
                                                       placeholder="Product price $$$"
                                                       name="price" required={!props.edit}
                                                       value={product.price}
                                                       onChange={onChangeFunction}

                                                />
                                            </div>
                                            <div className="form-label-group">
                                                <input type="text" id="description" className="form-control"
                                                       name="description" placeholder="Product description"
                                                       required={!props.edit}
                                                       value={product.description}
                                                       onChange={onChangeFunction}

                                                />
                                            </div>
                                            <div className="form-label-group">
                                                <select className="custom-select" id="category" name="category"
                                                        required={!props.edit} value={product.category}
                                                        onChange={onChangeFunction}>
                                                    <option disabled={true} selected={true}></option>
                                                    <option value="LED">Lights</option>
                                                    <option value="Computers">Computers</option>
                                                    <option value="Plumbing">Plumbing</option>
                                                </select>
                                            </div>
                                            <div className="form-label-group">
                                                <input type="text" id="keywords" className="form-control"
                                                       name="keywords" placeholder="Keywords: led yellow white ..."
                                                       required={!props.edit} value={product.keywords}
                                                       onChange={onChangeFunction}
                                                />
                                            </div>
                                            <button
                                                className="btn btn-success btn-lg btn-block btn-login font-weight-bold mb-2"
                                                type="submit">
                                                SUBMIT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Container className="col-sm-4" style={{marginTop: "2rem"}}>
                            <Col className="imagePreview">
                                <img name="imshow" width={"350px"} height={"350px"}
                                     src={img}
                                />
                            </Col>
                            <Col>
                                <input type="file" name="img" id={"img"} className="btn btn-primary text-light"
                                       onChange={changeImg}
                                       placeholder={"Upload"}
                                       required={!props.edit} style={{overflow: " hidden"}}
                                />
                            </Col>
                        </Container>
                    </div>
                </div>
            </div>
        </form>
    )
};
export default AddEditProduct;