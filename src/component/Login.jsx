import React from "react"
import '../CSS/login.css'
export const Login = ({ FacebookLogin }) => {
    return (<div>
        <div className="login-form">

            <h1 className="sms_header">SMS Services</h1>
            <h2 className="description_header">Faster</h2>
            <h2 className="description_header">Wider</h2>
            <h2 className="description_header">Better</h2>
            <button
                className="loginBtn loginBtn--facebook"
                onClick={FacebookLogin}>Login with Facebook</button>
        </div>
    </div>
    )
}