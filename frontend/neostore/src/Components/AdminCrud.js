import React, { useState, useEffect } from 'react'
import { Container, Row, Col, DropdownButton, Dropdown, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import './Dashboard/index.css'
import ReactPaginate from 'react-paginate';
import { encryptStorage } from '../ConfigFiles/EncryptStorage'
import { authenticatetoken, deleteproduct, getcategory,getcolor, getproducts, getproductsname, updateproduct } from '../Services/productservices';
import Crouselcmp from './Dashboard/Crouselcmp';
import Cardcmp from './Dashboard/Cardcmp';
import { Card } from 'react-bootstrap'
import AddProduct from './Dashboard/AddProduct';
import axios from 'axios'
import swal from 'sweetalert2'
import {Modal} from 'react-bootstrap'
import Modaldata from '../Components/Modaldata';
import "./index.css"

function AdminCrud() {
    const [products, setproducts] = useState([])
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [itemsPerPage, setitemsPerPage] = useState(12) //

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [category, setcategory] = useState([])
    const [categoryitem, setcategoryitem] = useState("all")
    const [color, setcolor] = useState([])
    const [coloritem, setcoloritem] = useState("all")
    const [sortrating, setsortrating] = useState(0)
    const [user, setuser] = useState({})
    const [updateform, setupdateform] = useState(<AddProduct status="add" data={{}} />)
    const [product_name, setproduct_name] = useState("")
    const [product_image, setproduct_image] = useState("")
    const [product_image1, setproduct_image1] = useState("")
    const [product_image2, setproduct_image2] = useState("")
    const [product_image3, setproduct_image3] = useState("")
    const [newproduct_image, setnewproduct_image] = useState("")
    const [newproduct_image1, setnewproduct_image1] = useState("")
    const [newproduct_image2, setnewproduct_image2] = useState("")
    const [newproduct_image3, setnewproduct_image3] = useState("")
    const [product_desc, setproduct_desc] = useState("")
    const [product_cost, setproduct_cost] = useState("")
    const [product_stock, setproduct_stock] = useState("")
    const [product_category, setproduct_category] = useState("")
    const [product_color, setproduct_color] = useState("")
    const [product_rating, setproduct_rating] = useState("")
    const [product_producer, setproduct_producer] = useState("")
    const [product_dimention, setproduct_dimention] = useState("")
    const [product_material, setproduct_material] = useState("")
    const [changebutton, setchangebutton] = useState(<Button variant="primary" type="submit">Submit</Button>)
    const [changepage, setchangepage] = useState(0)
    const [show, setShow] = useState(false);
    const [productstatus, setproductstatus] = useState(0)
    
    const [previous_stock, setprevious_stock] = useState(0)
    const [iddata, setiddata] = useState("")

    const [product_name_error, setproduct_name_error] = useState("")
    
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    var data2 = <AddProduct status="add" data={{}} />
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if (encryptStorage.getItem("user") != undefined) {

            authenticatetoken().then(data => {
                if (data.data.err == "token") {
                    alert(data.data.msg)
                    window.location.replace("/logout")
                }
            })
        }
        if (encryptStorage.getItem('cart') == undefined) {

            encryptStorage.setItem('cart', [])
        }

        else {

            setuser(encryptStorage.getItem("user"))
        }
        getproducts().then(data => {
            console.log(data.data.data[0])
            var data1 = data.data.data.slice(itemOffset, endOffset)
            data1.sort((a, b) => {
                return a.product_rating - b.product_rating;
            });
            console.log(data1)
            setproducts(data.data.data);
            setCurrentItems(data1);
            setPageCount(Math.ceil(data.data.data.length / itemsPerPage));
        })
        getcategory().then(data => {
            //console.log(data.data.data)
            setcategory(data.data.data)
        })
        getcolor().then(data => {
            //console.log(data.data.data)
            setcolor(data.data.data)
        })
    }, [ changepage]
    
    )
    const changedata=()=>{
        const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
        console.log(itemOffset, endOffset)
        var data1 = products.slice(itemOffset, endOffset)
        data1.sort((a, b) => {
            return a.product_rating - b.product_rating;
        });
            console.log(data1)
            setCurrentItems(data1);
        }
        const giveimages=(e)=>{
            //console.log(newproduct_image)
            //console.log(newproduct_image,newproduct_image1,newproduct_image2,newproduct_image3)
            let formData = new FormData();
            formData.append("myfile1", newproduct_image);
                formData.append("myfile2", newproduct_image1);
                formData.append("myfile3", newproduct_image2);
                formData.append("myfile4", newproduct_image3);
                formData.append('pid', iddata);

                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=AaB03x" +
                            "--AaB03x" +
                            "Content-Disposition: file" +
                            "Content-Type: png" +
                            "Content-Transfer-Encoding: binary" +
                            "...data... " +
                            "--AaB03x--",
                        "Accept": "application/json",
                        "type": "formData",
                        'Authorization': 'Bearer ' + encryptStorage.getItem('token')

                    }
                }
                axios.post('http://localhost:8899/api/updateproductsimages', formData, config).then(
                    data => {
                        console.log(data)
                        if (data.data.err == "token") {
                            swal.fire(data.data.msg)
                            window.location.replace("/logout")
                        }

                        else {
                            console.log(data)
                            if (data.data.err == "0") {
                                swal.fire(data.data.message)
                                // window.location.reload("")
                            }
                            else {
                                console.log(data)
                                //swal.fire(data.data.err)
                                //window.location.reload()
                            }

                        }
                    }
                )
        }
        const [updatebutton, setupdatebutton] = useState(0)
    const handler = (e) => {
        console.log(e.target.id)
        if (e.target.id == "productname") {
            setproduct_name(e.target.value)
        }
        if (e.target.id == "productdescription") {
            setproduct_desc(e.target.value)
        }
        if (e.target.id == "productcost") {
            setproduct_cost(e.target.value)
        }
        if (e.target.id == "productstock") {
            setproduct_stock(e.target.value)
        }
        if (e.target.id == "productcategory") {
            setproduct_category(e.target.value)
        }
        if (e.target.id == "productcolor") {
            setproduct_color(e.target.value)
        }
        if (e.target.id == "productrating") {
            setproduct_rating(e.target.value)
        }
        if (e.target.id == "productproducer") {
            alert("")
            setproduct_producer(e.target.value)
        }
        if (e.target.id == "productdimention") {
            setproduct_dimention(e.target.value)
        }
        if (e.target.id == "productmaterial") {
            setproduct_material(e.target.value)
            console.log(product_image)
        }
        if (e.target.id == "file_input") {
            setproduct_image(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input1") {
            setproduct_image1(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input2") {
            setproduct_image2(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input3") {
            setproduct_image3(e.target.files[0])
            console.log(e.target.files[0])
        }
        
    }
    const handler1=(e)=>{
        if (e.target.id == "file_input") {
            setnewproduct_image(e.target.files[0])
            setproduct_image(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input1") {
            setnewproduct_image1(e.target.files[0])
            setproduct_image1(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input2") {
            setnewproduct_image2(e.target.files[0])
            setproduct_image2(e.target.files[0])
            console.log(e.target.files[0])
        }
        if (e.target.id == "file_input3") {
            setnewproduct_image3(e.target.files[0])
            setproduct_image3(e.target.files[0])
            console.log(e.target.files[0])
        }
    }
    const [modaldata, setmodaldata] = useState(<Modaldata handleevent={handler}  image1={product_image} image2={product_image1} image3={product_image2} image4={product_image3} status={productstatus} />)
    const submit = (e) => {
        e.preventDefault()
        if (product_name != "" && product_desc != "" && product_cost != "" && product_stock != "") {
            const data = {}

            let formData = new FormData();    //formdata object
            // var imagedata = document.getElementById("mainfile").files[0];
            // var imagedata1 = document.getElementById("subfile1").files[0];
            // var imagedata2 = document.getElementById("subfile2").files[0];
            // var imagedata3 = document.getElementById("subfile3").files[0];
            formData.append("myfile1", newproduct_image);
            formData.append("myfile2", newproduct_image1);
            formData.append("myfile3", newproduct_image2);
            formData.append("myfile4", newproduct_image3);
            formData.append('pname', product_name);   //append the values with key, value pair
            formData.append('pdesc', product_desc);
            formData.append('pcost', product_cost);
            formData.append('pstock', product_stock)
            formData.append('pcategory', product_category)
            formData.append('pcolor', product_color)
            formData.append('prating', product_rating)
            formData.append('pproducer', product_producer)
            formData.append('pdimention', product_dimention)
            formData.append('pmaterial', product_material)
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data; boundary=AaB03x" +
                        "--AaB03x" +
                        "Content-Disposition: file" +
                        "Content-Type: png" +
                        "Content-Transfer-Encoding: binary" +
                        "...data... " +
                        "--AaB03x--",
                    "Accept": "application/json",
                    "type": "formData",
                    'Authorization': 'Bearer ' + encryptStorage.getItem('token')

                }
            }
            axios.post('http://localhost:8899/api/addproduct', formData, config).then(
                data => {
                    //console.log(data.data.message)
                    if (data.data.err == "token") {
                        swal.fire(data.data.msg)
                        window.location.replace("/logout")
                    }
                    else {

                        if (data.data.err == "0") {
                            swal.fire(data.data.message)
                            window.location.reload("")
                        }
                        else {
                            //console.log(data)
                            swal.fire(data.data.err)
                            //window.location.reload()
                        }
                    }
                }
            )
        }
        else {
            swal.fire("cannot be empty feilds.")
        }
    }
    const sortbystock = () => {
        var data = currentItems
        console.log(data)
        data.sort((a, b) => {
            return a.product_stock - b.product_stock;
        });
        console.log(data)
        setCurrentItems(data)
        setsortrating(Math.random())
    }
    const sortbystock1 = () => {
        var data = currentItems.filter(checkItem)
        setCurrentItems(data)
        setsortrating(Math.random())
    }
    function  checkItem(data){
        return data.product_stock==0
    }
    var newpreviousdata=0
    const updateproduct = (data) => {
        setiddata(data._id)
        setchangebutton(<Button variant="warning" onClick={() => updatesubmit(data._id)}>Update</Button>)
        console.log(data)
        document.getElementById("productname").value = data.product_name
        setproduct_name(data.product_name)
        document.getElementById("productdescription").value = data.product_desc
        setproduct_desc(data.product_desc)
        document.getElementById("productcost").value = data.product_cost
        setproduct_cost(data.product_cost)
        document.getElementById("productstock").value = data.product_stock
        setproduct_stock(data.product_stock)
        //alert(document.getElementById("productstock").value)
        newpreviousdata=document.getElementById("productstock").value
        setprevious_stock(document.getElementById("productstock").value)
        document.getElementById("productcategory").value = data.category_id.category_name
        setproduct_category(document.getElementById("productstock").value)
        document.getElementById("productcolor").value = data.color_id.color_name
        setproduct_color(data.product_color)
        document.getElementById("productrating").value = data.product_rating
        setproduct_rating(data.product_rating)
        document.getElementById("productproducer").value = data.product_producer
        setproduct_producer(data.product_producer)
        document.getElementById("productdimention").value = data.product_dimension
        setproduct_dimention(data.product_dimention)
        document.getElementById("productmaterial").value = data.product_material
        setproduct_material(data.product_material)
        document.getElementById("productstock").value = data.product_stock
        setproduct_stock(data.product_stock)
        console.log(data)
        setproduct_image(data.product_image)
        setproduct_image1(data.product_subImages[0])
        setproduct_image2(data.product_subImages[1])
        setproduct_image3(data.product_subImages[2])
        setnewproduct_image(data.product_subImages[0])
        setnewproduct_image1(data.product_subImages[0])
        setnewproduct_image2(data.product_subImages[1])
        setnewproduct_image3(data.product_subImages[2])
        setupdatebutton(1)
        setproductstatus(1)
    }
    const updatesubmit = (id) => {  
        //giveimages()
        //e.preventDefault()
        if (1) {
            const data = {}

            let formData = new FormData();    //formdata object
           
            if (1) {
                
                formData.append('pname', document.getElementById("productname").value);   //append the values with key, value pair
                formData.append('pdesc', document.getElementById("productdescription").value);
                formData.append('pcost', document.getElementById("productcost").value);
                formData.append('pstock', document.getElementById("productstock").value);
                formData.append('pcategory', document.getElementById("productcategory").value)
                formData.append('pcolor', document.getElementById("productcolor").value)
                formData.append('prating', document.getElementById("productrating").value)
                formData.append('pproducer', document.getElementById("productproducer").value)
                formData.append('pdimention', document.getElementById("productdimention").value)
                formData.append('previousstock', newpreviousdata)
                formData.append('pid', id);

                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=AaB03x" +
                            "--AaB03x" +
                            "Content-Disposition: file" +
                            "Content-Type: png" +
                            "Content-Transfer-Encoding: binary" +
                            "...data... " +
                            "--AaB03x--",
                        "Accept": "application/json",
                        "type": "formData",
                        'Authorization': 'Bearer ' + encryptStorage.getItem('token')

                    }
                }
                axios.post('http://localhost:8899/api/updateproducts', formData, config).then(
                    data => {
                        console.log(data)
                        if (data.data.err == "token") {
                            swal.fire(data.data.msg)
                            window.location.replace("/logout")
                        }

                        else {
                            console.log(data)
                            if (data.data.err == "0") {
                                swal.fire(data.data.message)
                                window.location.reload("")
                            }
                            else {
                                console.log(data)
                                //swal.fire(data.data.err)
                                //window.location.reload()
                            }

                        }
                    }
                )
            }
            else {
                swal.fire("cannot be empty feilds.")
            }
        }
        else {
            swal.fire("cannot be empty feilds.")
        }
    }


    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % 30;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        changedata()
    };
    const deleteproducts = (data) => {
        console.log(data)
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteproduct({ id: data }).then(data => {
                    console.log(data)
                    if (data.data.success == true) {
                        swal.fire(
                            data.data.message,
                            'Your file has been deleted.',
                            'success'
                        )
                        window.location.reload("")
                    }
                })
            }
        })
    }

    const listnerpage = (e) => {
        if (document.getElementById("perpageinput").value > 0) {
            setitemsPerPage(document.getElementById("perpageinput").value)
            setchangepage(Math.random())
        }

    }

    const getproductname=(e)=>{
        getproductsname({pname:e.target.value}).then((data)=>{
            console.log(data.data)
            if(data.data.success==true){

                console.log("a")
                setproduct_name_error("Product Name Already Exists !!!!!")
            }
            else{
                setproduct_name_error("")
            }
        })
    }
    console.log(currentItems)
    const filterdata=(e)=>{
        const query=e.target.value
        const endOffset = itemOffset + itemsPerPage;
        var data1=products
        if(query ===  ""){
            setCurrentItems(products.slice(itemOffset, endOffset));
        }
        else{

            data1=data1.filter(post => {
                if (e.target.value === "") {
                    console.log("not include")
                  //if query is empty
                  return post;
                } else if (post.product_name.toLowerCase().includes(query.toLowerCase())) {
                    console.log("include")
                  //returns filtered array
                  return post;
                }
              });
              setCurrentItems(data1);
        }
          setsortrating(Math.random())

    }
    return (
        <div>
            <div style={{ textAlign: "left", marginTop: "20px", padding: "70px" }} >
                <h1>Edit Product</h1>
                <Row>
                    <Col>
                        <button className="btn btn-primary" onClick={() => sortbystock()}>Sort by Stock</button>
                    </Col>
                    <Col>
                    <input placeholder="Search" onChange={filterdata} />
                    </Col>
                    <Col>
                        <input type="number" id="perpageinput" />
                        <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => listnerpage()} >Item per Page</button>
                    </Col>
                    <Col>
                        <button className="btn btn-warning" onClick={() => sortbystock1()}>Item Out of Stock</button>
                    </Col>
                </Row>
                <div style={{ display: "flex",width:"100%" }}>

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next "
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel=" previous"
                        renderOnZeroPageCount={null}
                        className='paginatecss'
                    />
                </div>
                <Row>
                    <Col xs={8} lg={8} md={6} sm={12}>
                        <Row>
                            {
                                currentItems.map((item, index) => {
                                    return (
                                        <Col xs={4} lg={4} md={6} sm={6} className='cardcss' key={index}>

                                            <Card>
                                                <Card.Img variant="top" src={`${item.product_image}`} width="100%" height="120px" />
                                                <Card.Body>
                                                    <div style={{ height: "70px", borderBottom: "2px solid black" }}>

                                                        <p>{item.product_name}</p>
                                                    </div>
                                                    <Card.Text>
                                                        <p>
                                                            Price:{item.product_cost}

                                                        </p>
                                                    </Card.Text>
                                                    <Button variant="danger" onClick={() => deleteproducts(item._id)}>Delete</Button>
                                                    <Button variant="warning" style={{ marginLeft: "20px" }} onClick={() => updateproduct(item)}>Update</Button>
                                                    <div>
                                                        <h5>{`Stock:${item.product_stock}`}</h5>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col >
                    <Col xs={4} lg={4} md={6} sm={12}>
                        <Container style={{ border: "2px solid black", marginTop: "20px", padding: "20px" }}>
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="productname">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product Name" onChange={handler} onBlur={getproductname} />
                                    {product_name_error!==""?<p style={{color:"red"}}>{product_name_error}</p>:<></>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="mainfile">
                                    <Form.Label style={{marginRight:"40px"}}>Product image</Form.Label>
                                    
                                    <>
                                        <Button variant="primary" onClick={handleShow}>
                                            Select Images of Product
                                        </Button>

                                        <Modal dialogClassName='mymodel' show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal heading</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <Modaldata handleevent={handler1}  image1={product_image} image2={product_image1} image3={product_image2} image4={product_image3} status={productstatus} />
                                                 </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                {updatebutton==1?<Button variant="primary" onClick={giveimages}>
                                                    Save Changes</Button>:<Button variant="primary" onClick={handleClose}>
                                                    Save 
                                                </Button>
                                                }
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productdescription">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product description" onChange={handler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productcategory">
                                    <Form.Label>Product Catogory</Form.Label>
                                <select id="productcategory" name="category" onChange={handler} className="dropdowncss" style={{margin:"20px"}}>
                            {
                                category.map((item, index) => {
                                    return (

                                        <option key={index} eventKey={item.category_name} value={item.category_name}>{item.category_name} </option>
                                    )
                                })
                            }
                        </select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productcolor">
                                    <Form.Label>Product Color</Form.Label>
                        <select id="productcolor" name="color" onChange={handler} className="dropdowncss" style={{marginLeft:"50px"}}>
                        <option value="all">Colors</option>
                            {
                                color.map((item, index) => {
                                    return (
                                        
                                        <option key={index} eventKey={item._id} value={item.color_name}>{item.color_name} </option>
                                        )
                                    })
                                }
                        </select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productrating">
                                    <Form.Label>Product Rating</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product Rating" onChange={handler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productproducer">
                                    <Form.Label>Product Producer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product producer" onChange={handler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productdimention">
                                    <Form.Label>Product Dimention</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product dimention" onChange={handler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productmaterial">
                                    <Form.Label>Product Material</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product material" onChange={handler} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="productcost">
                                    <Form.Label>Product Cost</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Product Cost" onChange={handler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="productstock">
                                    <Form.Label>Product Stock</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product Stock" onChange={handler} />
                                </Form.Group>

                                {changebutton}
                            </Form>
                        </Container>
                    </Col>
                </Row>

                <div style={{ display: "flex", }}>

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next "
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel=" previous"
                        renderOnZeroPageCount={null}
                        className='paginatecss'
                    />
                </div>

            </div>

        </div>
    )
}


export default AdminCrud
