import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Button, TextField, IconButton } from "@material-ui/core";
import logo from "../../assets/img/128.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { showAlert } from "../Alerts/Alerts";
import firebase from "firebase";
import APIURL from "../../assets/URL";
import "firebase/auth";
import { AiOutlineUser, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
// facebookProvider.addScope('user_birthday');
// [END auth_facebook_provider_scopes]
// [START auth_facebook_provider_params]
facebookProvider.setCustomParameters({
    display: "popup",
});

function Login() {
    const history = useHistory();
    const [signUp, signUpSet] = useState(false);
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const [firstname, firstnameSet] = useState("");
    const [lastname, lastnameSet] = useState("");
    const [phone, phoneSet] = useState("");
    const [showPassword, showPasswordSet] = useState(false);
    useEffect(() => {
        const rexUID = localStorage.getItem("rexUID");
        if (rexUID !== null) {
            history.push("/closets");
        }
    }, [history]);

    const clearFields = () => {
        emailSet("");
        passwordSet("");
        phoneSet("");
        firstnameSet("");
        lastnameSet("");
        showPasswordSet(false);
    };

    const handleSignUp = () => {
        const payload = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
        };

        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                console.log(user);
                payload.uid = user.user.uid;

                fetch(`${APIURL}/api/signupweb?uid=${payload.uid}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.success === true) {
                            redirectToLandingPage(payload.uid);
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleLogin = () => {
        const payload = {
            email: email,
            password: password,
        };
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then((res) => {
                redirectToLandingPage(res.user.uid);
            })
            .catch((err) => {
                console.log(err);
                showAlert("Invalid login!", "error");
            });
    };

    const handleFacebook = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((res) => {
                const data = {
                    firstname: res.additionalUserInfo.profile.given_name,
                    lastname: res.additionalUserInfo.profile.family_name,
                    email: res.user.email,
                    phone: null,
                    uid: res.user.uid,
                };

                fetch(`${APIURL}/api/signupweb`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.success === true) {
                            redirectToLandingPage(data.uid);
                        } else {
                            console.log(json.error);
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                const data = {
                    firstname: res.additionalUserInfo.profile.given_name,
                    lastname: res.additionalUserInfo.profile.family_name,
                    email: res.user.email,
                    phone: null,
                    uid: res.user.uid,
                };
                fetch(APIURL + "/api/signupweb", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("This is the json return from api", json);
                        if (json.success === true) {
                            redirectToLandingPage(data.uid);
                        } else {
                            console.log(json.error);
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const redirectToLandingPage = (uid) => {
        localStorage.setItem("rexUID", uid);
        // need to first check if user was on a rex page before, if not, we send them to the landing page
        history.push("/closets");
    };

    return (
        <>
            <div id="login" style={{ height: signUp ? "475px" : "320px" }}>
                <div id="header">
                    <img src={logo} alt="logo" id="logo" />
                    <div id="text">
                        {signUp ? "Join Rex Today" : "Log in to Rex"}
                    </div>
                </div>
                <div id="option">
                    <div
                        onClick={() => {
                            signUpSet(false);
                            clearFields();
                        }}
                        id={signUp ? "" : "highlight"}
                    >
                        Login
                    </div>
                    <div
                        onClick={() => {
                            signUpSet(true);
                            clearFields();
                        }}
                        id={!signUp ? "" : "highlight"}
                    >
                        Sign Up
                    </div>
                    <a
                        href={
                            "https://chrome.google.com/webstore/detail/rex-social-shopping-assis/hhegepmkgedompkfdccmmajmknnnlele/related?hl=en&authuser=0"
                        }
                        target="blank"
                        rel="noreferrer"
                    >
                        Download Extension
                    </a>
                </div>
                {!signUp ? (
                    <div id="content_1">
                        <div id="text">
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                id="input_1"
                                value={email}
                                onChange={(e) => emailSet(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                size="small"
                                id="input_1"
                                value={password}
                                type={!showPassword ? "password" : "text"}
                                onChange={(e) => passwordSet(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && handleLogin()
                                }
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                showPasswordSet(!showPassword);
                                            }}
                                        >
                                            {!showPassword ? (
                                                <AiFillEyeInvisible />
                                            ) : (
                                                <AiFillEye />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </div>
                        <div id="trouble">
                            <a href="https://www.rexfriends.com/">
                                Trouble logging in?
                            </a>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            size="small"
                            id="login-button"
                        >
                            Log In
                        </Button>
                        <div id="seperator">
                            <div id="dash" />
                            <div id="or">or</div>
                            <div id="dash" />
                        </div>
                        <div id="Oauth">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGoogle}
                                size="small"
                                id="google"
                                startIcon={<FaGoogle />}
                            >
                                Sign in with Google
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFacebook}
                                size="small"
                                id="fb"
                                startIcon={<FaFacebookF />}
                            >
                                Sign in with Facebook
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div id="content_2">
                        <div id="text">
                            <div id="name">
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    value={firstname}
                                    onChange={(e) =>
                                        firstnameSet(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    size="small"
                                    value={lastname}
                                    onChange={(e) =>
                                        lastnameSet(e.target.value)
                                    }
                                />
                            </div>
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                id="input_1"
                                value={email}
                                onChange={(e) => emailSet(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                size="small"
                                id="input_1"
                                value={password}
                                type={!showPassword ? "password" : "text"}
                                onChange={(e) => passwordSet(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                showPasswordSet(!showPassword);
                                            }}
                                        >
                                            {!showPassword ? (
                                                <AiFillEyeInvisible />
                                            ) : (
                                                <AiFillEye />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                size="small"
                                id="input_1"
                                value={phone}
                                onChange={(e) => phoneSet(e.target.value)}
                            />
                        </div>
                        <div id="terms">
                            By clicking Sign Up, you are indicating that you
                            have read and acknowledge the{" "}
                            <a href="https://www.rexfriends.com/">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="https://www.rexfriends.com/">
                                Privacy Notice
                            </a>
                            .
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignUp}
                            size="small"
                            id="signup-button"
                        >
                            Sign Up
                        </Button>
                        <div id="seperator">
                            <div id="dash" />
                            <div id="or">or</div>
                            <div id="dash" />
                        </div>
                        <div id="Oauth">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGoogle}
                                size="small"
                                id="google"
                                startIcon={<FaGoogle />}
                            >
                                Sign in with Google
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFacebook}
                                size="small"
                                id="fb"
                                startIcon={<FaFacebookF />}
                            >
                                Sign in with Facebook
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;
