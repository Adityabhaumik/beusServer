const mongoose = require('mongoose')
const { model } = require('./consumerUser')
const consumerUser = require('./consumerUser')


const orderSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            require:true,
            trim:true
        },
        Prince:{
            type:Number,
            require:true,
            trim:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'consumerUser'
        }

    },
    {
        timestamps:true
    }
) ;
 
const orders= mongoose.model('orders', orderSchema)
module.exports = orders;