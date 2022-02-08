import React from 'react'
import {useHistory} from 'react-router-dom'
function Footercmp() {
    const history =useHistory()
    return (
        <div>
            <footer className="page-footer font-small blue pt-4" style={{ backgroundColor: "black", color: "white",textAlign:"center",marginTop:"70px" }}>
                <div className="container-fluid text-center text-md-left">
                    <div className="row">      <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-md-0 mt-3">
                        <h5 className="text-uppercase">About Company</h5>
                        <p>NeoSofgt Technologies is here for quick and Easy Services.</p>
                        <p>For Shopping.</p>
                        <p>Contact Information</p>
                        <p>Email:-Contact@Neosftmail.com</p>
                        <p>Phone:-011-99999999999</p>
                        <p>Mumbai,India</p>
                    </div>

                        <hr className="clearfix w-100 d-md-none pb-3" />
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Information</h5>
                        <p>Term and Conditions</p>
                        <p>Gurantee and Return Policy</p>
                        <p>Contact us</p>
                        <p>Privacy Policy</p>
                        <p onClick={()=>{history.push('/location')}}>Location Us</p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-md-0 mt-3">
                            <h5 >NewsLetter</h5>

                            <p>Signup to get exclussive offer from our favorite brand and to</p>
                            <p>Setup in the news.</p>
                            <form>
                            <input type="email" placeholder='type email..'/><br/>
                            <button type='submit' style={{backgroundColor:"white",margin:"20px"}}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">© 2021 Copyright:
                    <a href="/"> NeoStore</a> All rights reserved .
                </div>

            </footer>

        </div>
    )
}

export default Footercmp
