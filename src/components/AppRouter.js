import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Login from "./Login";
import PostPicture from "./PostPicture";
import Picture from "./Picture";
import Register from "./Register";

class AppRouter extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/post/new" element={<PostPicture/>}></Route>
        <Route exact path="/post/:id" element={<Picture/>}></Route>
      </Routes>
    );
  }
}
export default AppRouter;
