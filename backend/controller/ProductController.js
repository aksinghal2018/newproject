const productModel = require('../db/Products/productSchema');
const userModel=require('../db/userSchema.js');
const categoryModel = require('../db/Products/categorySchema');
const colorModel = require('../db/Products/colorSchema');
const NotificationModel = require('../db/NotificationSchema')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const jsonsecret = "5sa5sa67s66s66sa6saww"
const autenticateToken = async (req, res, next) => {
    if (req != undefined) {
        const token = req.query.token
        if (token == null) {
            res.json({ "err": 1, "msg": "Token not match" })
        }
        else {
            await jsonwebtoken.verify(token, jsonsecret, (err, data) => {
                if (err) {
                    res.send("Token expired")
                }
                else {
                    next();
                }
            })
        }
    }
    else {
        next()
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
        //console.log(path.join(__dirname, './uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
        //console.log(file)
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).fields([{ name: 'myfile1', maxCount: 1 }, { name: 'myfile2', maxCount: 1 }, { name: 'myfile3', maxCount: 1 }, { name: 'myfile4', maxCount: 1 }])
const addProducts = async (req, res, next) => {

    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        console.log(req.files)
        let image = `http://localhost:8899/images/${req.files.myfile1[0].filename}`;
        let image1 = [`http://localhost:8899/images/${req.files.myfile2[0].filename}`, `http://localhost:8899/images/${req.files.myfile3[0].filename}`, `http://localhost:8899/images/${req.files.myfile4[0].filename}`];
        console.log(req.body)
        var colorid = ""
        var categoryid = ""
        colorModel.findOne({ color_name: req.body.pcolor }, (err, data) => {
            colorid = data._id
            categoryModel.findOne({ category_name: req.body.pcategory }, (err, data1) => {
                categoryid = data._id
                console.log(data._id)
                console.log(data1._id)
                const dataitem = { product_name: req.body.pname, product_desc: req.body.pdesc, product_image: image, product_cost: req.body.pcost, product_stock: req.body.pstock, product_rating: req.body.prating, product_producer: req.body.pproducer, product_dimension: req.body.pdimention, product_material: req.body.pmaterial, product_subImages: image1, color_id: data._id, category_id: data1._id }
                const ins = productModel(dataitem)
                ins.save((err) => {
                    console.log(err)
                    if (err) { res.json({ "success": false, err: "product already added", message: "user already added." }) }
                    else {
                        res.json({
                            "err": 0,
                            "success": true,
                            "status_code": 200,
                            "message": `product added successfully`
                        });
                    }
                })
            })
        })
        //insert data


    })
}
const updateproduct = async (req, res, next) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        var data = {}
        console.log(req.body)
        if(req.body.previousstock==0){
            if(req.body.previousstock<req.body.pstock){
                NotificationModel.find({product_id:mongoose.Types.ObjectId(req.body.pid)},(err,data)=>{
                    var dataitems1=[]
                    data.map(item=>{
                        dataitems1.push(item.user_id)
                    })
                    console.log(dataitems1)
                    let date = new Date().toDateString();
                    userModel.updateMany({_id:dataitems1},{$push:{Notifications:{msg:`${req.body.pname} is available in stock`,link:req.body.pid,created_at:date}}}).exec((data,err)=>{
                        console.log(data)
                        console.log(err)
                    })
                })
                NotificationModel.deleteMany({product_id:mongoose.Types.ObjectId(req.body.pid)},(err,data)=>{
                    console.log(data)
                    console.log(err)
                })
            }
        }

        //console.log(data)
        colorModel.findOne({ color_name: req.body.pcolor }, (err, data) => {
            colorid = data._id
            categoryModel.findOne({ category_name: req.body.pcategory }, (err, data1) => {
                categoryid = data._id
                console.log(data._id)
                console.log(data1._id)
                var dataitem = {}
                console.log(req.files.length)
                if (req.files.length == undefined) {
                    dataitem = { product_name: req.body.pname, product_desc: req.body.pdesc, product_cost: req.body.pcost, product_stock: req.body.pstock, product_rating: req.body.prating, product_producer: req.body.pproducer, product_dimension: req.body.pdimention, color_id: data._id, category_id: data1._id }
                }
                else {
                    let image = `http://localhost:8899/images/${req.files[0].filename}`
                    let image1 = [`http://localhost:8899/images/${req.files[1].filename}`, `http://localhost:8899/images/${req.files[2].filename}`, `http://localhost:8899/images/${req.files[3].filename}`]
                    console.log(req.body)
                    dataitem = { product_name: req.body.pname, product_desc: req.body.pdesc, product_image: image, product_cost: req.body.pcost, product_stock: req.body.pstock, product_rating: req.body.prating, product_producer: req.body.pproducer, product_dimension: req.body.pdimention, product_subImages: image1, color_id: data._id, category_id: data1._id }
                }
                productModel.findByIdAndUpdate({ _id: req.body.pid }, dataitem).exec((err) => {
                    console.log(err)
                    if (err) { res.json({ "success": false, err: "update", message: "update error" }) }
                    else {
                        res.json({
                            "err": 0,
                            "success": true,
                            "status_code": 200,
                            "message": `product updated successfully`
                        });
                    }
                })
            })
        })
        //insert data


    })
}
const findfile = (data, filename) => {
    data.map(item => {
        if (item.fieldname == filename) {
            return true
        }
    })
    return false
}
const updateproductimage = async (req, res, next) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        var data = {}


        console.log(data)

        var dataitem = {}
        if (req.files.length == 0) {
            dataitem = { product_name: req.body.pname, product_desc: req.body.pdesc, product_cost: req.body.pcost, product_stock: req.body.pstock, product_rating: req.body.prating, product_producer: req.body.pproducer, product_dimension: req.body.pdimention, color_id: data._id, category_id: data1._id }
        }
        else {
            const filesname = Object.keys(req.files)
            var file2 = ""
            var file3 = ""
            var file4 = ""
            console.log(req.body)
            console.log(req.files)
            if (filesname.indexOf("myfile2") != -1) {
                file2 = `http://localhost:8899/images/${req.files.myfile2[0].filename}`
            }
            if (filesname.indexOf("myfile2") == -1) {
                file2 = req.body.myfile2
            }
            if (filesname.indexOf("myfile3") != -1) {
                file3 = `http://localhost:8899/images/${req.files.myfile3[0].filename}`
            }
            if (filesname.indexOf("myfile3") == -1) {
                file3 = req.body.myfile3
            }
            if (filesname.indexOf("myfile4") != -1) {
                file4 = `http://localhost:8899/images/${req.files.myfile4[0].filename}`
            }
            if (filesname.indexOf("myfile4") == -1) {
                file4 = req.body.myfile4
            }


            if (filesname.indexOf("myfile1") != -1) {
                dataitem = { product_image: `http://localhost:8899/images/${req.files.myfile1[0].filename}`, product_subImages: [file2, file3, file4] }
            }
            else {
                dataitem = { product_subImages: [file2, file3, file4] }
            }
            console.log(file2, file3, file4)
        }
        productModel.findByIdAndUpdate({ _id: req.body.pid }, dataitem).exec((err) => {
            console.log(err)
            if (err) { res.json({ "success": false, err: "update", message: "update error" }) }
            else {
                console.log("image updated")
                res.json({
                    "err": 0,
                    "success": true,
                    "status_code": 200,
                    "message": `product images updated successfully`
                });
            }
        })

        //insert data


    })
}
const getProducts = async (req, res, next) => {
    productModel.find({}, { "product_name": 1, "product_cost": 1, "product_rating": 1, "product_producer": 1, "product_image": 1, "product_subImages": 1, "category_id": 1, "product_rating": 1, "product_dimention": 1, "product_material": 1, "product_desc": 1, "color_id": 1, "product_stock": 1, "product_dimension": 1 }).populate(['category_id', 'color_id']).exec((err, data) => {
        // console.log(err)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "data": data
            });
        }
    })
}
const getProductsname = async (req, res, next) => {
    productModel.find({product_name:req.body.pname}).exec((err, data) => {
        // console.log(err)
        if (err) { res.json({ "success":false,err: "not found", message: "product not found" }) }
        else {
            console.log(req.body)
            console.log(data)
            if(data.length==0){
                res.json({ "success":false,err: "not found", message: "product not found" })
            }
            else{

                res.json({
                    "success": true,
                    "status_code": 200,
                    "data": data
                });
            }
        }
    })
}
const getProductsbyid = async (req, res, next) => {
    const id = req.params.id
    console.log("getproductbyid")
    productModel.find({}, {  "product_name": 1, "product_cost": 1, "product_rating": 1, "product_producer": 1, "product_image": 1, "product_subImages": 1, "category_id": 1, "product_rating": 1, "product_dimention": 1, "product_material": 1, "product_desc": 1, "color_id": 1, "product_stock": 1, "product_dimension": 1 }).populate(['category_id', 'color_id']).exec((err, data) => {
        const data1 = []
        data.map(function (doc) {
            if (doc.category_id != null) {
                if (doc.category_id.category_name == id) {
                    data1.push(doc)
                }
            }
        })
        res.json({ data: data1 })
        //console.log(err)
    })
}
const getProductsbyiddata = async (req, res, next) => {
    const id = req.params.id
    productModel.find({ _id: id }).populate(['category_id', 'color_id']).exec((err, data) => {
        res.json({ data: data })
        //console.log(err)
    })
}
const getProductsbyidcolor = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    productModel.find({ color_id: mongoose.Types.ObjectId(id) }, {  "product_name": 1, "product_cost": 1, "product_rating": 1, "product_producer": 1, "product_image": 1, "product_subImages": 1, "category_id": 1, "product_rating": 1, "product_dimention": 1, "product_material": 1, "product_desc": 1, "color_id": 1, "product_stock": 1, "product_dimension": 1 }).populate(['category_id', 'color_id']).exec((err, data) => {
        const data1 = []
        console.log(data)

        res.json({ data: data })
        //console.log(err)
    })
}
const deleteproducts = async (req, res, next) => {
    console.log(req.body.id)
    productModel.findByIdAndRemove({ _id: req.body.id }).exec((err, data) => {
        console.log(data)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        if (data == null) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "message": "delete Successfully."
            });
        }
    })
}
const getcategory = async (req, res, next) => {
    categoryModel.find({}, (err, data) => {
        console.log(err)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "data": data
            });
        }
    })
    console.log("getproduct")
}
const getcolor = async (req, res, next) => {
    colorModel.find({}, (err, data) => {
        console.log(err)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "data": data
            });
        }
    })
    console.log("getproduct")
}
const getNotificationdata = async (req, res, next) => {
    console.log("notification")
    const pipeline = [
        {
            '$match': {
               }
        }, {
            '$group': {
                _id: "$product_id",
                "count": {
                    $sum: 1
                }
            }
        }, {
            '$sort': {
                "count":-1
            }
        },
        {
            '$lookup': {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product_data"
            }
        }
    ];
    NotificationModel
        .collection.aggregate(pipeline).toArray(function(err, results) {
            console.log(err)
            if (err) { res.json({ err: "not found", message: "product not found" }) }
            else {
                res.json({
                    "success": true,
                    "status_code": 200,
                    "data": results
                });
            }
        });

    
}

module.exports = { autenticateToken, getProducts,getProductsname, getProductsbyid, getProductsbyiddata, getProductsbyidcolor, addProducts, deleteproducts, updateproduct, updateproductimage, getcolor, getProducts, getcategory, getNotificationdata }