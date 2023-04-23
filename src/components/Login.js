import { useState } from 'react';
import axios from 'axios';

function Login(props) {
    // function logMeIn(event) {
    //     axios({
    //         method: 'POST',
    //         url: 'http://127.0.0.1:8080/accesstoken'
    //     }).then((response) => {
    //         console.log(response);
    //         props.setToken(response.data.access_token);
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    //     event.preventDefault();
    // }
    return (
        <div>
            <a href='http://127.0.0.1:8080/accesstoken'>Sign in</a>
        </div>
    )
}

export default Login;