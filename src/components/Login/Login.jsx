import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";
// import '../node_modules/react-toastify/dist/ReactToastify.css'
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();
function Login() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (Email === "" || password === "") {
            // return alert("Email or Password is missing");
            console.log("Fail");
            return toast.warning("Email or Password is missing", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        if (!Email.includes("@")) {
            return toast.warning("Enter a Valid Email", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        if (password.length < 6) {
            return toast.warning("Password should be at least 6 characters long", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        await Axios("https://contact-srver-test.onrender.com/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                Email,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                console.log(res.data.token);
                console.log("Logged In");
                navigate("/contacts");
                toast.success("Logged in Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });

                window.localStorage.setItem("jwt", res.data.token);
                //To display UserName on top right
                window.localStorage.setItem('user_name', Email.split('@')[0]);
            })
            .catch((e) => {
                console.log(e.message);
                // console.log(e.response.status);
                if (e.message === 'Network Error') {
                    return toast.error('Network Error', {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                if (e.response.status === 403) {
                    return toast.error("Wrong Password", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                if (e.response.status === 401) {
                    return toast.error("User does not exist", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                setEmail("");
                setPassword("");
                navigate("/");
            });
    };

    return (
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
                    <div className="display">
                        Enter your credentials to access your account
                    </div>
                    <div className="login-fields">
                        <div className="input">
                            <input
                                type="text"
                                name="login-email"
                                id="login-email"
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
                                id="login-password"
                                className="login-password form-control"
                                value={password}
                                placeholder="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    e.preventDefault();
                                }}
                            />
                        </div>
                    </div>
                    <div className="auth">
                        <div className="actions">
                            <button
                                className="btn btn-primary"
                                id="signinbtn"
                                onClick={handleLogin}
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="actions">
                            {/* <Link to={"/signup"}><span>Sign Up</span></Link> */}
                            <button
                                className="btn btn-primary"
                                id="signupbtn"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
