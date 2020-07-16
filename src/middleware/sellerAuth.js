const jwt = require('jsonwebtoken')
const sellerUserModel = require('../selleruser/sellerUser')

const sellerAuth  = async  (req, res , next )  =>{

   // console.log('sellerAuth is working')
    try{
        const Token = req.header('Authorization').replace('Bearer ','')
        console.log(Token)
        const decode = jwt.verify(Token,process.env.jwt)
        const user = await sellerUserModel.findOne({_id:decode._id,'tokens.token':Token})
        if(!user){
            throw new Error
        }        
        req.token=Token
        req.user=user
        next()


    }
    catch(e){
        console.log(e)
    res.status(401).send('Please Authenticate')            

    }
    
}
module.exports = sellerAuth;