import React from 'react'
import {Card,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage';
import { updateCart } from '../../Services/services';
function Cardcmp({name,rating,price,image_url,id,producer}) {
    const history = useHistory();
    const dispatch = useDispatch()
    const getdetail=()=>{
        history.push(`getdetails/${id}`);
    }
    const starrating=(data)=>{
        if(data>=0 && data<=1){
            return(<img src='../Images/1star.JPG' alt='1startimage' style={{width:"70px" ,height:"20px"}}/>)
        }
        if(data>1 && data<=2){
            return(<img src='../Images/2star.jpg' alt='2startimage' style={{width:"70px" ,height:"20px"}}/>)
        }
        if(data>2 && data<=3){
            return(<img src='../Images/3star.jpg' alt='3startimage' style={{width:"70px" ,height:"20px"}}/>)
        }
        if(data>3 && data<=4){
            return(<img src='../Images/4start.JPG' alt='4startimage' style={{width:"70px" ,height:"20px"}}/>)
        }
        if(data>4 && data<=5){
            return(<img src='../Images/5star.jpg' alt='5startimage' style={{width:"70px" ,height:"20px"}}/>)
        }
    }
    const alreadyhave=(data)=>{
        var count=0
        encryptStorage.getItem('cart').map(item=>{
            console.log(item)
            console.log(id)
            if(item.id==data){
                count=count+1
            }
        })
        return count
    }
    const addtoCart=()=>{
        //console.log(alreadyhave(id))
        if(alreadyhave(id)==0){
            var data1=encryptStorage.getItem('cart')
            dispatch({type:'Inc_count'})
            data1.push({name:name,rating:rating,price:price,quantity:1,image_url:image_url,id:id,Status:"In Stock",producer:producer})
            encryptStorage.setItem('cart',data1)
            updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
                console.log(data))
            alert("item added")
        }
        else{
            alert("already added")
        }
    }
    return (
        <Card>
            <Card.Img variant="top" src={image_url} width="100%" height="120px"  onClick={getdetail}/>
            <Card.Body>
                <div style={{height:"70px",borderBottom:"2px solid black"}}>

                <p>{name}</p>
                </div>
                <Card.Text>
                    <p>
                    Price:{price}

                    </p>
                </Card.Text>
                <Button onClick={addtoCart} variant="danger">Add to Cart</Button>
                    <p>
                        {starrating(rating)}<br/>
                    </p>
                </Card.Body>
        </Card>
    )
}

export default Cardcmp
