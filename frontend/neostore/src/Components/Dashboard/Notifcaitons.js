import React,{useContext,useState,useEffect} from 'react'
import { MenuContext } from "react-flexible-sliding-menu";
import './index.css'
import {deleteNotificaitons, getNotificaitons} from "../../Services/services"
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
function Notifcaitons() {
    const { closeMenu } = useContext(MenuContext);
    const [notifications, setnotifications] = useState([])
    const [refresh, setrefresh] = useState(0)
    useEffect(() => {
        getNotificaitons({user_id:encryptStorage.getItem('user').userid}).then((data)=>{
          console.log(data.data.data[0].Notifications)
          var notificationdata=data.data.data[0].Notifications
          notificationdata.reverse()
          notificationdata=notificationdata.slice(0,7)
          setnotifications(notificationdata)
      })
    
      
    }, [refresh])
    const notificaitiondelete=(e)=>{
      //alert(e.target.id)
      const userid=encryptStorage.getItem("user").userid
      deleteNotificaitons({userid:userid,index:e.target.id}).then((data)=>{
        console.log(data)
        setrefresh(Math.random())
      })
    }

  return (
    <div className="Menu">
    <h4>Notifications</h4>
    <hr />
          <ul style={{margin:"20px"}}>
              {notifications.map((item,index)=>{
                  return(<>
                  <li style={{listStyleType:"none",border:"2px solid black",padding:"20px",marginLeft:"-56px",backgroundColor:"lightblue"}}>
                      <div style={{fontSize:"11px",float:"right",marginRight:"-5px",backgroundColor:"red",width:"20px",textAlign:"center",cursor:"pointer"}} id={index} onClick={notificaitiondelete}>x</div>
                      <a href={`getdetails/${item.link}`} style={{color:"white",textDecoration:"none"}}>{item.msg}</a>
                      <p style={{fontSize:"11px",float:"right",marginRight:"25px"}}><u>{item.created_at}</u></p>
                  </li>
                      </>
                  )
              })}
          </ul>
    <button onClick={closeMenu} style={{backgroundColor:"white"}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
  </div>
  )
}

export default Notifcaitons