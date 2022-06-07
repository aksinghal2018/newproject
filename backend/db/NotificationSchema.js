const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("notifications", notificationSchema)

