import React from "react";
import Axios from "axios";
import {Navigate}from "react-router-dom";
import Navbar from "./Navbar";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            redirect: false,
            errors: []
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

    handlePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value}, () => {
            console.log(this.state);
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.set("email", this.state.email);
        bodyFormData.set("password", this.state.password);
        bodyFormData.set("confirmPassword", this.state.confirmPassword);
        Axios.post("http://127.0.0.1:8000/api/register", bodyFormData)
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
                    <h2 className="text-center">Registration</h2>
                    <form className="row g-3" method="POST" onSubmit={this.handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${this.state.errors && this.state.errors.email ? "is-invalid" : ''}`}
                                id="inputEmail4"
                                onChange={this.handleEmailChange}
                            />
                            {this.state.errors && this.state.errors.email ?
                                <div className="text-danger invalide-feedback">{this.state.errors['email']}</div> : ''}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${this.state.errors && this.state.errors.password ? "is-invalid" : ''}`}
                                id="inputPassword4"
                                onChange={this.handlePasswordChange}
                            />
                            {this.state.errors && this.state.errors.password ? <div
                                className="text-danger invalide-feedback">{this.state.errors['password']}</div> : ''}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Password Confirm</label>
                            <input
                                type="password"
                                className={`form-control ${this.state.errors && this.state.errors.confirmPassword ? "is-invalid" : ''}`}
                                id="inputPassword5"
                                onChange={this.handlePasswordConfirm}
                            />
                            {this.state.errors && this.state.errors.confirmPassword ? <div
                                className="text-danger invalide-feedback">{this.state.errors['confirmPassword']}</div> : ''}
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default Register;
