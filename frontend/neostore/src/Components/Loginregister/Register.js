import React from 'react'
import { Container, Button, Form,InputGroup,FormControl } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import {validateemail, validatename,validatemobile,validatepassword} from '../Validations/validation'
import {registeruser,registeruserbysocial} from '../../Services/services'
import ReactGoogleLogin from "react-google-login";
import ReactFacebookLogin from "react-facebook-login";
import {googleapikey,facebookapikey} from "../../ConfigFiles/Credentials"
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import SocialButton from "../SocialButton";

import "./index.css"
function Register() {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [mobilenumber, setmobilenumber] = useState("")
    const [gender, setgender] = useState("")
    const [erroremail, seterroremail] = useState("")
    const [errorfname, seterrorfname] = useState("")
    const [errorlname, seterrorlname] = useState("")
    const [errorpassword, seterrorpassword] = useState("")
    const [errormobilenumber, seterrormobilenumber] = useState("")
    const [errorcpassword, seterrorcpassword] = useState("")
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
           encryptStorage.setItem("cart", JSON.stringify([]))
           encryptStorage.setItem("token", JSON.stringify(data1.data.token))
           console.log(data1)
              window.location.replace('/dashboard')
            }
            
        })
    
    }
    const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
    const handler=(e)=>{
        const id=e.target.id;
        
        if(id=="firstname"){
            seterrorfname(validatename(e.target.value))
            setfname(e.target.value)
        }
        if(id=="lastname"){
            seterrorlname(validatename(e.target.value))
            setlname(e.target.value)
        }
        if(id=="email"){
            seterroremail(validateemail(e.target.value))
            setemail(e.target.value)
        }
        if(id=="mobilenumber"){
            seterrormobilenumber(validatemobile(e.target.value))
            setmobilenumber(e.target.value)
        }
        if(id=="password"){
            seterrorpassword(validatepassword(e.target.value))
            setpassword(e.target.value)
        }
        if(id=="confirmpassword"){
            if(password!=e.target.value){
                seterrorcpassword("Confirm password not match with password")
            }
            else{
                seterrorcpassword("")
            }
            setcpassword(e.target.value)
        }
        if(id=="gender"){
            setgender(e.target.value)
        }
    }
    const submit=(e)=>{
        e.preventDefault()
        if(password==cpassword){
            if(errorfname!="" || errorlname!="" || erroremail!="" || errormobilenumber!="" || errorpassword!="" || gender==""){
                alert("invalid format")
            }
            else{
                const data={"firstname":fname,"lastname":lname,"email":email,"mobilenumber":mobilenumber,"password":password,"gender":gender}
                console.log(data)
                registeruser(data).then(data=>{
                    if(data.data.success!=true){
                        alert(data.data.message)
                    }
                    else{
                        alert(data.data.message)
                        window.location.replace("/login")
                    }
                })
            }
        }
        else{
            alert("password and confirm password are not same")
        }
    }
    return (
        <div>
            <div className='row' style={{ padding: "20px" }}>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 ' style={{paddingLeft:"7%"}}>
               

                <SocialButton
                provider="facebook"
                appId={facebookapikey}
                onLoginSuccess={onResponse}
                onLoginFailure={handleSocialLoginFailure}
                className="btn btn-primary "
                style={{ width: "100%" }}
              >
                <i className="fa fa-facebook" aria-hidden="true">
                  {" "}
                </i>{" "}
                Login with Facebook
              </SocialButton>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 ' style={{paddingRight:"7%"}}>
              <SocialButton
                provider="google"
                appId={googleapikey}
                onLoginSuccess={onResponse}
                onLoginFailure={handleSocialLoginFailure}
                className="btn btn-danger "
                style={{ width: "100%" }}
              >
                <i className="fa fa-google" aria-hidden="true">
                  {" "}
                </i>{" "}
                Login with Gmail
              </SocialButton>
                </div>
            </div>
            <div>
                <Container style={{ border: "2px solid black",marginTop:"20px",padding:"20px" }}>
                    <Form onSubmit={submit}>
                        <h1>Register for NeoStore</h1>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="First Name"
                                aria-label="First Name"
                                onChange={handler}
                                id="firstname"
                                autoComplete='none'
                            />
                            <InputGroup.Text  ><i class="fa fa-align-justify"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorfname} </p>
                        
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Last Name"
                                aria-label="Last Name"
                                onChange={handler}
                                id="lastname"
                                autoComplete='none'
                            />
                            <InputGroup.Text  ><i class="fa fa-align-justify"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorlname} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Email Address"
                                aria-label="Email Address"
                                id="email" onChange={handler}
                                autoComplete='none'
                            />
                            <InputGroup.Text ><i class="fa fa-envelope"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{erroremail} </p>
                       
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="password"
                                aria-label="password"
                                id="password" onChange={handler}
                                autoComplete='none'
                            />
                            <InputGroup.Text ><i class="fa fa-eye-slash"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorpassword} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="confirmpassword"
                                aria-label="confirmpassword"
                                id="confirmpassword" onChange={handler}
                            />
                            <InputGroup.Text ><i class="fa fa-eye-slash"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errorcpassword} </p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Mobile Number"
                                aria-label="Mobile Number"
                                id="mobilenumber" onChange={handler}
                            />
                            <InputGroup.Text ><i class="fa fa-phone"></i></InputGroup.Text>
                        </InputGroup>
                        <p style={{color:"red"}}>{errormobilenumber} </p>
                        <div  className="mb-3">
      <Form.Check
        inline
        label="Male"
        name="gender"
        type="radio"
        id="gender"
        value="male"
        onChange={handler}
      />
      <Form.Check
        inline
        label="Female"
        name="gender"
        type="radio"
        id="gender"
        value="female"
        onChange={handler}
      />
    </div>
                        <Button variant="primary" size="lg" type="submit">
                        Register
                         </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Register
