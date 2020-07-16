const mongoose = require('mongoose')
const { model } = require('./sellerUser')
const sellerUser = require('./sellerUser')


const sellerProductsSchema = new mongoose.Schema(
    {
        productName:{
            
            type:String,
            require:true,
            trim:true
        },
        Price:{
            type:Number,
            require:true,
            trim:true
        },
        stock:{
            type:Number,
            require:true,
            trim:true
        },
        description:{
            type:String,
            require:true,
            trim:true
        },
        pic:{
            type:Buffer
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'sellerUser'
        }

    },
    {
        timestamps:true
    }
) ;
 



const sellerProducts = mongoose.model('sellerProducts', sellerProductsSchema)
module.exports = sellerProducts;