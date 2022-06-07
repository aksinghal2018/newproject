import React,{useState,useEffect} from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button,DropdownButton,Dropdown, Badge } from 'react-bootstrap'
import {LinkContainer,NavLink} from 'react-router-dom'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {useSelector} from 'react-redux'
import Notifications from 'react-notifications-menu'
import Notifcaitons from './Notifcaitons'
import { getNotificaitons } from '../../Services/services'
function Headercmp() {
    const count = useSelector(state => state.count)
    const [countdata, setcountdata] = useState(count)
    const [cartcmp1, setcartcmp1] = useState(<Nav.Link as={NavLink} to="/cart" style={{marginLeft:"20px",marginRight:"20px"}}>Carts <Badge>{count}</Badge></Nav.Link>)

    const [notifications, setnotifications] = useState([])

    useEffect(() => {
        console.log(encryptStorage.getItem("user"))
        setcartcmp1(<Nav.Link as={NavLink} to="/cart" style={{marginLeft:"20px",marginRight:"20px"}}>Cart <Badge>{count}</Badge></Nav.Link>)
        if(count==0){
            setcartcmp1(<Nav.Link as={NavLink} to="/cartempty" style={{marginLeft:"20px",marginRight:"20px"}}>Cart <Badge>{count}</Badge></Nav.Link>)
        }
        if(encryptStorage.getItem("user")!=undefined){

            if(encryptStorage.getItem("user").usertype=="admin"){
                setcartcmp1(<></>)
            }
        }
        if(encryptStorage.getItem('user')!=undefined){

            getNotificaitons({user_id:encryptStorage.getItem('user').userid}).then((data)=>{
                console.log(data)
                var notificationdata=data.data.data[0].Notifications
                notificationdata.reverse()
                notificationdata=notificationdata.slice(0,7)
                const notificationsdata=[]
                notificationdata.map((item)=>{
                    notificationsdata.push(
                        {
                            image:
                            "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
                          "message":item.msg,
                          "detailPage":`/getdetails/${item.link}`,
                          "receivedTime":item.created_at
                        })
                })
                setnotifications([...notifications,...notificationsdata])
                console.log(notificationdata)
                console.log(notifications)
            })
        }
    }, [count])
    const datacmp=encryptStorage.getItem("user")==undefined?<>
    <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/register">Register</Dropdown.Item>
    </>:<><Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item>
    
    <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
    </>
    var cartcmp=<></>
    var datacmp2=<></>
    if(encryptStorage.getItem("user")!=undefined){
        //    console.log(encryptStorage.getItem("user"))
            if(encryptStorage.getItem("user").usertype!="admin"){
                 datacmp2=encryptStorage.getItem("user")==undefined?<></>:<><Notifications
                data={notifications}
                header={{
                  title: "Notifications",
                  option: { text: "View All", onClick: () => console.log("Clicked") }
                }}
                markAsRead={(data) => {
                  console.log(data);
                }}/></>
            
            }}    
    
    var datacmp1=<> <Nav.Link as={NavLink} to="/" style={{marginLeft:"20px",marginRight:"20px"}}>Home</Nav.Link></>
    if(encryptStorage.getItem("user")!=undefined){
    //    console.log(encryptStorage.getItem("user"))
        if(encryptStorage.getItem("user").usertype=="admin"){
            datacmp1= <><Nav.Link as={NavLink} to="/admincrud" style={{marginLeft:"20px",marginRight:"20px"}}>Admin Panel</Nav.Link>
            <Nav.Link as={NavLink} to="/allOrder" style={{marginLeft:"20px",marginRight:"20px"}}>All Order</Nav.Link>
            <Nav.Link as={NavLink} to="/adminnotificaitons" style={{marginLeft:"20px",marginRight:"20px"}}>Order Notifications</Nav.Link>
            </>
            
        }
    }
    return (
        <Navbar bg="light" variant="light" expand="lg" style={{marginBottom:"20px"}}>
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/"> <img
                    alt=""
                    src="/images/logo.jpg"
                    height="40px"
                    width="80px"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                              {datacmp2}   
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', marginLeft: "20%" }}
                        navbarScroll
                    >
                        {datacmp1}
                        {cartcmp1}
                    </Nav>
                    <DropdownButton id="dropdown-basic-button" title="Contact">
                        
                        {datacmp}
                        <Dropdown.Item as={NavLink} to="/aboutus">Aboutus</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Headercmp
