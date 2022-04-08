import React from "react";
import {BallTriangle} from "react-loader-spinner";

class AppLoader extends React.Component {
    render() {
        return (
            <BallTriangle color="#00BFFF" height={80} width={80} />
        )
    }
}

export default AppLoader;