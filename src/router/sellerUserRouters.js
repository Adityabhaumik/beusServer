const app = require('express')
const sellerUser = require('../selleruser/sellerUser')
const { update } = require('../selleruser/sellerUser')
const auth = require('../middleware/sellerAuth')
const router = new app.Router()


//THIS IS FOR REGISTRAION OF A NEW SELLER IN TO OUR SYSTEM USED IN BEUS -SELLER
router.post('/sellerUser/Registration', async (req, res) =>{
    console.log('----------------------------THE SELLER-USER REGISTRATION ROUTER IS WORKING-----------------------------')
        const user = new sellerUser(req.body)

    try{
        await user.save()
        res.status(200).send('SUCESSFULLY SAVED NEW USER!')
        console.log(user)
        }catch(e){
            res.status(400).send('operation failed\n '+ e)

        }
    

})


//THIS ROUTER IS FOR THE SELLER-USER TO LOGIN
router.post('/sellerUser/Login',async (req,res) =>{

    console.log('----------------------------THE SELLER-USER LOGIN ROUTER IS WORKING-----------------------------')
    try{
        const user = await sellerUser.findByCredential( req.body.email , req.body.password)
        const token = await user.generateSellerAuthToken()
        res.status(200).send({user,token})

    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }



})

// //------------------------------------------------------------------------ THIS ROUTER IS TO UPDATE THE SELLER-USER IN 
// router.patch('/sellerUser/updateUser',auth,async(req,res) =>{
//     const updates = Object.keys(req.body) 
//     const allowupdates = ['password']
//     const isvalidOperation = updates.every((update) =>{
//         allowupdates.includes(update)
//     })
//     if(!isvalidOperation){
//         res.status(400).send('This operation Failed')
//     }
//     console.log('----------------------------THE SELLER-USER LOGIN ROUTER IS WORKING-----------------------------')
// res.status(200).send('WOEKING')


// })


//TO RETURN LOGED IN SELLER-USER PROFILE DATA
router.get('/sellerUser/me',auth,async (req,res)=>{
    console.log('----------------------------THE SELLER-USER PERSONAL PROFILE REQUEST ROUTER IS WORKING-----------------------------')
    
    
    await res.status(200).send(req.user) 
})

// TO LOGOUT SINGGLE USER
  router.post('/sellerUser/logout',auth, async(req,res)=>{
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

// TO LOGOUT SELLER USER FROM ALL ACTIVE LOGINS

router.post('/sellerUsers/logoutAll',auth, async (req,res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        console.log('delet all token running complete succsess fully')
        res.send()
        
    }catch(e){
        res.status(500).send('OPERATION FAILED')
    }
})


// TO DELETE THE USER 
router.delete('/sellerUser/me',auth,async(req,res) =>{

    console.log('----------------------------THE SELLER-USER LOGIN ROUTER IS WORKING-----------------------------')
    try{
        await req.user.remove()
        res.status(200).send('Deleted')
    
        }catch(e){
            res.status(500).send('OPERATION FAILED')
        }

})






module.exports=router