const { mongo } = require("mongoose");
const bcrypt = require('bcryptjs')
require('../db/mongoose')
const mongoose = require('mongoose');
const { Timestamp } = require("mongodb");
const jwt = require('jsonwebtoken')

const consumerUserSchema = new mongoose.Schema({
    name:{
      
        type:String,
        require:true,
        trim:true
    },
    email:{
        unique:true,
        type:String,
        require:true,
        trim:true
    },
    password:{  
        type:String,
        require:true,
        trim:true
    },
    phone1:{  
         type:Number,
        require:true,
        trim:true
    },
  
    location:{   
        type:String,
        require:true,
        trim:true
    },
    pin:{  
        type:Number,
        require:true,
        trim:true
    },
  
    tokens:[{
        token : {
            type:String,
            require:true
        }
    }]

},
{
    timestamp:true
})

consumerUserSchema.methods.toJSON = function () { 
    
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    console.log('failed to run')
    return userObject
}

//Hashing PASSWORDS


consumerUserSchema.pre('save', async function(next) {
    
    console.log('PASS HASHING IS WORKING')
    if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,8)
    }
    next()

} )




//GENERATION ASUTH TOKEN 

consumerUserSchema.methods.generateConsumerAuthToken = async function (){
    const token = jwt.sign({_id: this._id.toString()},process.env.jwt)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}


//Find BY CREDENTIAL FOR LOGIN 
 
consumerUserSchema.statics.findByCredential = async (email, password) =>{

        const user = await consumerUser.findOne({email})
        if(!user){
            throw new Error('LOGIN FAILED')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            throw Error('LOGIN FAILED')
        }


        return user

    }

//deletin impdata


const consumerUser = mongoose.model('consumerUser',consumerUserSchema)
module.exports=consumerUser;

