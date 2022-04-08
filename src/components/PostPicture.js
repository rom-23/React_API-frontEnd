import React from "react";
import Axios from "axios";
import {Navigate} from "react-router-dom";
import Navbar from "./Navbar";

class PostPicture extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            image: "",
            redirect: false,
            errors: [],
        };
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value}, () => {
            console.log(this.state);
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value}, () => {
            console.log(this.state);
        });
    };

    handleImageChange = (event) => {
        this.setState({image: event.target.files[0]}, () => {
            console.log(this.state);
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.set("title", this.state.title);
        bodyFormData.set("description", this.state.description);
        bodyFormData.set("image", this.state.image);
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token")
            }
        };
        Axios.post("http://127.0.0.1:8000/api/picture/store", bodyFormData, headers)
            .then((res) => {
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
                    <h2 className="text-center">Add Photo</h2>
                    <form
                        className="row g-3"
                        method="POST"
                        onSubmit={this.handleSubmit}
                        encType="multipart/form-data"
                    >
                        <div className="col-md-4">
                            <label className="form-label">Titre</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    this.state.errors && this.state.errors.title
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={this.handleTitleChange}
                            />
                            {this.state.errors && this.state.errors.title ? (
                                <div className="text-danger invalide-feedback">
                                    {this.state.errors["title"]}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Description</label>
                            <textarea
                                onChange={this.handleDescriptionChange}
                                className={`form-control ${
                                    this.state.errors && this.state.errors.description
                                        ? "is-invalid"
                                        : ""
                                }`}
                                rows="3"
                            ></textarea>
                            {this.state.errors && this.state.errors.description ? (
                                <div className="text-danger invalide-feedback">
                                    {this.state.errors["description"]}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                onChange={this.handleImageChange}
                                className={`form-control-file ${
                                    this.state.errors && this.state.errors.image
                                        ? "is-invalid"
                                        : ""
                                }`}
                                type="file"
                                id="formFile"
                            />
                            {this.state.errors && this.state.errors.image ? (
                                <div className="text-danger invalide-feedback">
                                    {this.state.errors["image"]}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default PostPicture;
