import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import { getCart, loginuser,registeruser,registeruserbysocial } from '../../Services/services'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import ReactGoogleLogin from "react-google-login";
import ReactFacebookLogin from "react-facebook-login";
import ReactTwitterLogin from "react-twitter-login";
import {googleapikey,facebookapikey} from "../../ConfigFiles/Credentials"
import "./index.css"
import SocialButton from "../SocialButton";
function Login(props) {
    useEffect(() => {
        if(encryptStorage.getItem("user")!=undefined){
            window.location.replace("/dashboard")
        }
    }, [])
    const onResponse = (user) => {
        if(encryptStorage.getItem("user")!=undefined){
            encryptStorage.removeItem("user")
        }
        var data=[]
        data={email:user._profile.email,first_name:user._profile.firstName,last_name:user._profile.lastName}
        registeruserbysocial(data).then(data1=>{
            if(data1.data.err=="incorrect login"){
                alert(data1.data.message)
            }
            else{

                alert("login Successfully")
           encryptStorage.setItem("user", JSON.stringify(data1.data.data))
           encryptStorage.setItem("token", JSON.stringify(data1.data.token))
           console.log(data1)
              window.location.replace('/dashboard')
            }
            
        })
    
    }
    const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
    const authHandler = (error, data) => {
        if (error) return console.error(error);
        console.log(data);
    };

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const handler = (e) => {
        const id = e.target.id
        if (id == "email") {
            setemail(e.target.value)
        }
        else {
            setpassword(e.target.value)
        }
    }
    const handleSocialLogin = (user, err) => {
        console.log(user);
        console.log(err);
    };
    const submit = (e) => {
        e.preventDefault()
        if (email !== "") {
            const data = { "email": email, "password": password }
            
            console.log(data)
            loginuser(data).then(data => {
                console.log(data.data.success)
                if (data.data.success == true) {
                    alert(data.data.message)
                    encryptStorage.setItem("user", JSON.stringify(data.data.customer_details))
                    //encryptStorage.setItem("cart", JSON.stringify([]))
                    encryptStorage.setItem("token", JSON.stringify(data.data.token))
                    window.location.replace('/dashboard')
                }
                else {
                    alert(data.data.message)
                }
            })
        }
        else {
            alert("invalid feild")
        }
    }
    return (
        <Container className="mt-4">
            <Row>
                <Col lg={6} md={6} sm={6} style={{ borderRight: "2px solid black" }}>
                    <div className="d-grid gap-2 " style={{ paddingRight: "20px" }}>
                    <SocialButton
                provider="facebook"
                appId={facebookapikey}
                onLoginSuccess={onResponse}
                onLoginFailure={handleSocialLoginFailure}
                className="btn btn-primary button1 buttonadjust"
                // style={{ width: "300px" }}
              >
                <i className="fa fa-facebook" aria-hidden="true">
                  {" "}
                </i>{" "}
                Login with Facebook
              </SocialButton>
              <SocialButton
                provider="google"
                appId={googleapikey}
                onLoginSuccess={onResponse}
                onLoginFailure={handleSocialLoginFailure}
                className="btn btn-danger button1"
                // style={{ width: "300px" }}
              >
                <i className="fa fa-google" aria-hidden="true">
                  {" "}
                </i>{" "}
                Login with Gmail
              </SocialButton>
                        <ReactTwitterLogin
                            authCallback={authHandler}
                            consumerKey="<Consumer Key>" // We created this, remember?
                            consumerSecret="<Consumer Secret>" // We created this, remember?
                            callbackUrl="<Callback URL>"
                             // You set this up in the twitter app settings, remember?
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} sm={6}>

                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="email" onChange={handler} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" onChange={handler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <p style={{ color: "black" }}><a href="/register" >Register</a> | <a href="/forgetpassword" >Forgotten</a></p>
            </Container>
        </Container>
    )
}

export default Login
