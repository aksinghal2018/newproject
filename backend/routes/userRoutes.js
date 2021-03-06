const express=require('express')
const userController = require( '../controller/UserController')
const router=express.Router()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


router.post("/registeruser",userController.registerUser)
router.post("/registeruserbysocial",userController.registerUserbySocial)
router.post("/getuser",userController.getUser)
router.post("/checkuser",userController.loginUser)
router.post("/adminloginuser",userController.adminloginUser)

router.delete("/deluser/:id",userController.deleteUser)
//router.put("/updateuser/:id",userController.updateUser)
router.post("/forgetpassword",userController.forgetPasswordUser)
router.post('/updatepassword',userController.updatePasswordUser)
router.post('/changeprofileimage',userController.changeprofileimage)
router.post('/updateprofile',userController.updateUser)
router.post('/addAddress',userController.addAddress)
router.post('/updateAddress',userController.updateAddress)
router.post('/deleteAddress',userController.deleteAddress)
router.post('/getcart',userController.autenticateToken,userController.getCart)
router.post('/updatecart',userController.updateCart)
router.post('/removecart',userController.removecart)
router.post('/checkout',userController.checkout)
router.post('/getorder',userController.getorder)
router.get('/getAllorder',userController.getAllorder)
router.post("/getinvoice",userController.getinvoice)
router.post("/addnotification",userController.addNotificatons)
router.post("/getNotifications",userController.getNotificatons)
router.post("/deleteNotifications",userController.deleteNotification)
//end
module.exports=router;