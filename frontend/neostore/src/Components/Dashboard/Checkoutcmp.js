import React from 'react'
import {Row,Col, Container,Button,Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { getUser,deleteAddress, checkout } from '../../Services/services'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { useDispatch } from 'react-redux'
import { getCart,removecart } from '../../Services/services'
import {useHistory} from 'react-router-dom'

function Checkoutcmp() {
    const [address, setaddress] = useState([])
    const [paymentmethod, setpaymentmethod] = useState("paybycash")
    
    const [cart, setcart] = useState([])
  const [subtotal, setsubtotal] = useState(0)
  const [gst, setgst] = useState(0)
  const [state, setstate] = useState(0)
  const dispatch = useDispatch()
  
  const  history =useHistory()
  useEffect(() => {
    //console.log(encryptStorage.getItem('user'))
    // getCart({email:encryptStorage.getItem('user').email}).then(data=>{
    setcart(encryptStorage.getItem("cart"))
      //console.log(data)
      //encryptStorage.setItem("cart",)
    //})
    var sumitem=0
    encryptStorage.getItem("cart").map((item)=>{
      sumitem=sumitem+item.quantity*item.price
    })
    setsubtotal(sumitem)
    setgst(Math.floor(sumitem*0.05))
    var id=encryptStorage.getItem("user").userid
    if(id==undefined){
        id=encryptStorage.getItem("user")._id
    }
    const data1={userid:id}
    //console.log(data1)
    getUser(data1).then(data=>{
        console.log(data)
        if(data.data[0].Address.length==0){
          alert("add address")
          history.push('/addaddress')
        }
        setaddress(data.data[0].Address)
    })
  }, [state])
    const handler=(e)=>{
        address.map((item,index)=>{
            if(index==e.target.id){
                setaddress(item)
            }
        })
    }
    const submit=(e)=>{
        const email=encryptStorage.getItem("user").email
        const order_data=encryptStorage.getItem("cart")
        console.log(address)
        console.log(order_data)
        if(address=="" || paymentmethod==""){
          alert("select details")
        }
        else{

          checkout({email:email,order_data:order_data,address:address,paymentmethod:paymentmethod}).then(data=>{
  
            alert("order completed")
            window.location.replace('/dashboard')
            
            removecart({email:encryptStorage.getItem('user').email}).then(data=>
              console.log(data))
          encryptStorage.setItem('cart',[])
          })
        }
    }
    return (
        <div style={{margin:"20px"}}>
            <Row>
                <Col lg={4} md={6} sm={12} style={{borderRight:"2px solid black"}}>
                    <h4>Address</h4>
                    {
                        address.map((item,index)=>{
                            return(<div style={{border:"2px solid black",padding:"20px",borderRadius:"5px",marginTop:"20px",display:"flex"}} key={index}>
                        <input type="radio" id="address" name="address" value={index} onChange={handler}  style={{margin:"20px"}}/><div>

                            <p>{item.address}</p>
                            <div style={{display:'flex'}}>
                            <p style={{marginRight:"20px"}}>{item.city}</p>
                            <p style={{marginRight:"20px"}}>{item.state}</p>
                            <p style={{marginRight:"20px"}}>{item.country}</p>
                            <p >{item.pincode}</p>
                        </div>
                        </div>
                            </div>)
                        })
                    }
                    <h4 style={{marginTop:"20px"}}>Payment Method</h4>
                    <div>
  <input type="radio" id="paymentmethod" name="paymentmethod" value="paybycash"
         defaultChecked />
  <label htmlFor="huey" style={{marginLeft:"20px"}}>paybycash</label>
</div><div>
  <input type="radio" id="paymentmethod" name="paymentmethod" value="paybycard" disabled
         defaultChecked />
  <label htmlFor="huey" style={{marginLeft:"20px"}}>paybycard</label>
</div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                <Container>
                <h1>Review Order</h1>
            <Table striped bordered hover>
  <thead>
    <tr>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Subtotal</td>
      <td>{subtotal}</td>
    </tr>
    <tr>
      <td>GST(5%)</td>
      <td>{gst}</td>
    </tr>
    <tr>
      <td>Subtotal</td>
      <td >{subtotal+gst}</td>
    </tr>
  </tbody>
</Table>
  <Button variant={"primary"} style={{width:"100%"}} onClick={submit}>Proceed To Buy</Button>
                </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Checkoutcmp
