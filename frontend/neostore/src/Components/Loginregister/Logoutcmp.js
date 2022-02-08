import React from 'react'
import {useEffect} from 'react'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
function Logoutcmp() {
    useEffect(() => {
        encryptStorage.removeItem("user")
        encryptStorage.removeItem("token")
        encryptStorage.removeItem("cart")
        window.location.replace("/")
    }, )
    return (
        <div>
            
        </div>
    )
}

export default Logoutcmp
