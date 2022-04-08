import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null,
        };
    }

    logout = () => {
        localStorage.setItem("token", "");
        localStorage.clear();
        this.setState({token: null});
    };

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Lareact
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="float-right" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {localStorage.getItem("token") ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="navbar-brand" to="/post/new">
                                                Add post
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn" onClick={() => this.logout()}>
                                                Log out
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="navbar-brand" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="navbar-brand" to="/register">
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;
