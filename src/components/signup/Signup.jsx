import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Signup.css";
import { toast } from "react-toastify";
// import '../node_modules/react-toastify/dist/ReactToastify.css'
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();
function Signup() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        if (Email === "" || password === "" || confirmPassword === "") {
            return toast.warning("Email or Password is missing", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        if (password !== confirmPassword) {
            return toast.warning("Confirm Password does not match", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        await Axios("https://contact-srver-test.onrender.com/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                Email,
                password,
                confirmPassword,
            },
        })
            .then((res) => {
                console.log(res);
                navigate("/");
                toast.success("Account created Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });

                //     console.log({
                //       Email,
                //       password,
                //       confirmPassword
                //   });
            })
            .catch((e) => {
                console.log(e.message);
                if (e.message === 'Network Error') {
                    return toast.error('Network Error', {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                if (e.response.status === 406) {
                    return toast.error("Invalid Email ID", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                if (e.response.status === 408) {
                    return toast.error("User already exists", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                if (e.response.status === 409) {
                    return toast.error('Network Error', { position: toast.POSITION.TOP_CENTER })
                }
            });
    };

    return (
        <div>
            <div>
                <div className="sign">
                    <img src="topleft.png" alt="Top Left corner" className="topleft" />
                    <img
                        src="bottomright.png"
                        alt="bottom right corner"
                        className="bottomright"
                    />
                    <img src="topright.png" alt="top right corner" className="topright" />
                    <img
                        src="bottomleft.png"
                        alt="bottom left corner"
                        className="bottomleft"
                    />
                    <div className="login">
                        <img
                            src="logo.png"
                            alt="Contact Manager Full Icon - Circle@pngkey.com"
                            className="logo"
                        />
                        <div className="login-container">
                            <div className="display">Create New Account</div>
                            <div className="login-fields">
                                <div className="input">
                                    <input
                                        type="text"
                                        name="login-email"
                                        id="signup-email"
                                        className="login-email form-control"
                                        value={Email}
                                        placeholder="User ID"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            e.preventDefault();
                                        }}
                                    />
                                </div>

                                <div className="input">
                                    <input
                                        type="password"
                                        name="login-password"
                                        id="signup-password"
                                        className="login-password form-control"
                                        value={password}
                                        placeholder="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            e.preventDefault();
                                        }}
                                    />
                                </div>

                                <div className="input">
                                    <input
                                        type="password"
                                        name="login-password"
                                        id="signup-confirmpassword"
                                        className="login-password form-control"
                                        value={confirmPassword}
                                        placeholder="confirm password"
                                        onChange={(e) => {
                                            setConfirmpassword(e.target.value);
                                            e.preventDefault();
                                        }}
                                    />
                                </div>

                                {/* <input type="password"
                 name="login-confirmpassword"
                 id="login-confirmpassword"
                 className="login-confirmpassword"
                 value={confirmPassword}
                 placeholder='confirm password'
                 onChange={(e)=>{
                    setConfirmpassword(e.target.value)
                    e.preventDefault()
                 }}/> */}

                                {/* <div className="login-button">
                    <button className="login-submit"
                    onClick={handleLogin}>Sign In</button>
                </div> */}

                                {/* <div className="actions">
                    <Link to={"/signup"}><span>Sign Up</span></Link>
                    <button
                    className="btn btn-primary"
                    onClick={()=>{
                        navigate('/signup')
                    }}>Sign Up</button>
                </div> */}

                                <div className="actions ">
                                    {/* <Link to={"/signup"}><span>Sign Up</span></Link> */}
                                    <button
                                        className="btn btn-primary"
                                        id="signupbtn2"
                                        onClick={handleSignup}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
