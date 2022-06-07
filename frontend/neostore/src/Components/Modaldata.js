import React ,{useEffect, useState} from 'react'
import { Row,Col } from 'react-bootstrap'

function Modaldata({handleevent,image1,image2,image3,image4,status}) {
    const [fileinput, setfileinput] = useState("")
    const [fileinput1, setfileinput1] = useState("")
    const [fileinput2, setfileinput2] = useState("")
    console.log(image1,image2,image3,image4)
    const [fileinput3, setfileinput3] = useState("")
    useEffect(() => {
        if(1){
          if(typeof(image1)=="object"){
            setfileinput(URL.createObjectURL(image1))
          }
          else{
            setfileinput(image1)
          }
          if(typeof(image2)=="object"){
            setfileinput1(URL.createObjectURL(image2))
          }
          else{
            setfileinput1(image2)
          }
          if(typeof(image3)=="object"){
            setfileinput2(URL.createObjectURL(image3))
          }
          else{
            setfileinput2(image3)
          }
          if(typeof(image4)=="object"){
            setfileinput3(URL.createObjectURL(image4))
          }
          else{
            setfileinput3(image4)
          }
            }
    }, [])
    
    const handler=(e)=>{
        if(e.target.id=="file_input"){
            console.log(e.target.files)
            setfileinput(URL.createObjectURL(e.target.files[0]))
            handleevent(e)
        }
        if(e.target.id=="file_input1"){
            setfileinput1(URL.createObjectURL(e.target.files[0]))
            handleevent(e)
        }
        if(e.target.id=="file_input2"){
            setfileinput2(URL.createObjectURL(e.target.files[0]))
            handleevent(e)
        }
        if(e.target.id=="file_input3"){
            setfileinput3(URL.createObjectURL(e.target.files[0]))
            handleevent(e)
        }
    }
  return (
    <div >
        <div style={{textAlign:"center"}}>
            <h2>Main Image</h2>
            <img className="img" style={{width:"70%",height:"500px"}} src={fileinput} alt="image upload"  />
        <div className="image-upload"  >
  <label for="file_input">
    <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" style={{width:"80px", height:"80px"}}/>
  </label>

  <input id="file_input" type="file" style={{display:"none"}} onChange={handler} />
</div>

        </div>
        <div style={{textAlign:"center"}}>
            <Row >
                <Col >
                <h2>Sub Image 1</h2>
                <img className="img" style={{width:"320px",height:"250px"}} src={fileinput1} alt="image upload" />
                <div className="image-upload" >
  <label for="file_input1">
    <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" style={{width:"80px", height:"80px"}}/>
  </label>

  <input id="file_input1" type="file" style={{display:"none"}} onChange={handler}/>
</div>
                </Col>
                
                <Col>
                <h2>Sub Image 2</h2>
                <div >
                <img className="img" style={{width:"320px",height:"250px"}} src={fileinput2} alt="image upload" />
                </div>
                <div className="image-upload" >
  <label for="file_input2">
    <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"style={{width:"80px", height:"80px"}}/>
  </label>

  <input id="file_input2" type="file" style={{display:"none"}} onChange={handler}/>
</div>
                </Col>
                <Col>
                <h2>Sub Image 3</h2>
                <img className="img" style={{width:"320px",height:"250px"}} src={fileinput3} alt="image upload" />
                <div className="image-upload" >
  <label for="file_input3">
    <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" style={{width:"80px", height:"80px"}}/>
  </label>

  <input id="file_input3" type="file" style={{display:"none"}} onChange={handler}/>
</div>
                </Col>
            </Row>
        </div>

    </div>
  )
}

export default Modaldata