import React, {Component} from "react";
import Repository from "../repository/repository";
import Row from "react-bootstrap/Row";
import ContactItem from "./ContactItem";

class ContactGroup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        Repository.getAllContacts().then(x => {
            this.setState({
                contacts: x
            });
        });
    }

    Contacts = () => {
        let arr = [];
        for (let i = 0; i < this.state.contacts.length; i++) {
            arr.push(
                <div className={"col-lg-3 col-md-4 mb-4"}>
                    <ContactItem value={this.state.contacts[i]} key={this.state.contacts[i].id}/>
                </div>
            );
        }
        return arr;
    };

    render() {
        return (
            <div className={""}>
                <Row className={"justify-content-md-center"} style={{paddingTop:"5rem"}}>
                    {this.Contacts()}
                    {/*  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />*/}
                </Row>
            </div>
        );
    }


};

export default ContactGroup;