import axios from 'axios'
import {url} from '../ConfigFiles/URL'
import {encryptStorage} from '../ConfigFiles/EncryptStorage'
const header={'headers': {
  'Authorization': 'Bearer ' + encryptStorage.getItem('token')
}}

export const getproducts=()=>{
    return(axios.get(`${url}/getproduct`))
}
export const getcategory=()=>{
    return(axios.get(`${url}/getcategory`))
}
export const getcolor=()=>{
    return(axios.get(`${url}/getcolor`))
}
export const getproductsbyid=(id)=>{
    return(axios.get(`${url}/getproductbyid/${id}`))
}
export const getproductsbyiddata=(id)=>{
    return(axios.get(`${url}/getproductbyiddata/${id}`))
}
export const getproductsbyidcolor=(id)=>{
    return(axios.get(`${url}/getproductbycolor/${id}`))
}
