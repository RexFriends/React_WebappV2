import {useState} from 'react'
import './Login.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import logo from '../../assets/img/128.png'
import {FaGoogle, FaFacebookF} from 'react-icons/fa'
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import env from 'react-dotenv'
require('firebase/auth')

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider();
// facebookProvider.addScope('user_birthday');
// [END auth_facebook_provider_scopes]
// [START auth_facebook_provider_params]
facebookProvider.setCustomParameters({
'display': 'popup'
});


function Login(){
    let history = useHistory();
    const [signUp, signUpSet] = useState(false)
    const [email, emailSet] = useState("")
    const [password, passwordSet] = useState("")
    const [firstname, firstnameSet] = useState("")
    const [lastname, lastnameSet] = useState("")
    const [phone, phoneSet] = useState("")
    
    const clearFields = () => {
        emailSet("")
        passwordSet("")
        phoneSet("")
        firstnameSet("")
        lastnameSet("")
    }

    const handleSignUp = () => {
        let payload = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "phone": phone
        }
        console.log("Signup call:", payload)

        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                console.log(user)
                payload.uid = user.user.uid
                
                fetch(env.API_URL + '/api/signupweb?uid=' + payload.uid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(
                    json => {
                        if (json.success === true){
                            redirectToLandingPage(payload.uid)
                        }
                    }
                )
                .catch((error) => {
                    console.log(error.message)
                })
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const handleLogin = () => {
        let payload = {
            "email": email,
            "password": password
        }
        console.log("Login call:", payload)
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    // console.log(res)
                    redirectToLandingPage(res.user.uid)
                }).catch(e => {
                    console.log(e);
                });
    }

    const handleFacebook = () => {
        firebase.auth().signInWithPopup(facebookProvider).then((res) => {
            const data = {
                "firstname": res.additionalUserInfo.profile.given_name,
                "lastname": res.additionalUserInfo.profile.family_name,
                "email": res.user.email,
                "phone": null,
                "uid": res.user.uid
                }
            fetch(env.API_URL + "/api/signupweb", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => {
                console.log("This is the json return from api", json)
                if(json.success === true ){
                    redirectToLandingPage(data.uid)
                }else{
                    console.log(json.error)
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
          }).catch((error) => {
            console.log(error.message)
          })
    }

    const handleGoogle = () => {
        // console.log("GoogleAuth call")
        firebase.auth().signInWithPopup(googleProvider).then((res) => {
            const data = {
                "firstname": res.additionalUserInfo.profile.given_name,
                "lastname": res.additionalUserInfo.profile.family_name,
                "email": res.user.email,
                "phone": null,
                "uid": res.user.uid
                }
            fetch(env.API_URL + "/api/signupweb", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => {
                console.log("This is the json return from api", json)
                if(json.success === true ){
                    redirectToLandingPage(data.uid)
                }else{
                    console.log(json.error)
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
          }).catch((error) => {
            console.log(error.message)
          })

    }

    const redirectToLandingPage = (uid) => {
        localStorage.setItem("rexUID", uid)
        // need to first check if user was on a rex page before, if not, we send them to the landing page
        history.push("/")
    }   

    return(
        <div id="login" style={{height: signUp ? "475px" : "320px" }}>
            <div id="header">
                <img src={logo} alt="logo" id="logo" />
                <div id="text">{signUp ? "Join Rex Today" : "Log in to Rex"}</div>
            </div>
            <div id="option">
                <div onClick={()=>{signUpSet(false); clearFields()}} id={signUp ? "" : "highlight"}>Login</div>
                <div onClick={()=>{signUpSet(true); clearFields()}} id={!signUp ? "" : "highlight"}>Sign Up</div>
            </div>

            {!signUp ?
                <div id="content_1">
                    <div id="text">
                        <TextField label="Email" variant="outlined" size="small" id="input_1" value={email} onChange={(e)=>emailSet(e.target.value)}/>
                        <TextField label="Password" variant="outlined" size="small" id="input_1" value={password} onChange={(e)=>passwordSet(e.target.value)}/>
                    </div>
                    <div id="trouble"><a href="https://www.rexfriends.com/">Troube logging in?</a></div>
                    <Button variant="contained" color="primary" onClick={handleLogin} size="small" id="login-button" >Log In</Button>
                    <div id="seperator">
                        <div id="dash"></div>
                        <div id="or">or</div>
                        <div id="dash"></div>
                    </div>
                    <div id="Oauth">
                        <Button variant="contained" color="primary" onClick={handleGoogle} size="small" id="google" startIcon={<FaGoogle/>}>Sign in with Google</Button>
                        <Button variant="contained" color="primary" onClick={handleFacebook} size="small" id="fb" startIcon={<FaFacebookF/>}>Sign in with Facebook</Button>
                    </div>
                </div>
            :
                <div id="content_2">
                    <div id="text">
                        <div id="name">
                        <TextField label="First Name" variant="outlined" size="small"value={firstname} onChange={(e)=>firstnameSet(e.target.value)} />
                        <TextField label="Last Name" variant="outlined" size="small" value={lastname} onChange={(e)=>lastnameSet(e.target.value)}/>
                        </div>
                        <TextField label="Email" variant="outlined" size="small" id="input_1"  value={email} onChange={(e)=>emailSet(e.target.value)}/>
                        <TextField label="Password" variant="outlined" size="small" id="input_1" value={password} onChange={(e)=>passwordSet(e.target.value)}/>
                        <TextField label="Phone Number" variant="outlined" size="small" id="input_1" value={phone} onChange={(e)=>phoneSet(e.target.value)}/>
                    </div>
                    <div id="terms">By clicking Sign Up, you are indicating that you have read and acknowledge the <a href="https://www.rexfriends.com/">Terms of Service</a> and <a href="https://www.rexfriends.com/">Privacy Notice</a>.</div>
                    <Button variant="contained" color="primary" onClick={handleSignUp}  size="small" id="signup-button">Sign Up</Button>
                    <div id="seperator">
                        <div id="dash"></div>
                        <div id="or">or</div>
                        <div id="dash"></div>
                    </div>
                    <div id="Oauth">
                        <Button variant="contained" color="primary" onClick={handleGoogle} size="small" id="google" startIcon={<FaGoogle/>}>Sign in with Google</Button>
                        <Button variant="contained" color="primary" onClick={handleFacebook} size="small" id="fb" startIcon={<FaFacebookF/>}>Sign in with Facebook</Button>
                    </div>  
                </div>        
            }
        </div>
    )
}

export default Login