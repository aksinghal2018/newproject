import React,{useState,useEffect} from 'react'
import {getNotificaitiondata} from '../Services/productservices'
import { Container, Table } from 'react-bootstrap'


function AdminNotification() {
    const [notifications, setnotifications] = useState([])
    useEffect(() => {
        getNotificaitiondata().then((data,err)=>{
            console.log(data.data.data)
            setnotifications(data.data.data)
        })
    }, [])
  return (
    <Container><Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Product id</th>
        <th>Product Name</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
        {notifications.map((item,index)=>{
            return(
      <tr>
        <td>{index+1}</td>
        <td>{item.product_data[0]._id}</td>
        <td>{item.product_data[0].product_name}</td>
        <td>{item.count}</td>
      </tr>
            )
        })}
      
    </tbody>
  </Table></Container>
  )
}

export default AdminNotification