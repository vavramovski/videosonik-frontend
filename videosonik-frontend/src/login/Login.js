import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container/Container";
import Repository from "../repository/repository";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            pass: '',
            bool: true,
            loginStatus:true
        }
        //   this.LoginEventHandler = this.LoginEventHandler.bind(this)
        // this.Auth=new AuthService();
    }


    LoginEventHandler = async (e) => {
        e.preventDefault();
        console.log("zdr")
        const login = {
            username: this.state.username,
            pass: this.state.pass
        };

        var isLogged = await Repository.Login(this.state.username, this.state.pass);

        this.setState({bool: isLogged,loginStatus:isLogged});

        if (localStorage.getItem("token") !== "fail" && localStorage.getItem("token") != null)
            window.location = "/";
    };

    render() {

        var failedLogin;
        if (localStorage.getItem("token") !== "fail" && localStorage.getItem("token") != null)
            return (
                <Container maxWidth={"sm"} style={{marginTop: "2rem"}}>
                    <div className="alert alert-success" role="alert">
                        You are logged in
                    </div>
                </Container>
            );

        if (!this.state.loginStatus) {
            failedLogin = <div className="alert alert-danger" role="alert">
                            Wrong username or password.
                          </div>
        }

        return (
            <Container maxWidth={"sm"} style={{marginTop: "2rem"}}>
                <form onSubmit={this.LoginEventHandler}>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username"
                               value={this.state.username}
                               onChange={(event) => this.setState({username: event.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                               value={this.state.pass}
                               onChange={(event) => this.setState({pass: event.target.value})}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    {failedLogin}
                    <button type="submit" id="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Want to <Link to={"/signup"} href="#">register first?</Link>
                    </p>
                </form>
            </Container>
        );
    }
}

export default Login;