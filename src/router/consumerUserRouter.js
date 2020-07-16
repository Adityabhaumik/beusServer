const app = require('express')
const consumerUser = require('../consumeruser/consumerUser')
const auth = require('../middleware/consumerAuth')
const router = new app.Router()

//THIS IS FOR REGISTRAION OF A NEW SELLER IN TO OUR SYSTEM USED IN BEUS -SELLER
router.post('/consumerUser/register',async (req, res) =>{
    console.log('----------------------------THE SELLER-USER REGISTRATION ROUTER IS WORKING-----------------------------')
        const user = new consumerUser(req.body)

    try{
        await user.save()
        res.status(200).send('SUCESSFULLY SAVED NEW USER!')
        console.log(user)
        }catch(e){
            res.status(400).send('operation failed\n '+ e)

        }
    

})

//LOGIN
router.post('/consumerUser/Login',async (req,res) =>{

    console.log('----------------------------THE SELLER-USER LOGIN ROUTER IS WORKING-----------------------------')
    try{
        const user = await consumerUser.findByCredential( req.body.email , req.body.password)
        const token = await user.generateConsumerAuthToken()
        res.status(200).send({user,token})

    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})

//to get my profile

router.get('/consumerUser/me',auth,async (req,res)=>{
    console.log('----------------------------THE SELLER-USER PERSONAL PROFILE REQUEST ROUTER IS WORKING-----------------------------')
    await res.status(200).send(req.user) 
})

//LOGOUT SINGLE USER
router.post('/consumerUser/logout',auth, async(req,res)=>{
    try{
      req.user.tokens= req.user.tokens.filter((token)=>{
          return token.token !== req.token
      })
      await req.user.save()
      console.log('sucessfully user loged out')
      res.status(200).send()
      
    }catch(e){
      
      res.status(500).send('OPERATION FAILED')

    }
})

router.delete('/consumerUser/me',auth,async(req,res) =>{

    console.log('----------------------------THE SELLER-USER LOGIN ROUTER IS WORKING-----------------------------')
    try{
        await req.user.remove()
        res.status(200).send('Deleted')
    
        }catch(e){
            res.status(500).send('OPERATION FAILED')
        }

})


module.exports=router