import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container/Container";
import Repository from "../repository/repository";

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("token");
        window.location = "/";
    }


    render() {
        return;
    }
}

export default Logout;