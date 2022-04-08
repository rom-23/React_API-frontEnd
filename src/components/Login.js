import React from "react";
import Axios from "axios";
import {Navigate} from "react-router-dom";
import Navbar from "./Navbar";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirect: false,
            errors: [],
        };
    }

    componentWillMount() {
        if (localStorage.getItem("token")) {
            this.setState({redirect: true});
        }
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value}, () => {
            console.log(this.state);
        });
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value}, () => {
            console.log(this.state);
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.set("email", this.state.email);
        bodyFormData.set("password", this.state.password);
        Axios.post("http://127.0.0.1:8000/api/login", bodyFormData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", res.data.api_token);
                this.setState({redirect: true});
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({errors: error.response.data.errors}, () => {
                        console.log(this.state);
                    });
                }
            });
    };

    render() {
        if (this.state.redirect) {
            return (<Navigate to="/"/>);
        }
        return (
            <>
                <Navbar/>
                <div className="container w-50">
                    <h2 className="text-center">Login</h2>
                    <form className="row g-3" method="POST" onSubmit={this.handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                onChange={this.handleEmailChange}
                            />
                            {this.state.errors && this.state.errors.email ? (
                                <div className="text-danger invalide-feedback">
                                    {this.state.errors["email"]}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                onChange={this.handlePasswordChange}
                            />
                            {this.state.errors && this.state.errors.password ? (
                                <div className="text-danger invalide-feedback">
                                    {this.state.errors["password"]}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-12 text-center">
                            {this.state.errors && this.state.errors === "Bad_credentials" ? (
                                <div className="alert-warning m-4 p-4">Bad credentials</div>
                            ) : (
                                ""
                            )}
                            <button type="submit" className="btn btn-primary">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default Login;
