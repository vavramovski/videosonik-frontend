import React from "react";
import {Link, NavLink} from "react-router-dom";
import '../App.css';


const ProductsNavigator = (props) => {

// todo: ako e ekranot <1200 , flex direction : row na divot
    var flag = false;
    if(window.innerWidth<1200)
        flag=true;
    return (
        <div className={`list-group col-lg-2 col-md-3 col-sm-6 col-xs-3 offset-1 align-content-center`}
             style={{marginTop: '2rem', fontSize:'1.2rem', flexDirection:flag?'row' :'column'}}>
            <Link to={"/"}>
                <div className="list-group-item alert-link list-group-item-dark likiclass">All</div>
            </Link>
            <Link to={"/led"}>
                <div className="list-group-item alert-link list-group-item-dark likiclass">LED</div>
            </Link>
            <Link to={"/plumbing"}>
                <div className="list-group-item alert-link list-group-item-dark likiclass">Plumbing</div>
            </Link>
            <NavLink to={"/computers"}>
                <div className="list-group-item alert-link list-group-item-dark likiclass">Computers</div>
            </NavLink>
        </div>
    )
};
export default ProductsNavigator;