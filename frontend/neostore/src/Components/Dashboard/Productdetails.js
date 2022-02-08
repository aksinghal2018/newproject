import React from 'react'
import { useParams } from 'react-router-dom'
import { getproductsbyiddata } from '../../Services/productservices'
import { useState, useEffect } from 'react'
import { Container, Image, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage';
import { updateCart } from '../../Services/services';
function Productdetails() {
    const { id } = useParams()
    const [productdetail, setproductdetail] = useState([])
    const [imageshow, setimageshow] = useState("")
    const [imageshow1, setimageshow1] = useState("")
    const [imageshow2, setimageshow2] = useState("")
    const [imageshow3, setimageshow3] = useState("")
    const [backgroundcolor, setbackgroundcolor] = useState("black")
    const [divdata, setdivdata] = useState(<></>)
    const dispatch = useDispatch()
    var data11 = ""
    async function fetch() {

        await getproductsbyiddata(id).then(data => {
            console.log(data.data.data[0]._id)
            setproductdetail(data.data.data[0])
            setimageshow(data.data.data[0].product_subImages[0])
            setimageshow1(data.data.data[0].product_subImages[0])
            setimageshow2(data.data.data[0].product_subImages[1])
            setimageshow3(data.data.data[0].product_subImages[2])
            setbackgroundcolor(data.data.data[0].color_id.color_name)
            setdivdata(<div style={{ display: "flex" }}>
            <h4>Description:</h4>{" "}<p style={{ marginLeft: "20px", fontSize: "20px",color:"black" }}>{productdetail.product_desc}</p></div>)
        })
    }
    const changedata=(data)=>{
        const item1=document.getElementById("description")
        const item2=document.getElementById("features")
        if(data=="description"){
            item1.classList.add('activediv')
            item2.classList.remove('activediv')
            setdivdata(<div style={{ display: "flex" }}>
            <h4>Description:</h4>{" "}
            <p style={{ marginLeft: "20px", fontSize: "20px" }}>
                {productdetail.product_desc}
            </p>
            
        </div>)
        }
        else{
            item2.classList.add('activediv')
            item1.classList.remove('activediv')
            setdivdata(<><div style={{ display: "flex" }}>
            <h4>Stock:</h4>{" "}
            <p style={{ marginLeft: "20px", fontSize: "20px" }}>
                {productdetail.product_stock}
            </p>
        </div>
        <div style={{ display: "flex" }}>
            <h4>Producer:</h4>{" "}
            <p style={{ marginLeft: "20px", fontSize: "20px" }}>
                {productdetail.product_producer}
            </p>
        </div>
        <div style={{ display: "flex" }}>
            <h4>Dimention:</h4>{" "}
            <p style={{ marginLeft: "20px", fontSize: "20px" }}>
                {productdetail.product_dimension}
            </p>
        </div>
        <div style={{ display: "flex" }}>
            <h4>Material:</h4>{" "}
            <p style={{ marginLeft: "20px", fontSize: "20px" }}>
                {productdetail.product_material}
            </p>
        </div>
        </>)
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    const changeImage = (image_url) => {
        setimageshow(image_url)
    }
    const colorimage = (data) => { }
    const starrating = (data) => {
        if (data >= 0 && data <= 1) {
            return (<img src='../Images/1star.JPG' alt='1startimage' style={{ width: "70px", height: "20px", marginTop: "5px" }} />)
        }
        if (data > 1 && data <= 2) {
            return (<img src='../Images/2star.jpg' alt='2startimage' style={{ width: "70px", height: "20px", marginTop: "5px" }} />)
        }
        if (data > 2 && data <= 3) {
            return (<img src='../Images/3star.jpg' alt='3startimage' style={{ width: "70px", height: "20px", marginTop: "5px" }} />)
        }
        if (data > 3 && data <= 4) {
            return (<img src='../Images/4start.JPG' alt='4startimage' style={{ width: "70px", height: "20px", marginTop: "5px" }} />)
        }
        if (data > 4 && data <= 5) {
            return (<img src='../Images/5star.jpg' alt='5startimage' style={{ width: "70px", height: "20px", marginTop: "5px" }} />)
        }
    }
    const alreadyhave=(data)=>{
        //alert(data)
        //console.log(productdetail._id)
        var count=0
        encryptStorage.getItem('cart').map(item=>{
            // console.log(item)
            // console.log(id)
            if(item.id==data){
                count=count+1
            }
        })
        //alert(count)
        return count
    }
    const addtoCart=()=>{
        //console.log(alreadyhave(id))
        if(alreadyhave(productdetail._id)==0){
            var data1=encryptStorage.getItem('cart')
            dispatch({type:'Inc_count'})
            data1.push({name:productdetail.product_name,rating:productdetail.product_rating,price:productdetail.product_cost,quantity:1,image_url:productdetail.product_subImages[0],id:productdetail._id,Status:"In Stock",producer:productdetail.product_producer})
            // updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
            //     console.log(data))
            encryptStorage.setItem('cart',data1)
            alert("item added")
        }
        else{
            alert("already added")
        }
    }
    return (
        <div >
            <Container style={{ textAlign: "center" }}>

                <Row>
                    <Col>

                        <Image className='hover-zoom' src={imageshow} alt="" rounded style={{ marginLeft: "12%", marginRight: "20%", marginTop: "7%", width: "60%", marginBottom: "20px", width: "400px", height: "200px" }} />
                        <Row>
                            <Col>
                                <Image src={imageshow1} alt="" thumbnail onClick={() => changeImage(imageshow1)} style={{ height: "120px", width: "120px" }} />
                            </Col>
                            <Col>
                                <Image src={imageshow2} alt="" thumbnail onClick={() => changeImage(imageshow2)} style={{ height: "120px", width: "120px" }} />
                            </Col>
                            <Col>
                                <Image src={imageshow3} alt="" thumbnail onClick={() => changeImage(imageshow3)} style={{ height: "120px", width: "120px" }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col>

                        <Container style={{ border: "2px solid black", textAlign: "left", paddingTop: "20px", height: "450px" }}>
                            <h5 style={{}}>{productdetail.product_name}</h5>

                            <div style={{ display: "flex" }}>
                                {starrating(productdetail.product_rating)}
                                <p style={{ marginLeft: "20px" }}>
                                    {productdetail.product_rating}
                                </p>
                            </div>
                            <hr />
                            <div style={{ display: "flex" }}>
                                <h4>Price:</h4>{" "}
                                <p style={{ marginLeft: "20px", fontSize: "20px", color: "green" }}>
                                    {productdetail.product_cost}₹
                                </p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <h4>Color:</h4>{" "}
                                <p style={{ marginLeft: "20px", fontSize: "20px", color: "green" }}>

                                    <div style={{ width: "20px", height: "20px", marginTop: "5px", backgroundColor: backgroundcolor, border: "2px solid black" }}></div>
                                </p>
                            </div>
                            <div style={{ display: "flex", marginTop: "20px" }}>
                                <h4>Share:</h4>{" "}
                                <p style={{ marginLeft: "20px", fontSize: "20px", color: "green" }}>

                                    <div style={{ width: "20px", height: "20px" }}><i class="fa fa-share-alt" aria-hidden="true" style={{ fontSize: "20px" }}></i>
                                    </div>
                                </p>
                            </div>
                            <div style={{ display: "flex", marginTop: "20px" }}>

                                <div style={{ width: "40px", height: "40px", backgroundColor: "blue", borderRadius: "50%", marginLeft: "20px" }}><i class="fa fa-facebook-square" aria-hidden="true" style={{ color: "white", margin: "32%" }}></i></div>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "red", borderRadius: "50%", marginLeft: "20px" }}><i class="fa fa-google" aria-hidden="true" style={{ color: "white", margin: "32%" }}></i></div>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "green", borderRadius: "50%", marginLeft: "20px" }}><i class="fa fa-google-plus-square" aria-hidden="true" style={{ color: "white", margin: "32%" }}></i></div>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "#ff9999", borderRadius: "50%", marginLeft: "20px" }}><i class="fa fa-pinterest-square" aria-hidden="true" style={{ color: "white", margin: "32%" }}></i></div>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "lightblue", borderRadius: "50%", marginLeft: "20px" }}><i class="fa fa-twitter" aria-hidden="true" style={{ color: "white", margin: "32%" }}></i></div>

                            </div>
                            <Row style={{ padding: "20px" }}>
                                <Col lg={6}>
                                    <Button variant="primary" size="lg" style={{ width: "100%" }} onClick={addtoCart}>Add to Cart</Button>
                                </Col>
                                <Col lg={6}>
                                    <Button variant="warning" size="lg" style={{ width: "100%" }}> Rate this</Button>
                                </Col>
                            </Row>


                        </Container>
                    </Col>
                </Row>

                <hr />
                <Container>
                    <nav style={{ textAlign: "left", display: "flex" }}>
                        <div style={{ margin: "7px", fontSize: "18px", paddingRight: "20px" }} id='description' className=' activediv' onClick={()=>changedata("description")}>Description</div>
                        <div style={{ margin: "7px", fontSize: "18px" }} id='features' className='' onClick={()=>changedata("features")}>Features</div>

                    </nav>
                    
                    {divdata}
                </Container>
            </Container>

        </div>
    )
}

export default Productdetails
