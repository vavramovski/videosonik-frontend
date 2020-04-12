import '../bootstrap/bootstrap.min.css';
import React from "react";

const ContactItem = (props) => {


    return (
        <div className="card text-center">
            <div className="card-header default-color-dark white-text">
                Featured
            </div>
            <div className="card-block">
                <h4 className="card-title">{props.value.subject}</h4>
                <p className="card-text">{props.value.content}</p>
                <a className="btn btn-default">Go somewhere</a>
            </div>
            <div className="card-footer text-muted default-color-dark white-text">
                <p>{Date(props.value.date).toString()}</p>
            </div>
        </div>
    )
};
export default ContactItem;



