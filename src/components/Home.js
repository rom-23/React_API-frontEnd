import React from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import {Link, useParams} from "react-router-dom";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            pictures: [],
            search: ''
        };
    }

    componentDidMount() {
        Axios.post("http://127.0.0.1:8000/api/picture")
            .then(res => {
                this.setState({pictures: res.data})
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    getPosts() {
        let bodyFormData = new FormData();
        bodyFormData.set('search', this.state.search);
        Axios.post("http://127.0.0.1:8000/api/picture", bodyFormData)
            .then(res => {
                this.setState({pictures: res.data})
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    handleSearchChange = event => {
        this.setState({search: event.target.value}, function () {
            this.getPosts();
            if (this.state.search === '') {
                this.getPosts();
            }
        })
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className="container my-5">
                    <div className="d-flex justify-content-center mb-5">
                        <form className="form-inline my-2 my-lg-0" method="POST">
                            <input type="search" className="form-control mr-sm-2" name="search"
                                   placeholder="Search post" onChange={this.handleSearchChange}/>
                        </form>
                    </div>
                    <div className="row justify-content-between">
                        {
                            this.state.pictures.map((picture) =>
                                <div key={picture.id} className="card mx-2 my-3" style={{width: "350px"}}>
                                    <img src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`}
                                         className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{picture.title}</h5>
                                        <p className="card-text"><small>{picture.description}</small></p>
                                        <Link to={`/post/${picture.id}`} className="btn btn-primary">Read</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
